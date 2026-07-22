export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Temporary"
  | "Internship";

export type JobCategory =
  | "Restaurant & Hospitality"
  | "Driving & Delivery"
  | "Cleaning"
  | "Retail & Grocery"
  | "Healthcare"
  | "Information Technology"
  | "Office & Administration"
  | "Accounting & Finance"
  | "Construction"
  | "Security"
  | "Childcare & Home Care"
  | "Education"
  | "Other";

export type JobStatus = "pending" | "approved" | "rejected" | "expired";

export type JobRow = {
  id: string;
  title: string;
  company: string;
  category: JobCategory;
  employment_type: EmploymentType;
  location: string;
  pay: string | null;
  description: string;
  requirements: string[] | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  apply_url: string | null;
  status: JobStatus;
  created_at: string;
  approved_at: string | null;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  category: JobCategory;
  employmentType: EmploymentType;
  location: string;
  pay?: string;
  description: string;
  requirements?: string[];
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  applyUrl?: string;
  postedAt: string;
  createdAt: string;
};
