import { NextResponse } from "next/server";
import poolPromise from "@/lib/db"; // ✅ MSSQL bağlantısını içe aktardık
import sql from "mssql";

export async function POST(req: Request) {
  try {
    const { from, subject, supportType, priority, description, file, sendCopy } = await req.json();

    if (!from || !subject || !supportType || !description.trim()) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    }

    const ticketId = `TICKET-${Date.now()}`;
    const status = "UNASSIGNED"; // Yeni ticket başlangıçta atanmamış olacak
    const pool = await poolPromise;

    // MSSQL'e yeni ticket ekleme sorgusu
    await pool.request()
      .input("ID", sql.NVarChar, ticketId)
      .input("EMAIL", sql.NVarChar, from)
      .input("SUBJECT", sql.NVarChar, subject)
      .input("SUPPORTTYPE", sql.NVarChar, supportType)
      .input("PRIORITY", sql.NVarChar, priority)
      .input("DESCRIPTION", sql.NText, description)
      .input("FILEPATH", sql.NVarChar, file || null) // ✅ "file" yerine "file_path" kullanıldı
      .input("SENDCOPY", sql.Bit, sendCopy ? 1 : 0)
      .input("STATUS", sql.NVarChar, status)
      .input("CREATEDDATE", sql.DateTime, new Date()) // ✅ MSSQL’de daha iyi uyum için "CREATED_AT" kullanıldı
      .query(`
        INSERT INTO [TICKETS] ([ID], [EMAIL], [SUBJECT], [SUPPORTTYPE], [PRIORITY], [DESCRIPTION], [FILEPATH], [SENDCOPY], [STATUS], [CREATEDDATE])
        VALUES (@ID, @EMAIL, @SUBJECT, @SUPPORTTYPE, @PRIORITY, @DESCRIPTION, @FILEPATH, @SENDCOPY, @STATUS, @CREATEDDATE)
      `);

    return NextResponse.json({ message: "Ticket created successfully", ticketId }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating ticket:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
