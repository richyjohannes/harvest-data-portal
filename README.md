
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

### Cara Deploy Manual (Step-by-Step Lengkap)

1. **Persiapan repositori GitHub**
   - Buat repositori baru di GitHub (jika belum ada)
   - Pastikan repositori memiliki nama `visualdata-richy` (untuk konsistensi dengan base path)

2. **Konfigurasi file `vite.config.ts`**
   - Pastikan `base` di `vite.config.ts` sudah benar:
     ```js
     base: '/visualdata-richy/', // HARUS sesuai nama repositori
     ```
   - File terdapat di root proyek

3. **Konfigurasi `App.tsx` untuk GitHub Pages**
   - Pastikan menggunakan `HashRouter`, bukan `BrowserRouter` di `src/App.tsx`:
     ```jsx
     import { HashRouter, Routes, Route } from "react-router-dom";
     // ...
     <HashRouter>
       <Routes>
         {/* ... */}
       </Routes>
     </HashRouter>
     ```

4. **Hubungkan dengan repositori jika belum dilakukan**
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/jr-repository/visualdata-richy.git
   git push -u origin main
   ```

5. **Instal gh-pages jika belum terinstall**
   ```sh
   npm install gh-pages --save-dev
   ```

6. **Tambahkan script deploy di package.json**
   - Buka `package.json`
   - Tambahkan script berikut di bagian "scripts":
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```

7. **Build dan deploy proyek**
   ```sh
   npm run deploy
   ```
   - Perintah ini akan menjalankan build dan meng-upload folder `dist` ke branch `gh-pages`

8. **Konfigurasi GitHub Pages di repositori**
   - Buka repositori GitHub Anda
   - Klik tab "Settings"
   - Di sidebar kiri, klik "Pages"
   - Di bagian "Source", pilih "Deploy from a branch"
   - Pada dropdown branch, pilih "gh-pages" dan folder "/root"
   - Klik "Save"

9. **Verifikasi deployment**
   - Tunggu beberapa menit setelah konfigurasi
   - Periksa halaman GitHub Pages di URL:
     ```
     https://jr-repository.github.io/visualdata-richy/
     ```

10. **Cara Memperbarui Aplikasi Setelah Perubahan**
    - Setelah melakukan perubahan kode:
      ```sh
      git add .
      git commit -m "Update aplikasi"
      git push origin main
      npm run deploy
      ```

### PENTING: Troubleshooting GitHub Pages Halaman Kosong

Jika halaman masih kosong setelah deployment:

1. **Periksa Browser Console**
   - Buka Chrome DevTools (F12)
   - Lihat tab "Console" untuk error
   - Perhatikan error path "404" yang mengindikasikan masalah loading aset

2. **Periksa Struktur File Dist**
   - Build lokal dengan `npm run build`
   - Periksa folder `dist` yang dihasilkan
   - Pastikan file `index.html` ada di root folder `dist`
   - Periksa path aset di `index.html` sudah relatif terhadap `/visualdata-richy/`

3. **Pastikan Base URL Benar di HTML**
   - Buka file `dist/index.html` setelah build
   - Pastikan semua path javascript dan CSS dimulai dengan `/visualdata-richy/`
   - Contoh yang benar: `<script type="module" crossorigin src="/visualdata-richy/assets/..."></script>`

4. **Tunggu Cache GitHub Pages Diperbarui**
   - GitHub Pages mungkin membutuhkan waktu 5-10 menit untuk memperbarui cache
   - Coba akses di browser incognito/mode penyamaran untuk menghindari cache lokal

5. **Verifikasi Struktur Repository dan Branch**
   - Periksa branch gh-pages sudah berisi file-file yang dihasilkan dari build
   - Pastikan file-file terletak di root, bukan dalam subfolder

6. **Periksa Konfigurasi GitHub Pages**
   - Di Settings > Pages, pastikan "Source" adalah branch "gh-pages" dan folder "/ (root)"
   - Tunggu status deployment menunjukkan "Your site is published at https://..."

7. **Cara Hard Reset Jika Masih Bermasalah**
   ```sh
   # Hapus branch gh-pages lokal dan remote
   git branch -D gh-pages
   git push origin --delete gh-pages
   
   # Deploy ulang dari awal
   npm run build
   npx gh-pages -d dist
   ```

8. **Periksa Kompatibilitas Browser**
   - Coba buka di browser berbeda (Chrome, Firefox, Edge)
   - Pastikan browser mendukung semua fitur yang digunakan aplikasi

## Kontribusi

Kontribusi sangat diharapkan! Silakan kirimkan Pull Request.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file LICENSE untuk detailnya.
