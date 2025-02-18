import sql from "mssql";

// MSSQL bağlantı ayarları
const config = {
  user: "sa", // SQL Kullanıcı Adı
  password: "123", // SQL Şifre
  database: "sameup_support", // Kullanacağımız veritabanı
  server: "Renee", // MSSQL Sunucu Adı
  port: 1433, // Varsayılan MSSQL Portu
  pool: {
    max: 10, // Maksimum bağlantı sayısı
    min: 0,
    idleTimeoutMillis: 30000, // Bağlantı boşta 30 saniye bekledikten sonra kapanır
  },
  options: {
    encrypt: false, // Eğer SSL kullanılmıyorsa "false" yapmalısın
    trustServerCertificate: true, // Self-signed SSL için gerekli
  },
};

// MSSQL bağlantısını başlat
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ MSSQL bağlantısı başarılı!");
    return pool;
  })
  .catch(err => {
    console.error("❌ MSSQL bağlantı hatası:", err);
    throw err;
  });

export default poolPromise;
