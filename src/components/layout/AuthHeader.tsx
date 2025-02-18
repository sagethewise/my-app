"use client";

import Link from "next/link";
import { useSearch } from "@/context/SearchProvider"; // ✅ Yolu düzelttik
import { languages } from "@/types"; // ✅ `language` yerine `languages` dizisini kullandık
import { useState } from "react";

export default function Header() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // ✅ Varsayılan dili tanımladık

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedLanguage(event.target.value);
    console.log("Language changed to:", event.target.value);
  }

  return (
    <header className="bg-blue-500 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <div className="text-lg font-bold">Support Portal</div>
          <nav className="flex items-center space-x-8">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/news" className="hover:underline">News</Link>
          </nav>
        </div>
        {/* Dil Seçimi */}
        <div>
        <select 
            name="language" 
            value={selectedLanguage} 
            onChange={handleChange} 
            className="border bg-blue-500 text-white p-3 rounded-lg focus:outline-none focus:ring-2"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
