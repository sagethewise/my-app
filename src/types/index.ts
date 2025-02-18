import { ReactNode } from "react";

export interface Update {
    id: string;
    title: string;
    content: string;
    date: string;
  }
export interface UserProfileProps {
    name: string;
    title: string;
    position: string;
    email: string;
    phone: string;
    profilePicture: string;
    since: string;
    passiveDate: string;
    status: string;
    country: string;
    city: string;
    address: string;
    password: string; // ✅ Kullanıcı şifresi eklendi
    companyId: string; // ✅ Kullanıcı bir şirkete bağlı olacak
}

export interface UserProfileProps {
  name: string;
  title: string;
  position: string;
  email: string;
  phone: string;
  profilePicture: string;
  since: string;
  passiveDate: string;
  status: string;
  country: string;
  city: string;
  address: string;
  password: string; // ✅ Kullanıcı şifresi eklendi
  companyId: string; // ✅ Kullanıcı bir şirkete bağlı olacak
}



  export const defaultUser: UserProfileProps = {
    name: "",
    title: "Select",
    position: "Select",
    email: "",
    phone: "",
    profilePicture: "https://via.placeholder.com/100",
    since: "Register Date",
    passiveDate: "-",
    status: "Active",
    country: "Select",
    city: "Select",
    address: "",
    password: "", 
    companyId: "", 
  };
  
  export interface CompanyProfileProps {
    companyName: string;
    website: string;
    sector: string;
    country: string;
    city: string;
    address: string;
    since: string;
    status: string;
    logo: string;
  }
  
  export const defaultCompany: CompanyProfileProps = {
    companyName: "",
    website: "",
    sector: "Select",
    country: "Select",
    city: "Select",
    address: "",
    since: "Register Date",
    status: "Active",
    logo: "https://via.placeholder.com/100",
  };
  
  export const countries = [
    { name: "Turkey", cities: ["Istanbul", "Ankara", "Izmir"] },
    { name: "USA", cities: ["New York", "Los Angeles", "Chicago"] },
    { name: "Germany", cities: ["Berlin", "Munich", "Hamburg"] },
    { name: "France", cities: ["Paris", "Lyon", "Marseille"] },
    { name: "UK", cities: ["London", "Manchester", "Birmingham"] },
  ];
  
// Kullanıcı Title Seçenekleri
export const userTitles = ["Mr.", "Ms.", "Dr.", "Prof.", "Eng.", "Sir", "Madam"];

// Kullanıcı Pozisyonları
export const userPositions = ["Software Engineer", "Project Manager", "HR Specialist", "Designer", "Marketing Lead"];

// Şirket Title Seçenekleri
export const companyTitles = ["CEO", "Founder", "Manager", "Director", "President", "CFO", "COO"];

// Şirket Pozisyonları
export const companyPositions = ["Tech Lead", "Operations Manager", "Financial Analyst", "Sales Manager", "HR Director"];

// Sektörler
export const sectors = ["Technology", "Finance", "Healthcare", "Retail", "Manufacturing"];

// Diller
export const languages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
];

export type Ticket = {
  id: string;
  subject: string;
  assignee: string;
  createDate: string;
  updateDate: string;
  supportType: string;
  workHour: number;
  billingHour: number;
  priority: "Low" | "Normal" | "High" | "Urgent";
  status: "Open" | "In Progress" | "In Review" | "Test" | "Done" | "Waiting for Customer Response";
  messages: { sender: string; text: string; date: string }[];
};

// Örnek ticket verileri
export const sampleTickets: Ticket[] = [
  { 
    id: "TICKET-001",
    subject: "Email Issue",
    assignee: "John Doe",
    createDate: "2024-04-01",
    updateDate: "2024-04-05",
    supportType: "Technical",
    workHour: 2,
    billingHour: 1.5,
    priority: "High",
    status: "In Progress",
    messages: [
      { sender: "Customer", text: "I have an issue with my email", date: "2024-04-01" },
      { sender: "Support", text: "We are looking into it", date: "2024-04-02" }
    ]
  },
  { 
    id: "TICKET-002",
    subject: "Server Downtime",
    assignee: "Jane Smith",
    createDate: "2024-03-28",
    updateDate: "2024-04-02",
    supportType: "Infrastructure",
    workHour: 4,
    billingHour: 3,
    priority: "Urgent",
    status: "Open",
    messages: [
      { sender: "Customer", text: "The server is down!", date: "2024-03-28" },
      { sender: "Support", text: "We are working on it", date: "2024-03-28" }
    ]
  }
];

export const defaultNewTicket: {
  from: string;
  subject: string;
  supportType: string;
  priority: string;
  description: string;
  file: string | File | null;  // ✅ `string | File | null` ile güvenli hale getirildi
  sendCopy: boolean;
} = {
  from: "user@example.com",
  subject: "",
  supportType: "",
  priority: "Normal",
  description: "",
  file: null,  // ✅ `null` olarak kalabilir ama artık string veya File alabilir
  sendCopy: false
};

export const supportTypes = [
  { value: "Technical", label: "Technical" },
  { value: "Billing", label: "Billing" },
  { value: "Account", label: "Account" },
];

export const priorities = [
  { value: "Low", label: "Low" },
  { value: "Normal", label: "Normal" },
  { value: "High", label: "High" },
  { value: "Urgent", label: "Urgent" },
];
