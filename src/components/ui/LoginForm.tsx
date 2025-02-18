"use client";

import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [EMAIL, setEmail] = useState("");
  const [PASSWORD, setPassword] = useState("");
  const [error, setError] = useState(""); // Hata mesajı state'i
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!EMAIL || !PASSWORD) {
      setError("E-posta ve şifre alanları boş bırakılamaz!");
      return;
    }

    if (!EMAIL.includes("@")) {
      setError("Geçerli bir e-posta adresi giriniz!");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ EMAIL, PASSWORD }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error);
        return;
      }

      console.log("✅ Kullanıcı Login Başarılı:", result.user);

      // **Şirket Bilgisi Alındı mı?**
      if (!result.user.companyName) {
        setError("Şirket bilgisi bulunamadı!");
        return;
      }

      // **Eğer şirket bilgisi varsa, giriş başarılı sayılır ve yönlendirme yapılır**
      if (result.user.companyName.toLowerCase().includes("sameup")) {
        router.push("/customer/dashboard");
      } else {
        router.push("/support/dashboard");
      }
    } catch (err) {
      setError("Sunucu hatası! Daha sonra tekrar deneyin.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-96">
      <div className="flex border-b pb-2">
        <button className="flex-1 text-blue-500 font-semibold border-b-2 border-blue-500">Login</button>
        <button className="flex-1 text-gray-500">Subscribe</button>
      </div>

      {/* ErrorMessage bileşeni sadece hata varsa gösterilecek */}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleLogin} className="space-y-4 mt-4">
        <InputField label="EMAIL" type="EMAIL" value={EMAIL} onChange={setEmail} />
        <InputField label="PASSWORD" type="PASSWORD" value={PASSWORD} onChange={setPassword} />
        <div className="flex justify-between text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember Me
          </label>
          <a href="#" className="text-blue-500">Forgot Password</a>
        </div>
        <Button type="submit" text="Giriş Yap" />
      </form>
    </div>
  );
}
