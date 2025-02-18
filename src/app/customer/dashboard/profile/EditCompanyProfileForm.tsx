"use client";

import { useState } from "react";
import { CompanyProfileProps, countries,sectors } from "@/types";



export default function EditCompanyProfileForm({ company, onSave }: { company: CompanyProfileProps; onSave: (updatedCompany: CompanyProfileProps) => void }) {
  const [formData, setFormData] = useState(company);
  const [preview, setPreview] = useState(company.logo); // ✅ Logo için önizleme

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.name === "logo" && target.files) {
      const file = target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData({ ...formData, logo: imageUrl });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} 
      className="w-full max-w-none container mx-auto px-0 py-8 bg-white shadow-md rounded-lg">
      
      <h2 className="text-3xl font-semibold mb-6 text-center">Edit Company Profile</h2>

      {/* Şirket Logosu Yükleme */}
      <div className="mb-6 text-center flex flex-col items-center">
        <label className="block text-gray-600 mb-2">Company Logo</label>
        <img src={preview} alt="Company Logo Preview" className="w-40 h-40 rounded-full border-4 border-green-500 shadow-lg mb-4" />
        <input type="file" name="logo" accept="image/*" onChange={handleChange} className="mt-2 border p-2 rounded-lg w-full max-w-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10">
        <div>
          <label className="block text-gray-600">Company Name</label>
          <input 
            type="text" 
            name="companyName" 
            value={formData.companyName} 
            onChange={handleChange} 
            className="border p-3 w-full rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600">Website</label>
          <input 
            type="text" 
            name="website" 
            value={formData.website} 
            onChange={handleChange} 
            className="border p-3 w-full rounded-lg"
          />
        </div>

        {/* Sektör Dropdown */}
        <div>
          <label className="block text-gray-600">Sector</label>
          <select name="sector" value={formData.sector} onChange={handleChange} className="border p-3 w-full rounded-lg">
            {sectors.map((sector) => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>

        {/* Ülke Dropdown */}
        <div>
          <label className="block text-gray-600">Country</label>
          <select name="country" value={formData.country} onChange={handleCountryChange} className="border p-3 w-full rounded-lg">
            {countries.map((country) => (
              <option key={country.name} value={country.name}>{country.name}</option>
            ))}
          </select>
        </div>

        {/* Şehir Dropdown */}
        <div>
          <label className="block text-gray-600">City</label>
          <select name="city" value={formData.city} onChange={handleChange} className="border p-3 w-full rounded-lg">
            {countries.find(c => c.name === formData.country)?.cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Company Address</label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            className="border p-3 w-full rounded-lg"
          />
        </div>

        {/* Şirket Durumu - Dropdown */}
        <div>
          <label className="block text-gray-600">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="border p-3 w-full rounded-lg">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <button type="submit" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-green-500 w-full">
        Save Changes
      </button>
    </form>
  );
}
