let latitude = null;
let longitude = null;

let totalGlobal = 0;
let mapsURLGlobal = "";
let namaGlobal = "";
let produkGlobal = "";
let jumlahGlobal = 0;

function beli() {
    if (!document.getElementById("produk").value) {
        alert("Pilih jenis Es Teler terlebih dahulu!");
        return;
    }
    document.getElementById("form-pesan").classList.remove("hidden");
}

function ambilLokasi() {
    navigator.geolocation.getCurrentPosition(
        posisi => {
            latitude = posisi.coords.latitude;
            longitude = posisi.coords.longitude;
            document.getElementById("lokasi").value =
                latitude.toFixed(6) + ", " + longitude.toFixed(6);
        },
        () => {
            alert("Izinkan GPS terlebih dahulu!");
        },
        { enableHighAccuracy: true }
    );
}

function tampilkanInvoice() {

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

    let mapsURL = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Tampilkan invoice saja
    document.getElementById("invoice").classList.remove("hidden");
    document.getElementById("inv-produk").innerText = "Produk: " + produk;
    document.getElementById("inv-harga").innerText = "Harga Satuan: Rp" + harga;
    document.getElementById("inv-jumlah").innerText = "Jumlah: " + jumlah;
    document.getElementById("inv-ongkir").innerText = "Ongkir: Rp" + ongkir;
    document.getElementById("inv-total").innerText = "Total: Rp" + total;
    document.getElementById("mapsLink").href = mapsURL;

    // Simpan untuk kirim WA nanti
    totalGlobal = total;
    mapsURLGlobal = mapsURL;
    namaGlobal = nama;
    produkGlobal = produk;
    jumlahGlobal = jumlah;
}

function kirimWA() {

    let waPenjual = "6281234567890"; // ganti nomor penjual

    let pesan =
        "INVOICE PESANAN 🍧%0A" +
        "Nama: " + namaGlobal + "%0A" +
        "Produk: " + produkGlobal + "%0A" +
        "Jumlah: " + jumlahGlobal + "%0A" +
        "Total: Rp" + totalGlobal + "%0A" +
        "Lokasi: " + mapsURLGlobal;

    window.open("https://wa.me/" + waPenjual + "?text=" + pesan);
}
