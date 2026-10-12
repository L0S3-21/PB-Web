let namaUser = "";
let jmlPilihan = 0;
let arrayPilihan = [];
let pilihanDipilih = "";

function prosesStep1() {
    namaUser = document.getElementById("inputNama").value.trim();
    jmlPilihan = parseInt(document.getElementById("inputJml").value);

    if (namaUser === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }
    if (isNaN(jmlPilihan) || jmlPilihan < 1) {
        alert("Jumlah pilihan harus berupa angka integer positif (minimal 1)!");
        return;
    }

    document.getElementById("inputNama").disabled = true;
    document.getElementById("inputJml").disabled = true;

    let container = document.getElementById("containerPilihanInput");
    container.innerHTML = "";

    for (let i = 1; i <= jmlPilihan; i++) {
        container.innerHTML += `
            <div>
                <label>Pilihan ${i} :</label>
                <input type="text" id="pilihanTeks_${i}" placeholder="Masukkan Teks">
            </div>
            <br>
        `;
    }

    document.getElementById("step2").style.display = "block";
}

function prosesStep2() {
    arrayPilihan = [];
    for (let i = 1; i <= jmlPilihan; i++) {
        let val = document.getElementById(`pilihanTeks_${i}`).value.trim();
        if (val === "") {
            alert(`Teks Pilihan ${i} tidak boleh kosong!`);
            return;
        }
        arrayPilihan.push(val);
        document.getElementById(`pilihanTeks_${i}`).disabled = true;
    }

    let containerRadio = document.getElementById("containerRadio");
    containerRadio.innerHTML = "";

    for (let i = 0; i < arrayPilihan.length; i++) {
        containerRadio.innerHTML += `
            <label style="width: auto; font-weight: normal;">
                <input type="radio" name="radioPilihan" value="${arrayPilihan[i]}" ${i === 0 ? "checked" : ""}> 
                ${arrayPilihan[i]}
            </label><br><br>`;
    }

    document.getElementById("step3").style.display = "block";
}

function prosesStep3() {
    const radios = document.getElementsByName("radioPilihan");
    for (let r of radios) {
        if (r.checked) {
            pilihanDipilih = r.value;
            break;
        }
    }

    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";
}

function prosesStep4() {
    let emailInput = document.getElementById("inputEmail").value.trim();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput)) {
        alert("Format email salah! Masukkan kembali email dengan benar (contoh: email@gmail.com).");
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputEmail").focus();
        return;
    }

    document.getElementById("step4").style.display = "none";
    
    let deretanPilihan = arrayPilihan.join(", ");
    let hasilTeks = `Hallo, nama saya ${namaUser}, email ${emailInput} saya mempunyai sejumlah ${jmlPilihan} pilihan yaitu ${deretanPilihan}, dan saya memilih ${pilihanDipilih}`;
    
    document.getElementById("outputTeks").innerText = hasilTeks;
    document.getElementById("step5").style.display = "block";
}