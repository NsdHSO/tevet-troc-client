/**
 * Defines the possible types of fuel for a vehicle.
 */
export type FuelTypes = "Diesel" | "Gasoline" | "Electric" | "Hybrid" | "null";

/**
 * A record (object) mapping each FuelType to a more human-readable display string.
 * This is useful for UI elements like dropdowns or labels.
 */
export const fuelTypeDisplayNames: Record<FuelTypes, string> = {
  Diesel: "Diesel",
  Gasoline: "Gasoline",
  Electric: "Electric",
  Hybrid: "Hybrid",
  null: 'N/A'
};
