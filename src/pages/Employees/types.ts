export type IEmployees = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
  display_picture: string;
  email?: string;
  phone: "number";
  dob?: string;
  hired_date?: string;
  work_hour?: number;
  salary?: number;
  bank?: string;
  address?: string;
  max_session?: number;
  is_active?: boolean;
  verified_at: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  role?: {
    id: number;
    name: string;
  };
};
