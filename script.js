document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendanceForm');
    const attendanceList = document.getElementById('attendanceList');

    // Fungsi untuk memuat data dari localStorage dan mengisi tabel
    function loadData() {
        const savedData = localStorage.getItem('attendanceData');
        if (savedData) {
            const data = JSON.parse(savedData);
            data.forEach(item => {
                addRow(item.studentName, item.attendanceDate, item.push, item.full, item.add);
            });
        }
    }

    // Fungsi untuk menyimpan data ke localStorage
    function saveData() {
        const rows = attendanceList.querySelectorAll('tr');
        const data = Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td');
            return {
                studentName: cells[0].textContent,
                attendanceDate: cells[1].textContent,
                push: parseFloat(cells[2].textContent),
                full: parseFloat(cells[3].textContent),
                add: cells[4].textContent
            };
        });
        localStorage.setItem('attendanceData', JSON.stringify(data));
    }

    // Fungsi untuk menambahkan baris ke tabel
    function addRow(studentName, attendanceDate, push, full, add) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${studentName}</td>
            <td>${attendanceDate}</td>
            <td>${push}</td>
            <td>${full} min</td>
            <td>${add}</td>
            <td><button class="delete-button">Delete</button></td>
        `;
        attendanceList.appendChild(row);
    }

    // Menangani event submit pada form
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah pengiriman form secara default
        const studentName = document.getElementById('studentName').value.trim();
        const attendanceDate = document.getElementById('attendanceDate').value;
        const push = parseFloat(document.getElementById('push').value) || 0;
        const full = parseFloat(document.getElementById('full').value) || 0;
        const add = document.getElementById('add').value.trim() || 'none';

        // Validasi input, pastikan nama siswa dan tanggal hadir tidak kosong
        if (studentName && attendanceDate) {
            addRow(studentName, attendanceDate, push, full, add); // Menambahkan baris ke tabel
            form.reset(); // Mengosongkan input form
            saveData(); // Menyimpan data ke localStorage
        } else {
            alert('Semua input yang tidak bertipe angka harus diisi.'); // Menampilkan pesan jika input tidak lengkap
        }
    });

    // Menangani event klik pada tombol hapus
    attendanceList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            setTimeout(() => {
                if (window.confirm('Are you sure to delete this table?')) {
                    if (window.confirm('Are you really sure?')) {
                        const row = event.target.closest('tr');
                        row.remove(); // Menghapus baris yang diklik
                        saveData(); // Menyimpan data ke localStorage setelah penghapusan
                    }
                }
            }, 10); // 10 milidetik (0.3 detik) penundaan sebelum alert pertama muncul
        }
    });
    

    // Memuat data dari localStorage saat halaman dimuat
    loadData();
});
