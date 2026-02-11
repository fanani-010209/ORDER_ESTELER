function beli() {
    if (document.getElementById("produk").value === "") {
        alert("Pilih jenis Es Teler terlebih dahulu!");
        return;
    }
    document.getElementById("form-pesan").classList.remove("hidden");
}

function kirim() {
    let produkSelect = document.getElementById("produk");
    let produk = produkSelect.value;
    let harga = produkSelect.options[produkSelect.selectedIndex].dataset.harga;

    let nama = document.getElementById("nama").value;
    let lokasi = document.getElementById("lokasi").value;
    let jumlah = document.getElementById("jumlah").value;
    let wa = document.getElementById("wa").value;

    if (!nama || !lokasi || !jumlah || !wa) {
        alert("Semua data harus diisi!");
        return;
    }

    let subtotal = harga * jumlah;
    let ongkir = 5000;
    let total = subtotal + ongkir;

    // Tampilkan Invoice
    document.getElementById("invoice").classList.remove("hidden");
    document.getElementById("inv-produk").innerText = "Produk: " + produk;
    document.getElementById("inv-harga").innerText = "Harga: Rp" + harga;
    document.getElementById("inv-jumlah").innerText = "Jumlah: " + jumlah;
    document.getElementById("inv-ongkir").innerText = "Ongkir: Rp" + ongkir;
    document.getElementById("inv-total").innerText = "Total: Rp" + total;

    // Simpan ke localStorage
    let pesanan = {
        nama,
        lokasi,
        wa,
        produk,
        harga,
        jumlah,
        ongkir,
        total,
        waktu: new Date().toLocaleString()
    };

    let data = JSON.parse(localStorage.getItem("pesanan")) || [];
    data.push(pesanan);
    localStorage.setItem("pesanan", JSON.stringify(data));

    // Kirim ke WhatsApp
    let waPenjual = "6281234567890"; // ganti nomor penjual
    let pesan =
        "INVOICE PESANAN 🍧%0A" +
        "Nama: " + nama + "%0A" +
        "Produk: " + produk + "%0A" +
        "Jumlah: " + jumlah + "%0A" +
        "Total: Rp" + total;

    window.open("https://wa.me/" + waPenjual + "?text=" + pesan);
}
