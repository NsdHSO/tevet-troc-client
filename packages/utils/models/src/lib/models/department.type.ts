export interface Department {
  created_at: string;
  updated_at: string;
  id: string;
  hospital_id: string;
  floor: number | null;
  head_of_department: string;
  phone: string | null;
  description: string;
  capacity: number;
  name: string;
  department_ic: string;
}
