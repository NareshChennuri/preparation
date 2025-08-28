import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * Validates that registrationEndDate is not greater than (eventEndDate - cutOffDays).
 * 
 * @param eventEndDate - The event end date (NgbDateStruct)
 * @param registrationEndDate - The registration end date (NgbDateStruct)
 * @param cutOffDays - Number of days before eventEndDate that registration should close
 * @returns true if valid, false otherwise
 */
export function validateRegistrationEndDate(
  eventEndDate: NgbDateStruct | null,
  registrationEndDate: NgbDateStruct | null,
  cutOffDays: number
): boolean {
  if (!eventEndDate || !registrationEndDate || !cutOffDays) {
    return false; // invalid input
  }

  // Convert NgbDateStruct to JavaScript Date
  const toDate = (d: NgbDateStruct): Date =>
    new Date(d.year, d.month - 1, d.day);

  const eventDate = toDate(eventEndDate);
  const regDate = toDate(registrationEndDate);

  // Calculate cutoff = eventEndDate - cutOffDays
  const cutoffDate = new Date(eventDate);
  cutoffDate.setDate(eventDate.getDate() - cutOffDays);

  // Valid if registrationEndDate is <= cutoffDate
  return regDate.getTime() <= cutoffDate.getTime();
}
