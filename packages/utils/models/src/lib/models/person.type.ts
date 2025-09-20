export interface Person {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phone: string;
  email: string;
  address: string | null;
  nationality: string | null;
  marital_status: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}
