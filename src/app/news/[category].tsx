import { useRouter } from "next/router";

const categories = {
  "bizden-haberler": {
    title: "Bizden Haberler",
    content: "Bu bölümde, firmamızdan en son haberleri bulabilirsiniz.",
  },
  "bilgi-guvenligi-politikamiz": {
    title: "Bilgi Güvenliği Politikamız",
    content: `
      Değerli çalışanlarımız ve müşterilerimiz,
      Güncellenmiş bilgi güvenliği politikamızı aşağıda bilgilerinize sunuyoruz...
    `,
  },
} as const;

type CategoryKey = keyof typeof categories; // Geçerli anahtarları tanımlıyoruz

export default function NewsCategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  if (!category || typeof category !== "string") {
    return <p>Loading...</p>;
  }

  const categoryData = categories[category as CategoryKey];

  if (!categoryData) {
    return <p>Bu kategori bulunamadı.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">{categoryData.title}</h1>
      <p className="text-gray-700">{categoryData.content}</p>
    </div>
  );
}
