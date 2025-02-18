import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // ✅ Eğer dummy user ile giriş yapılıyorsa OTP doğrulama yapma!
    if (email.endsWith("@sameup.com")) {
      console.log("✅ Dummy user tespit edildi, OTP gönderilmedi.");
      return NextResponse.json({ success: true, message: "Dummy user için OTP doğrulaması atlandı." });
    }

    // ✅ Gerçek kullanıcılar için OTP oluştur
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`📩 OTP Kodu: ${otp} - E-posta: ${email}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-app-password",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, otp }, { status: 200 });
  } catch (error) {
    console.error("❌ OTP Gönderme Hatası:", error);
    return NextResponse.json({ success: false, error: "OTP gönderme hatası" }, { status: 500 });
  }
}
