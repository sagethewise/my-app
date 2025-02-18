import CustomerHeader from "./components/CustomerHeader";
import CustomerSearchSection from "./components/CustomerSearchSection";
import CustomerSidebar from "./components/CustomerSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
            {/* Müşteri Paneli İçin Header */}
            <CustomerHeader />

    <div className="flex min-h-screen">
     

        {/* Sayfa İçeriği */}
        <main className="w-full bg-white shadow-md rounded-lg p-8 flex flex-col items-center ">{children}</main>
      </div>
    </div>
  );
}
