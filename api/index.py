from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/index', methods=['POST'])
def hitung():
    # Mengambil data JSON dari frontend (script.js)
    data = request.json
    paket = data.get('paket', 1)
    durasi = data.get('durasi', 1)
    jumlahvideo = data.get('jumlahvideo', 1)

    # Logika asli algoritma Anda (tanpa return None di paket 2)
    if paket == 1:
        nama_paket = "Basic"
        harga_per_bulan = 50000
        harga_per_video = 5000
    else:  
        nama_paket = "Premium"
        harga_per_bulan = 100000
        harga_per_video = 0

    biayapaket = harga_per_bulan * durasi
    biayavideo = harga_per_video * jumlahvideo

    diskonpaket = 0
    if durasi > 3:
        diskonpaket = biayapaket * 0.1
        
    totalsementara = biayapaket + biayavideo - diskonpaket
    
    diskontambahan = 0
    if jumlahvideo > 20:
        diskontambahan = totalsementara * 0.05
        
    totaldiskon = diskonpaket + diskontambahan
    totalbiaya = totalsementara - diskontambahan

    # Mengembalikan hasil sebagai JSON
    return jsonify({
        "nama_paket": nama_paket,
        "biayapaket": int(biayapaket),
        "biayavideo": int(biayavideo),
        "totaldiskon": int(totaldiskon),
        "totalbiaya": int(totalbiaya)
    })

# Wajib ada agar Vercel bisa mengeksekusi Flask
