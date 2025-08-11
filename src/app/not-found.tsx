import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center">
      <h1 className="text-5xl font-extrabold mb-4">404</h1>
      <p className="text-xl mb-8">Halaman yang kamu cari tidak ditemukan.</p>
      <Link href="/" className="px-6 py-2 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 transition">
        Back to Home
      </Link>
    </div>
  );
}