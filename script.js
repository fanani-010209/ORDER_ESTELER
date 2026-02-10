function beli() {
    document.getElementById("form-pesan").classList.remove("hidden");
}

function kirim() {
    let nama = document.getElementById("nama").value;
    let alamat = document.getElementById("alamat").value;
    let wa = document.getElementById("wa").value;

    if (nama === "" || alamat === "" || wa === "") {
        alert("Semua data harus diisi!");
        return;
    }

    let pesanan = {
        nama: nama,
        alamat: alamat,
        wa: wa,
        produk: "Es Teler",
        harga: 10000,
        waktu: new Date().toLocaleString()
    };

    let data = JSON.parse(localStorage.getItem("pesanan")) || [];
    data.push(pesanan);
    localStorage.setItem("pesanan", JSON.stringify(data));

    let waPenjual = "6281234567890"; // ganti nomor kamu

    let pesan =
        "Halo saya pesan Es Teler 🍧%0A" +
        "Nama: " + nama + "%0A" +
        "Alamat: " + alamat + "%0A" +
        "No WA: " + wa;

    window.open("https://wa.me/" + waPenjual + "?text=" + pesan);

    alert("Pesanan berhasil!");
}
