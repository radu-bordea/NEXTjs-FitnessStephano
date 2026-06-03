export type NavLink = {
  id: string;
  title: string;
};

export type AuditFormData = {
  name: string;
  email: string;
  lift: string;
};

export type Video = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  plan: string;
  createdAt: Date;
};
