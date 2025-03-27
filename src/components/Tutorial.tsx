
import React from 'react';
import { Check, FileSpreadsheet, Clipboard, Database, Save, HelpCircle, RefreshCw } from 'lucide-react';

const Tutorial = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Tutorial Penggunaan</h2>
        </div>
        <p className="mt-2 text-indigo-100">Panduan lengkap visualisasi data pangan</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-600" />
            Langkah 1: Konfigurasi Data
          </h3>
          <div className="text-gray-600 space-y-2">
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Pilih jenis data yang ingin divisualisasikan (Produksi, Impor, atau Konsumsi).</p>
            </div>
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Pilih negara untuk data yang akan ditampilkan.</p>
            </div>
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Tentukan tahun awal dan jumlah periode tahun yang akan ditampilkan (default: tahun 2010 dengan 14 periode).</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
            Langkah 2: Input Data
          </h3>
          <div className="text-gray-600 space-y-2">
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Masukkan data untuk setiap jenis pangan per tahun secara manual atau dengan fitur paste dari Excel.</p>
            </div>
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Anda dapat menambah atau mengurangi jumlah tahun dengan tombol + dan - di sebelah jumlah tahun.</p>
            </div>
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <p>Fitur copy-paste dari Excel:</p>
                <ul className="list-disc ml-6 mt-1 text-sm">
                  <li>Salin data dari Excel (misalnya: 313.787, 412.452, 500.123)</li>
                  <li>Klik ikon clipboard di sebelah jenis produksi atau paste langsung ke dalam sel tabel</li>
                  <li>Data akan otomatis dikonversi menjadi bilangan bulat tanpa tanda baca (313787, 412452, 500123)</li>
                  <li>Bisa juga copy-paste beberapa baris dan kolom Excel sekaligus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-indigo-600" />
            Langkah 3: Riset Data dan Pembaruan
          </h3>
          <div className="text-gray-600 space-y-2">
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Gunakan tombol "Riset Data" untuk menghasilkan data sampel yang realistis berdasarkan tren global.</p>
            </div>
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Fitur ini akan mereset semua input dan mengembalikan ke pengaturan default (tahun awal 2010 dengan 14 periode).</p>
            </div>
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Gunakan tombol "Reset" untuk mengembalikan data ke status terakhir yang disimpan.</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Save className="h-5 w-5 text-indigo-600" />
            Langkah 4: Simpan dan Visualisasi
          </h3>
          <div className="text-gray-600 space-y-2">
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Setelah selesai input data, klik tombol "Simpan & Perbarui Grafik" untuk memperbarui visualisasi.</p>
            </div>
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Visualisasi akan diperbarui dengan data terbaru yang telah Anda masukkan.</p>
            </div>
            <div className="flex gap-2">
              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
              <p>Anda dapat mengunduh grafik dalam format PNG dengan mengklik tombol "Unduh Grafik".</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Clipboard className="h-5 w-5 text-indigo-600" />
            Tips Penggunaan
          </h3>
          <div className="bg-indigo-50 p-4 rounded-lg text-gray-700">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <Check size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                <p>Untuk hasil terbaik, pastikan data yang dimasukkan memiliki skala yang konsisten (contoh: dalam 1000 MT).</p>
              </li>
              <li className="flex gap-2">
                <Check size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                <p>Unduh grafik setelah perubahan data untuk menyimpan salinan visualisasi.</p>
              </li>
              <li className="flex gap-2">
                <Check size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                <p>Gunakan fitur "Deploy dengan GitHub" untuk mempublikasikan aplikasi visualisasi Anda secara online.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
