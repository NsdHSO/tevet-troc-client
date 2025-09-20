export interface AppointmentPayload {
  patient_name: string;
  doctor_name: string;
  hospital_name: string;
  appointment_date: string;
  reason?: string;
  notes: string;
  cost?: number | null;
  scheduled_by?: string;
  appointment_type?: string;
  status?: 'NoShow' | 'Scheduled' | 'Completed' | 'Cancelled';
}
