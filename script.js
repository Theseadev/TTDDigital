const canvas = document.getElementById('signature-pad');
const signaturePad = new SignaturePad(canvas, { penColor: "#000000" });

// Fungsi Clear untuk Menghapus Tanda Tangan
function clearSignature() {
  signaturePad.clear();
}

// Fungsi Download untuk Menyimpan Tanda Tangan
function downloadSignature() {
  if (signaturePad.isEmpty()) {
    alert("Silakan buat tanda tangan dulu!");
    return;
  }
  const dataURL = signaturePad.toDataURL("image/png");
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'tanda-tangan-transparan.png';
  link.click();
}

// Pengaturan untuk Pilihan Warna Preset
const colorOptions = document.querySelectorAll('.color-option');
const colorInput = document.getElementById('colorPickerInput');

// Mengubah Warna Kuas berdasarkan Pilihan Preset
colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    colorOptions.forEach(o => o.classList.remove('active'));
    option.classList.add('active');
    signaturePad.penColor = option.dataset.color;
  });
});

// Mengubah Warna Kuas berdasarkan Input Color Picker
colorInput.addEventListener('input', (e) => {
  colorOptions.forEach(o => o.classList.remove('active'));
  signaturePad.penColor = e.target.value;
});

// Menyesuaikan Ukuran Canvas dengan Ukuran Layar
function resizeCanvas() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
  signaturePad.clear();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
