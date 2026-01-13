
export type AppState = 'splash' | 'ready' | 'opening' | 'open';

export interface EventDetails {
  name: string;
  age: string;
  date: string;
  targetDate: Date;
  location: string;
  address: string;
  city: string;
  time: string;
  message: string;
  confirmationDeadline: string;
  instagram: string;
  mapsUrl?: string;
}

export interface RSVPFormData {
  fullName: string;
  phone: string;
  guests: number;
  message?: string;
}
