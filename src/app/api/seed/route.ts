import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "mssql"; // ✅ `sql` nesnesini burada kullanacağız
import poolPromise from "@/lib/db";

export async function GET() {
  try {
    const pool = await poolPromise;

    // ✅ Dummy şifreleri hash'le
    const password1 = await bcrypt.hash("Password123!", 10);


    // ✅ Dummy kullanıcıları ekle (sql nesnesini kullanarak)
    await pool.request()
      .input("EMAIL", sql.NVarChar, "user1@example.com")
      .input("PASSWORD", sql.NVarChar, password1)
      .input("NAME", sql.NVarChar, "Aslı Yılmaz")
      .input("TITLE", sql.NVarChar, "Ms.")
      .input("POSITION", sql.NVarChar, "Software Engineer")
      .input("PHONE", sql.NVarChar, "123-456-7890")
      .input("COUNTRY", sql.NVarChar, "Turkey")
      .input("CITY", sql.NVarChar, "Istanbul")
      .input("ADDRESS", sql.NVarChar, "Levent Mah. No: 10")
      .input("COMPANYID", sql.UniqueIdentifier, "40A96578-9D49-4FA4-89FD-57CA79DD736A")
      .input("STATUS", sql.NVarChar, "Active")
      .query(`
        INSERT INTO USERS (ID, EMAIL, PASSWORD, NAME, TITLE, POSITION, PHONE, COUNTRY, CITY, ADDRESS, COMPANYID, STATUS, CREATED_AT) 
        VALUES (NEWID(), @EMAIL, @PASSWORD, @NAME, @TITLE, @POSITION, @PHONE, @COUNTRY, @CITY, @ADDRESS, @COMPANYID, @STATUS, GETDATE())
      `);

    return NextResponse.json({ success: true, message: "✅ Dummy kullanıcılar başarıyla eklendi!" });
  } catch (error) {
    console.error("❌ Dummy veri ekleme hatası:", error);
    return NextResponse.json({ success: false, error: "Dummy veri eklenirken hata oluştu!" }, { status: 500 });
  }
}
