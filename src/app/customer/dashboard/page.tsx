"use client"; // ✅ Client Component olarak işaretlendi

import { useEffect, useState } from "react";
import { UserProfileProps, defaultUser, CompanyProfileProps, defaultCompany, } from "@/types";
import EditCompanyProfileForm from "./profile/EditCompanyProfileForm";
import EditProfileForm from "./profile/EditProfileForm";
import UserProfile from "./profile/UserProfile";
import CompanyProfile from "./profile/CompanyProfile";
import ProfileTabs from "@/components/ui/ProfileTabs";
import PreferencesPage from "./components/PreferencesPage"; 
import CustomerSidebar from "./components/CustomerSidebar";
import CustomerSearchSection from "./components/CustomerSearchSection";
import ViewTickets from "./components/ViewTickets"; 
import LatestUpdates from "@/components/ui/LatestUpdates"; // ✅ Latest Updates eklendi
import ReportsPage from "./components/ReportsPage"; // ✅ Reports bileşeni eklendi
import NewTicket from "./components/NewTicket"; // ✅ Güncellenmiş yol


export default function CustomerDashboard() {
  const [activeSection, setActiveSection] = useState("latest-updates"); // ✅ Varsayılan içerik
  const [activeTab, setActiveTab] = useState("user");
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfileProps>(defaultUser);
  const [company, setCompany] = useState<CompanyProfileProps>(defaultCompany);
  useEffect(() => {
    console.log("CustomerDashboard içinde setActiveSection fonksiyonu:", setActiveSection);
  }, []);
  const handleUserSave = (updatedUser: UserProfileProps) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCompanySave = (updatedCompany: CompanyProfileProps) => {
    setCompany(updatedCompany);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-screen-xxxl mx-auto bg-white  rounded-lg p-8 flex flex-col items-center">
    {/* ✅ CustomerSearchSection İçine `setActiveSection` Prop'u Geçildi */}
    <CustomerSearchSection setActiveSection={setActiveSection} />
    
    <div className="w-full min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64">
        <CustomerSidebar setActiveSection={setActiveSection} />
      </div>

      {/* İçerik Alanı */}
      <div className="w-full max-w-screen-xl bg-white shadow-md rounded-lg p-6 mx-auto mt-2">
        <div >
          {/* Profile İçin Tab Menü */}
          {activeSection === "profile" && (
            <div className="w-full flex justify-center mb-6">
              <ProfileTabs setActiveTab={setActiveTab} />
            </div>
          )}

          {/* Dinamik İçerik Alanı */}
          <div className="w-full">
            {activeSection === "latest-updates" && <LatestUpdates />} {/* ✅ Varsayılan içerik gösteriliyor */}
            {activeSection === "profile" && (
              activeTab === "user" ? (
                isEditing ? <EditProfileForm user={user} onSave={handleUserSave} /> : <UserProfile user={user} />
              ) : (
                isEditing ? <EditCompanyProfileForm company={company} onSave={handleCompanySave} /> : <CompanyProfile company={company} />
              )
            )}
            {activeSection === "preferences" && <PreferencesPage />}
            {activeSection === "view-tickets" && <ViewTickets />} {/* ✅ View Tickets eklendi */}
            {activeSection === "new-ticket" && <NewTicket />} {/* ✅ New Ticket buraya eklendi */}
            {activeSection === "reports" && <ReportsPage />} {/* ✅ Reports bileşeni eklendi */}
          </div>

          {/* Düzenleme Butonu */}
          {activeSection === "profile" && (
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className="mt-6 bg-gray-500 text-white px-6 py-3 rounded-lg w-full max-w-md mx-auto block"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
