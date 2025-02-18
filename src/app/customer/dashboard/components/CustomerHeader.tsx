import Link from 'next/link';

export default function CustomerHeader() {
  return (
    <header className="bg-blue-500 text-white py-4 shadow">
     <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
        <nav className="hidden md:flex space-x-6">
        <Link href="/customer/dashboard">Homepage</Link>
        <Link href="/customer/tickets">Knowledgebase</Link>
      </nav>
        </div>
         {/* Dil Seçimi */}
         <div className="flex items-center space-x-4">
          <button className="hover:underline">EN</button>
          <button className="hover:underline">TR</button>
        </div>
      </div>

    </header>
  );
}
