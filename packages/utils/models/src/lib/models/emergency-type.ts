import { AmbulanceStatus } from './ambulance-type';

export interface Emergency {
  created_at: Date;
  updated_at: Date;
  id: string; // UUIDs are typically represented as strings in TypeScript
  hospital_id: string | null;
  ambulance_id: string | null;
  emergency_ic: string;
  reported_by: number | null;
  notes: string | null;
  resolved_at: Date | null;
  modification_attempts: any | null; // JSON types can be 'any' or a more specific interface if known
  emergency_latitude: number; // Decimals are typically represented as numbers in TypeScript
  emergency_longitude: number; // Decimals are typically represented as numbers in TypeScript
  status: EmergencyStatusEnum;
  severity: EmergencySeverityEnum;
  incident_type: EmergencyIncidentEnum;
  description: string | null;
}

export enum EmergencyStatusEnum {
  // Add your enum values here, for example:
  Reported = 'Reported',
  Assigned = 'Assigned',
  InProgress = 'InProgress',
  Resolved = 'Resolved',
  Canceled = 'Canceled',
}

export enum EmergencySeverityEnum {
  // Add your enum values here, for example:
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
}

export enum EmergencyIncidentEnum {
  // Add your enum values here, for example:
  Medical = 'Medical',
  Fire = 'Fire',
  Accident = 'Accident',
  Crime = 'Crime',
  Other = 'Other',
}

/**
 *
 */
export interface EmergencyUi {
  status?: EmergencyStatusEnum | string;
  uiElements: EmergencyIdData[][];
  id?: string;
  emergency_ic?: number;
  hospital_id?: string;
}

export interface EmergencyIdData {
  title: string;
  description?: string;
  edit: boolean;
}
export type EmergencyStatus = `${EmergencyStatusEnum}`;

export const emergencyStatusDisplayNames: () => Record<EmergencyStatus, string> = () => ({
  [EmergencyStatusEnum.Reported]: 'Reported',
  [EmergencyStatusEnum.Assigned]: 'Assigned',
  [EmergencyStatusEnum.InProgress]: 'In Progress',
  [EmergencyStatusEnum.Resolved]: 'Resolved',
  [EmergencyStatusEnum.Canceled]: 'Canceled',
});
