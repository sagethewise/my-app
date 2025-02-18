import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "mssql";
import poolPromise from "@/lib/db";
import { cookies } from "next/headers"; // ✅ Kullanıcı ID'sini session çerezlerine eklemek için

export async function POST(req: Request) {
  try {
    const { EMAIL, PASSWORD } = await req.json();
    console.log("✅ Login API çağrıldı - Email:", EMAIL);

    if (!EMAIL || !PASSWORD) {
      console.error("❌ Email veya şifre eksik!");
      return NextResponse.json({ success: false, error: "Email ve şifre zorunludur!" }, { status: 400 });
    }

    const pool = await poolPromise;
    console.log("📌 MSSQL bağlantısı sağlandı!");

    // **Kullanıcıyı ve şirket bilgilerini çek**
    const result = await pool.request()
      .input("EMAIL", sql.NVarChar, EMAIL.toLowerCase()) // ✅ Küçük harfe çevirerek sorgu yap
      .query(`
        SELECT U.ID, U.EMAIL, U.PASSWORD, U.NAME, U.COMPANYID, C.COMPANYNAME 
        FROM USERS U 
        LEFT JOIN COMPANIES C ON U.COMPANYID = C.ID
        WHERE LOWER(U.EMAIL) = LOWER(@EMAIL)
      `);

    console.log("📌 MSSQL sorgusu çalıştırıldı, sonucu:", result.recordset);

    if (result.recordset.length === 0) {
      console.error("❌ Kullanıcı bulunamadı!");
      return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı!" }, { status: 401 });
    }

    const user = result.recordset[0];
    console.log("✅ Kullanıcı bulundu:", user);

    // **Şifre doğrulaması yap**
    const isValid = await bcrypt.compare(PASSWORD, user.PASSWORD);
    console.log("📌 Şifre doğrulama sonucu:", isValid);

    if (!isValid) {
      console.error("❌ Şifre hatalı!");
      return NextResponse.json({ success: false, error: "Şifre hatalı!" }, { status: 401 });
    }

    // **Kullanıcı ID'sini oturum çerezlerine ekleyelim**
    (await
      // **Kullanıcı ID'sini oturum çerezlerine ekleyelim**
      cookies()).set("userId", user.ID, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ✅ Çerezlerin API çağrılarıyla iletilmesine izin verir
    });

    console.log("✅ Kullanıcı ID oturuma kaydedildi:", user.ID);

    return NextResponse.json({ 
      success: true, 
      message: "Giriş başarılı!", 
      user: { 
        email: user.EMAIL, 
        name: user.NAME, 
        companyName: user.COMPANYNAME || "Unknown Company" 
      } 
    });
  } catch (error) {
    console.error("❌ MSSQL hatası:", error);
    return NextResponse.json({ success: false, error: "Giriş sırasında hata oluştu!" }, { status: 500 });
  }
}
