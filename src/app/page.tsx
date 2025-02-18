import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Ana Sayfa</h1>
      <Link href="/login">
        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg">
          Login Sayfasına Git
        </button>
      </Link>
    </div>
  );
}
