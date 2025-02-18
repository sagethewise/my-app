import SearchSection from "../../components/ui/SearchSection";
import LoginForm from "../../components/ui/LoginForm";
import LatestUpdates from "../../components/ui/LatestUpdates";
import AuthHeader from "@/components/layout/AuthHeader";


export default function LoginPage() {

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Email ve password değerlerini al
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
  
    console.log("🟢 Giriş yapılıyor - Email:", email);
    
    if (!email || !password) {
      alert("Lütfen e-posta ve şifre alanlarını doldurun!");
      return;
    }
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ EMAIL: email, PASSWORD: password }), // ✅ Email değişkeni artık null olmayacak
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("Giriş başarılı!");
      } else {
        alert("Giriş başarısız: " + data.error);
      }
    } catch (error) {
      console.error("❌ API Hatası:", error);
    }
  };
  
  return (
    <div>
           <AuthHeader />
      <SearchSection />
 
      <div className="flex justify-center gap-10 px-6 py-12">
        <LoginForm />
        <LatestUpdates />
      </div>
    </div>
  );
}
