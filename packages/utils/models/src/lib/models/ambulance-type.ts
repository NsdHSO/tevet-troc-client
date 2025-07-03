export type AmbulanceType =
  | 'BASIC_LIFE_SUPPORT'
  | 'ADVANCED_LIFE_SUPPORT'
  | 'MOBILE_INTENSIVE_CARE_UNIT'
  | 'PEDIATRIC_AMBULANCE'
  | 'NEONATAL_AMBULANCE'
  | 'RESCUE_AMBULANCE'
  | 'BARIATRIC_AMBULANCE'
  | 'WHEELCHAIR_VAN'
  | 'AMBULATORY_TRANSPORT'
  | 'PSYCHIATRIC_TRANSPORT'
  | 'LONG_DISTANCE_TRANSPORT'
  | 'AIR_AMBULANCE'
  | 'WATER_AMBULANCE'
  | 'HAZMAT_AMBULANCE'
  | 'EVENT_MEDICAL_SERVICES'
  | 'CRITICAL_CARE_TRANSPORT'
  | 'RAPID_RESPONSE_VEHICLE'
  | 'SUPERVISOR_VEHICLE'
  | 'UTILITY_VEHICLE'
  | 'COMMAND_VEHICLE'
  | 'TRAINING_AMBULANCE';

export const ambulanceTypeDisplayNames: Record<AmbulanceType, string> = {
  BASIC_LIFE_SUPPORT: 'Basic Life Support',
  ADVANCED_LIFE_SUPPORT: 'Advanced Life Support',
  MOBILE_INTENSIVE_CARE_UNIT: 'Mobile Intensive Care Unit',
  PEDIATRIC_AMBULANCE: 'Pediatric Ambulance',
  NEONATAL_AMBULANCE: 'Neonatal Ambulance',
  RESCUE_AMBULANCE: 'Rescue Ambulance',
  BARIATRIC_AMBULANCE: 'Bariatric Ambulance',
  WHEELCHAIR_VAN: 'Wheelchair Van',
  AMBULATORY_TRANSPORT: 'Ambulatory Transport',
  PSYCHIATRIC_TRANSPORT: 'Psychiatric Transport',
  LONG_DISTANCE_TRANSPORT: 'Long-Distance Transport',
  AIR_AMBULANCE: 'Air Ambulance',
  WATER_AMBULANCE: 'Water Ambulance',
  HAZMAT_AMBULANCE: 'HAZMAT Ambulance',
  EVENT_MEDICAL_SERVICES: 'Event Medical Services',
  CRITICAL_CARE_TRANSPORT: 'Critical Care Transport',
  RAPID_RESPONSE_VEHICLE: 'Rapid Response Vehicle',
  SUPERVISOR_VEHICLE: 'Supervisor Vehicle',
  UTILITY_VEHICLE: 'Utility Vehicle',
  COMMAND_VEHICLE: 'Command Vehicle',
  TRAINING_AMBULANCE: 'Training Ambulance',
};
export type AmbulanceStatus =
  | 'AVAILABLE'
  | 'IN_SERVICE'
  | 'MAINTENANCE'
  | 'DISPATCHED'
  | 'EN_ROUTE_TO_SCENE'
  | 'AT_SCENE'
  | 'TRANSPORTING_PATIENT'
  | 'EN_ROUTE_TO_HOSPITAL'
  | 'AT_HOSPITAL'
  | 'RETURNING_TO_BASE'
  | 'UNAVAILABLE'
  | 'OUT_OF_SERVICE'
  | 'ON_BREAK'
  | 'FUELING'
  | 'CLEANING'
  | 'AWAITING_DISPATCH'
  | 'PREPARING_FOR_MISSION'
  | 'UNDER_REPAIR';

/**
 *
 */
export interface AmbulanceIdUi {
  status: AmbulanceStatus | null;
  uiElements: AmbulanceIdData[][];
}

export interface AmbulanceIdData {
  title: string;
  description?: string;
}

