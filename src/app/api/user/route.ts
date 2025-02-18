import { NextResponse } from "next/server";
import poolPromise from "@/lib/db";
import sql from "mssql";
import { cookies } from "next/headers"; // ✅ Kullanıcı ID'sini oturumdan almak için

export async function GET(req: Request) {
  try {
    console.log("✅ /api/user endpointi çağrıldı.");

    // Kullanıcı ID'sini oturumdan al
    const cookieStore = cookies();
    const userId = (await cookieStore).get("userId")?.value;
    
    console.log("🔍 Oturumdan gelen Kullanıcı ID'si:", userId);

    if (!userId) {
      console.error("❌ Kullanıcı kimliği bulunamadı!");
      return new NextResponse(JSON.stringify({ success: false, error: "User ID not found in session" }), {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
      });
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input("ID", sql.UniqueIdentifier, userId)
      .query("SELECT [EMAIL] FROM [USERS] WHERE [ID] = @ID");

    console.log("📌 MSSQL sorgusu çalıştırıldı, sonucu:", result.recordset);

    if (result.recordset.length === 0) {
      console.error("❌ Kullanıcı bulunamadı!");
      return new NextResponse(JSON.stringify({ success: false, error: "Kullanıcı bulunamadı!" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
      });
    }

    console.log("✅ Kullanıcı email bilgisi alındı:", result.recordset[0].EMAIL);
    return new NextResponse(JSON.stringify({ success: true, email: result.recordset[0].EMAIL }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("❌ MSSQL sorgusu sırasında hata oluştu:", error);
    return new NextResponse(JSON.stringify({ success: false, error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    });
  }
}
