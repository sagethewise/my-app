"use client";

import { useState } from "react";
import { 
  UserProfileProps, 
  CompanyProfileProps, 
  defaultUser, 
  defaultCompany, 
  sectors, 
  userTitles, 
  userPositions, 
  countries 
} from "@/types";

export default function RegisterForm({ onClose }: { onClose: () => void }) {
  const [userData, setUserData] = useState<UserProfileProps>({ ...defaultUser, password: "", companyId: "" });
  const [companyData, setCompanyData] = useState<CompanyProfileProps>({ ...defaultCompany });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // ❌ Gmail, Yahoo gibi genel e-posta sağlayıcılarını engelleyen regex
  const corporateEmailRegex = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com|live\.com)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  // ✅ Güçlü şifre doğrulama regex'i
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "country") {
      setUserData({ ...userData, country: value, city: "" }); // Ülke değişirse şehir sıfırlanacak
    } else if (name in userData) {
      setUserData({ ...userData, [name]: value });
    } else {
      setCompanyData({ ...companyData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ Register butonuna basıldı! Form gönderiliyor...");

    const validationErrors: { email?: string; password?: string } = {};

    // ✅ E-Posta doğrulaması
    if (!corporateEmailRegex.test(userData.email)) {
      validationErrors.email = "Kurumsal bir e-posta adresi girin. (Gmail, Yahoo vb. yasak)";
    }

    // ✅ Şifre doğrulaması
    if (!passwordRegex.test(userData.password)) {
      validationErrors.password = "Şifre en az 8 karakter olmalı, büyük harf, küçük harf, rakam ve özel karakter içermelidir.";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return; // ✅ Hata varsa işlemi durdur

    try {
      setLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          EMAIL: userData.email, 
          PASSWORD: userData.password, 
          userData, 
          companyData 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Register başarılı:", data);
        alert("Kayıt başarılı! OTP kodu e-postanıza gönderildi.");
        onClose();
      } else {
        console.error("❌ Register hatası:", data.error);
        alert("Kayıt başarısız: " + data.error);
      }
    } catch (error) {
      console.error("❌ Fetch hatası:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>

      {/* Email Input */}
<div className="mb-4">
  <label className="block text-gray-700">E-Mail</label>
  <input 
    type="email" 
    name="email" 
    value={userData.email} 
    onChange={handleChange} 
    required 
    className={`border p-3 w-full rounded-lg italic text-gray-400 focus:text-black focus:not-italic focus:outline-none ${errors.email ? "border-red-500" : ""}`} 
    placeholder="Enter your email"
  />
  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
</div>

{/* Password Input */}
<div className="mb-4">
  <label className="block text-gray-700">Password</label>
  <input 
    type="password" 
    name="password" 
    value={userData.password} 
    onChange={handleChange} 
    required 
    className={`border p-3 w-full rounded-lg italic text-gray-400 focus:text-black focus:not-italic focus:outline-none ${errors.password ? "border-red-500" : ""}`} 
    placeholder="Enter your password"
  />
  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
</div>

      {/* Title Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <select name="title" value={userData.title} onChange={handleChange} className="border p-3 w-full rounded-lg">
          <option value="">Select Title</option>
          {userTitles.map((title) => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input type="text" name="name" value={userData.name} onChange={handleChange} required className="border p-3 w-full rounded-lg" placeholder="Enter your full name" />
      </div>

      {/* Position Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Position</label>
        <select name="position" value={userData.position} onChange={handleChange} className="border p-3 w-full rounded-lg">
          <option value="">Select Position</option>
          {userPositions.map((position) => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
      </div>

      {/* Country Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Country</label>
        <select name="country" value={userData.country} onChange={handleChange} className="border p-3 w-full rounded-lg">
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>{country.name}</option>
          ))}
        </select>
      </div>

      {/* Sector Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Sector</label>
        <select name="sector" value={companyData.sector} onChange={handleChange} className="border p-3 w-full rounded-lg">
          <option value="">Select Sector</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      {/* Şirket Bilgileri */}
      <h3 className="text-xl font-semibold mt-6 mb-4">Company Information</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Company Name</label>
        <input type="text" name="companyName" value={companyData.companyName} onChange={handleChange} required className="border p-3 w-full rounded-lg" placeholder="Enter company name" />
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full">
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
