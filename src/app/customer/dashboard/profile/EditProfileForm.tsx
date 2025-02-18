"use client";

import { useState } from "react";
import { UserProfileProps, countries } from "@/types";
import { userTitles, userPositions } from "@/types";

export default function EditProfileForm({ user, onSave }: { user: UserProfileProps; onSave: (updatedUser: UserProfileProps) => void }) {
  const [formData, setFormData] = useState(user);
  const [preview, setPreview] = useState(user.profilePicture);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === "profilePicture" && (e.target as HTMLInputElement).files) {
      const file = (e.target as HTMLInputElement).files![0];
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData({ ...formData, profilePicture: imageUrl });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const formatPhoneNumber = (input: string) => {
    // Sadece rakam ve `+` karakterini bırak
    let cleaned = input.replace(/[^\d+]/g, "");
  
    // "+90-555-555-5555" formatında telefon numarası oluştur
    if (cleaned.startsWith("+")) {
      cleaned = cleaned.replace(/^(\+\d{2})(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
    } else {
      cleaned = cleaned.replace(/^(\d{3})(\d{3})(\d{4})/, "+$1-$2-$3");
    }
  
    return cleaned;
  };
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setFormData({ 
      ...formData, 
      country: selectedCountry, 
      city: countries.find(c => c.name === selectedCountry)?.cities[0] || "" 
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>

      {/* Profil Fotoğrafı */}
      <div className="mb-6 text-center flex flex-col items-center">
        <label className="block text-gray-600 mb-2">Profile Picture</label>
        <div className="flex flex-col items-center">
          <img src={preview} alt="Profile Preview" className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg mb-4" />
          <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} className="mt-2 border p-2 rounded-lg w-full max-w-lg" />
        </div>
      </div>

      {/* Kullanıcı Adı */}
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-2 w-full rounded-lg mb-4"/>

      {/* Telefon Numarası */}
      <input 
  type="text" 
  name="phone" 
  value={formData.phone} 
  onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })} 
  placeholder="+90-555-555-5555"
  className="border p-2 w-full rounded-lg mb-4"
/>

      {/* Pozisyonu */}
      <select name="position" value={formData.position} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4">
  {userPositions.map((position) => (
    <option key={position} value={position}>{position}</option>
  ))}
</select>

      {/* Title - Dropdown */}
      <select name="title" value={formData.title} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4">
  {userTitles.map((title) => (
    <option key={title} value={title}>{title}</option>
  ))}
</select>

      {/* Ülke Dropdown */}
      <select name="country" value={formData.country} onChange={handleCountryChange} className="border p-2 w-full rounded-lg mb-4">
        {countries.map((country) => (
          <option key={country.name} value={country.name}>{country.name}</option>
        ))}
      </select>

      {/* Şehir Dropdown */}
      <select name="city" value={formData.city} onChange={handleChange} className="border p-2 w-full rounded-lg mb-4">
        {countries.find(c => c.name === formData.country)?.cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {/* Kullanıcı Adı */}
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 w-full rounded-lg mb-4"/>


      <button type="submit" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-green-500 w-full">
        Save Changes</button>
    </form>
  );
}
