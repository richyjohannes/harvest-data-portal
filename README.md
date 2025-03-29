
# Harvest Data Portal

Aplikasi visualisasi data produksi pertanian modern dengan kemampuan input kompatibel Excel dan pembuatan grafik dinamis.

## Fitur

- UI modern dan responsif dengan antarmuka tab
- Copy-paste langsung dari Excel (mendukung data multi-baris/kolom)
- Format otomatis angka (menghapus tanda baca)
- Jenis produksi dinamis (tambah, edit, hapus)
- Grafik visualisasi data interaktif
- Fungsi reset ke data default
- Dokumentasi tutorial komprehensif

## Pengembangan Lokal

### Prasyarat

- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- npm atau yarn package manager

### Memulai

1. Clone repositori:
   ```sh
   git clone https://github.com/jr-repository/visualdata-richy.git
   cd visualdata-richy
   ```

2. Instal dependensi:
   ```sh
   npm install
   # atau
   yarn install
   ```

3. Mulai server pengembangan:
   ```sh
   npm run dev
   # atau
   yarn dev
   ```

4. Buka browser dan arahkan ke:
   ```
   http://localhost:8080
   ```

## Deployment ke GitHub Pages

### Cara Deploy Otomatis (Disarankan)

Proyek ini dikonfigurasi dengan GitHub Actions untuk deploy otomatis ke GitHub Pages ketika perubahan di-push ke branch main.

1. Pastikan repositori GitHub Anda sudah dibuat.

2. Push kode Anda ke repositori:
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/jr-repository/visualdata-richy.git
   git push -u origin main
   ```

3. Konfigurasi GitHub Pages:
   - Buka repositori Anda di GitHub
   - Navigasi ke Settings > Pages
   - Di bawah "Source", pilih "GitHub Actions"
   - Deployment akan otomatis dimulai ketika Anda push ke branch main

4. Setelah deployment selesai, situs Anda akan tersedia di:
   ```
   https://jr-repository.github.io/visualdata-richy/
   ```

### PENTING: Troubleshooting GitHub Pages

Jika halaman Anda kosong setelah deployment:

1. Pastikan file `vite.config.ts` memiliki base path yang benar:
   ```js
   base: '/visualdata-richy/',  // HARUS sesuai dengan nama repositori Anda
   ```

2. Pastikan Anda menggunakan HashRouter di `App.tsx` bukan BrowserRouter:
   ```jsx
   <HashRouter>
     <Routes>
       {/* ... */}
     </Routes>
   </HashRouter>
   ```

3. Periksa tab Actions di repositori GitHub untuk memastikan workflow berjalan dengan sukses.

4. Tunggu beberapa menit setelah deployment sukses, karena GitHub Pages mungkin memerlukan waktu untuk menyebarkan perubahan.

5. Hapus cache browser Anda atau coba di jendela penyamaran/incognito.

### Cara Deploy Manual

Jika Anda ingin deploy secara manual atau perlu deploy dari lingkungan lokal:

1. Build proyek:
   ```sh
   npm run build
   # atau
   yarn build
   ```

2. Output build akan berada di folder `dist`. Anda dapat deploy folder ini ke layanan hosting situs statis mana pun.

3. Untuk deployment manual GitHub Pages:
   ```sh
   # Install gh-pages jika Anda belum melakukannya
   npm install -g gh-pages
   
   # Deploy folder dist
   gh-pages -d dist
   ```

## Kustomisasi

### Nilai Default

- Tahun default: 2010
- Jumlah tahun default: 14
- Jenis produksi default dapat diedit di aplikasi

### Reset Data

Gunakan tombol "Riset Data" untuk mengembalikan semua data input ke nilai default.

## Pemecahan Masalah

### Masalah Umum

1. **Error build**: Pastikan Anda memiliki versi Node.js yang benar (v18+).
2. **Masalah deployment**: Periksa apakah repositori Anda dikonfigurasi dengan benar untuk GitHub Pages.
3. **Paste Excel tidak berfungsi**: Pastikan Anda menyalin dari spreadsheet Excel dan bukan file teks.

### GitHub Pages Tidak Memperbarui

Jika situs GitHub Pages Anda tidak memperbarui setelah workflow berhasil dijalankan:

1. Periksa tab Actions di repositori Anda untuk memverifikasi bahwa workflow berjalan dengan sukses
2. Pastikan Anda telah mengonfigurasi GitHub Pages untuk deploy dari GitHub Actions
3. Hapus cache browser Anda atau coba di jendela penyamaran/incognito
4. Periksa apakah base path di vite.config.ts sudah benar: `/visualdata-richy/`

## Kontribusi

Kontribusi sangat diharapkan! Silakan kirimkan Pull Request.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file LICENSE untuk detailnya.
