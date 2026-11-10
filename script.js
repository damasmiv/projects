
async function hitungBiaya() {
    const nama = document.getElementById('nama').value;
    const paket = parseInt(document.getElementById('paket').value);
    const durasi = parseInt(document.getElementById('durasi').value);
    const jumlahvideo = parseInt(document.getElementById('jumlahvideo').value);

    if (!nama) {
        alert("Mohon masukkan nama Anda terlebih dahulu!");
        return;
    }

    // Mengemas data untuk dikirim ke Python Backend
    const dataKirim = {
        paket: paket,
        durasi: durasi,
        jumlahvideo: jumlahvideo
    };

    try {
        // Mengubah teks tombol agar terlihat seperti sedang loading
        const btn = document.querySelector('button');
        btn.innerText = "Menghitung...";
        
        // Memanggil API Python Serverless di Vercel
        const response = await fetch('/api/hitung', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataKirim)
        });

        if (!response.ok) throw new Error("Gagal mengambil data dari server");

        // Menerima JSON balasan dari Python
        const hasil = await response.json();

        // Mengubah tampilan HTML berdasarkan data dari Python
        document.getElementById('hasil').style.display = 'block';
        document.getElementById('res-nama').innerHTML = `<strong>Nama:</strong> ${nama.toUpperCase()}`;
        document.getElementById('res-paket').innerHTML = `<strong>Jenis Paket:</strong> ${hasil.nama_paket}`;
        document.getElementById('res-durasi').innerHTML = `<strong>Durasi Berlangganan:</strong> ${durasi} bulan`;
        document.getElementById('res-biayapaket').innerHTML = `<strong>Biaya Paket:</strong> Rp ${hasil.biayapaket.toLocaleString('id-ID')}`;
        document.getElementById('res-biayavideo').innerHTML = `<strong>Biaya Video:</strong> Rp ${hasil.biayavideo.toLocaleString('id-ID')}`;
        document.getElementById('res-diskon').innerHTML = `<strong>Total Diskon:</strong> Rp ${hasil.totaldiskon.toLocaleString('id-ID')}`;
        document.getElementById('res-total').innerHTML = `Total Biaya: Rp ${hasil.totalbiaya.toLocaleString('id-ID')}`;
        
        btn.innerText = "Hitung Total Berlangganan";
        
    } catch (error) {
        alert("Terjadi kesalahan. Pastikan script berjalan di Vercel!");
        console.error(error);
        document.querySelector('button').innerText = "Hitung Total Berlangganan";
    }
}
