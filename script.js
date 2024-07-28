document.addEventListener('DOMContentLoaded', () => {
    // Mengambil elemen form dan daftar absensi
    const form = document.getElementById('attendanceForm');
    const attendanceList = document.getElementById('attendanceList');

    // Menangani event submit pada form
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah pengiriman form default
    
        // Mengambil nilai dari input form
        const studentName = document.getElementById('studentName').value.trim();
        const attendanceDate = document.getElementById('attendanceDate').value;
    
        // Mengambil nilai input numerik dan menetapkan default 0 jika kosong
        const push = parseFloat(document.getElementById('push').value) || 0;
        const full = parseFloat(document.getElementById('full').value) || 0;
    
        // Mengambil nilai input teks dan menetapkan default '...' jika kosong
        const add = document.getElementById('add').value.trim() || 'none';
    
        // Validasi input
        // Periksa jika input `studentName` dan `attendanceDate` tidak kosong
        if (studentName && attendanceDate) {
            // Membuat baris baru untuk tabel
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${studentName}</td>
                <td>${attendanceDate}</td>
                <td>${push}</td>
                <td>${full} min</td>
                <td>${add}</td>
                <td><button class="delete-button">Delete</button></td> <!-- Tombol hapus -->
            `;
            // Menambahkan baris ke tabel
            attendanceList.appendChild(row);
    
            // Mengosongkan input form setelah data ditambahkan
            form.reset();
        } else {
            alert('Semua input yang tidak bertipe angka harus diisi.');
        }
    });
    


    // Menangani event klik pada tombol hapus
    attendanceList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            // Tampilkan konfirmasi
            if (window.confirm('Yakin ingin menghapus?')) {
                // confirm 2
                if (window.confirm('Apakah anda sudah benar-benar yakin?')) {
                    // Menghapus baris yang mengandung tombol hapus yang diklik
                    const row = event.target.closest('tr');
                    row.remove();
                }
            }
        }
    });

});
