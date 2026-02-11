let latitude = null;
let longitude = null;

function beli() {
    if (!document.getElementById("produk").value) {
        alert("Pilih jenis Es Teler terlebih dahulu!");
        return;
    }
    document.getElementById("form-pesan").classList.remove("hidden");
}

// Ambil lokasi GPS asli
function ambilLokasi() {
    if (!navigator.geolocation) {
        alert("Browser tidak mendukung GPS");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        posisi => {
            latitude = posisi.coords.latitude;
            longitude = posisi.coords.longitude;

            document.getElementById("lokasi").value =
                latitude.toFixed(6) + ", " + longitude.toFixed(6);
        },
        error => {
            alert("Gagal mengambil lokasi. Pastikan izin lokasi diaktifkan.");
        },
        {
            enableHighAccuracy: true,
            timeout: 10000
        }
    );
}

function kirim() {

    if (!latitude || !longitude) {
        alert("Ambil lokasi GPS terlebih dahulu!");
        return;
    }

    let produkSelect = document.getElementById("produk");
    let produk = produkSelect.value;
    let harga = parseInt(produkSelect.options[produkSelect.selectedIndex].dataset.harga);

    let nama = document.getElementById("nama").value;
    let jumlah = parseInt(document.getElementById("jumlah").value);
    let wa = document.getElementById("wa").value;

    if (!nama || !jumlah || !wa) {
        alert("Lengkapi semua data!");
        return;
    }

    let subtotal = harga * jumlah;
    let ongkir = 5000;
    let total = subtotal + ongkir;

    // Tampilkan Invoice
    document.getElementById("invoice").classList.remove("hidden");
    document.getElementById("inv-produk").innerText = "Produk: " + produk;
    document.getElementById("inv-harga").innerText = "Harga Satuan: Rp" + harga;
    document.getElementById("inv-jumlah").innerText = "Jumlah: " + jumlah;
    document.getElementById("inv-ongkir").innerText = "Ongkir: Rp" + ongkir;
    document.getElementById("inv-total").innerText = "Total: Rp" + total;

    let mapsURL = `https://www.google.com/maps?q=${latitude},${longitude}`;
    document.getElementById("mapsLink").href = mapsURL;

    // Simpan ke localStorage
    let pesanan = {
        nama,
        produk,
        harga,
        jumlah,
        ongkir,
        total,
        lokasi: mapsURL,
        waktu: new Date().toLocaleString()
    };

    let data = JSON.parse(localStorage.getItem("pesanan")) || [];
    data.push(pesanan);
    localStorage.setItem("pesanan", JSON.stringify(data));

    // Kirim ke WhatsApp
    let waPenjual = "6281234567890"; // GANTI nomor penjual
    let pesan =
        "INVOICE PESANAN 🍧%0A" +
        "Nama: " + nama + "%0A" +
        "Produk: " + produk + "%0A" +
        "Jumlah: " + jumlah + "%0A" +
        "Total: Rp" + total + "%0A" +
        "Lokasi: " + mapsURL;

    window.open("https://wa.me/" + waPenjual + "?text=" + pesan);
}