// Example usage:
// const currentStatus: AmbulanceStatus = "TRANSPORTING_PATIENT";
// console.log(`Current status: ${ambulanceStatusDisplayNames[currentStatus]}`); // Output: "Current status: Transporting Patient"

export interface AmbulanceDetails {
  created_at: string;
  updated_at: string;
  id: string;
  hospital_id: string;
  ambulance_ic: number;
  vehicle_number: string;
  make: string;
  year: number;
  capacity: number;
  mission: string;
  passengers: any[]; // Consider defining a more specific type if you know the structure of passengers
  driver_name: string | null;
  driver_license: string | null;
  last_service_date: string | null; // Assuming date strings
  next_service_date: string | null; // Assuming date strings
  mileage: number;
  fuel_type: string | null;
  registration_number: string | null;
  insurance_provider: string | null;
  insurance_expiry_date: string | null; // Assuming date string
  notes: string;
  car_details_year: number;
  car_details_color: string;
  car_details_is_ambulance: boolean;
  car_details_license_plate: string | null;
  car_details_mileage: number;
  location_latitude: string; // "0" suggests it might be a string, consider number if it's always numeric
  location_longitude: string; // "0" suggests it might be a string, consider number if it's always numeric
  type: AmbulanceType; // If you have an `AmbulanceType` enum or union type, you could use that here.
  status: AmbulanceStatus;
  car_details_make: string;
  car_details_model: string;
}

export enum AmbulanceStatusEnum {
  AVAILABLE = 'AVAILABLE',
  IN_SERVICE = 'IN_SERVICE',
  MAINTENANCE = 'MAINTENANCE',
  DISPATCHED = 'DISPATCHED',
  EN_ROUTE_TO_SCENE = 'EN_ROUTE_TO_SCENE',
  AT_SCENE = 'AT_SCENE',
  TRANSPORTING_PATIENT = 'TRANSPORTING_PATIENT',
  EN_ROUTE_TO_HOSPITAL = 'EN_ROUTE_TO_HOSPITAL',
  AT_HOSPITAL = 'AT_HOSPITAL',
  RETURNING_TO_BASE = 'RETURNING_TO_BASE',
  UNAVAILABLE = 'UNAVAILABLE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
  ON_BREAK = 'ON_BREAK',
  FUELING = 'FUELING',
  CLEANING = 'CLEANING',
  AWAITING_DISPATCH = 'AWAITING_DISPATCH',
  PREPARING_FOR_MISSION = 'PREPARING_FOR_MISSION',
  UNDER_REPAIR = 'UNDER_REPAIR',
}

export function getAmbulanceTypeFromDisplay(
  displayName: string
): AmbulanceType | undefined {
  const entry = Object.entries(ambulanceTypeDisplayNames).find(
    ([, value]) => value === displayName
  );
  return entry ? (entry[0] as AmbulanceType) : undefined;
}

// Then, a mapping for display purposes
export const ambulanceStsDisplayNames: () => Record<
  AmbulanceStatus,
  string
> = () => ({
  AVAILABLE: 'Available',
  IN_SERVICE: 'In Service',
  MAINTENANCE: 'Maintenance',
  DISPATCHED: 'Dispatched',
  EN_ROUTE_TO_SCENE: 'En Route to Scene',
  AT_SCENE: 'At Scene',
  TRANSPORTING_PATIENT: 'Transporting Patient',
  EN_ROUTE_TO_HOSPITAL: 'En Route to Hospital',
  AT_HOSPITAL: 'At Hospital',
  RETURNING_TO_BASE: 'Returning to Base',
  UNAVAILABLE: 'Unavailable',
  OUT_OF_SERVICE: 'Out of Service',
  ON_BREAK: 'On Break',
  FUELING: 'Fueling',
  CLEANING: 'Cleaning',
  AWAITING_DISPATCH: 'Awaiting Dispatch',
  PREPARING_FOR_MISSION: 'Preparing for Mission',
  UNDER_REPAIR: 'Under Repair',
});
