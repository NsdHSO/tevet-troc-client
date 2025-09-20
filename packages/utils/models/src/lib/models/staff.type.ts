// Staff is a specialized type of Person, so it extends it.
import { Person } from './person.type';

export interface Staff extends Person {
  hospital_id: string;
  department_id: string;
  specialization: string;
  role: string;
  staff_ic: string;
}
