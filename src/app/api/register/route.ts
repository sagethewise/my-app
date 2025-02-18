//Company tablosunda kayıtlı olan şirketlere bakarak register yapılıyor. Henüz kayıtlı olmayan şirkete id atama olmadı.

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "mssql";
import poolPromise from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { EMAIL, PASSWORD, userData, companyData } = await req.json();
    console.log("✅ Register API çağrıldı - Email:", EMAIL);

    if (!EMAIL || !PASSWORD) {
      console.error("❌ Email veya şifre eksik!");
      return NextResponse.json({ success: false, error: "Email ve şifre zorunludur!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    const pool = await poolPromise;
    console.log("📌 MSSQL bağlantısı sağlandı!");

    // **Önce şirketi kontrol et**
    const companyResult = await pool.request()
      .input("COMPANYNAME", sql.NVarChar, companyData.companyName)
      .query("SELECT ID FROM COMPANIES WHERE COMPANYNAME = @COMPANYNAME");

    let companyId;

    if (companyResult.recordset.length > 0) {
      // **Şirket zaten varsa, ID'sini al**
      companyId = companyResult.recordset[0].ID;
      console.log("✅ Mevcut şirket bulundu, ID:", companyId);
    } else {
      // **Şirket yoksa, yeni oluştur**
      const newCompanyId = sql.UniqueIdentifier();
      await pool.request()
        .input("ID", sql.UniqueIdentifier, newCompanyId)
        .input("COMPANYNAME", sql.NVarChar, companyData.companyName)
        .input("SECTOR", sql.NVarChar, companyData.sector)
        .input("COUNTRY", sql.NVarChar, companyData.country)
        .input("CITY", sql.NVarChar, companyData.city)
        .input("ADDRESS", sql.NVarChar, companyData.address)
        .query(`
          INSERT INTO COMPANIES (ID, COMPANYNAME, SECTOR, COUNTRY, CITY, ADDRESS, CREATED_AT)
          VALUES (@ID, @COMPANYNAME, @SECTOR, @COUNTRY, @CITY, @ADDRESS, GETDATE())
        `);
      companyId = newCompanyId;
      console.log("✅ Yeni şirket oluşturuldu, ID:", companyId);
    }

    // **Kullanıcıyı USERS tablosuna ekle**
    await pool.request()
      .input("EMAIL", sql.NVarChar, EMAIL)
      .input("PASSWORD", sql.NVarChar, hashedPassword)
      .input("NAME", sql.NVarChar, userData.name)
      .input("TITLE", sql.NVarChar, userData.title)
      .input("POSITION", sql.NVarChar, userData.position)
      .input("PHONE", sql.NVarChar, userData.phone)
      .input("COUNTRY", sql.NVarChar, userData.country)
      .input("CITY", sql.NVarChar, userData.city)
      .input("ADDRESS", sql.NVarChar, userData.address)
      .input("COMPANYID", sql.UniqueIdentifier, companyId) // **Yeni veya var olan şirketin ID'sini kullan**
      .input("STATUS", sql.NVarChar, "Active")
      .query(`
        INSERT INTO USERS (ID, EMAIL, PASSWORD, NAME, TITLE, POSITION, PHONE, COUNTRY, CITY, ADDRESS, COMPANYID, STATUS, CREATED_AT)
        VALUES (NEWID(), @EMAIL, @PASSWORD, @NAME, @TITLE, @POSITION, @PHONE, @COUNTRY, @CITY, @ADDRESS, @COMPANYID, @STATUS, GETDATE())
      `);

    console.log("✅ Kullanıcı başarıyla eklendi!");

    return NextResponse.json({ success: true, message: "Kullanıcı başarıyla oluşturuldu!" });
  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return NextResponse.json({ success: false, error: "Sunucu hatası! Lütfen tekrar deneyin." }, { status: 500 });
  }
}
