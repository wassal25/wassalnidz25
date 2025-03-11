
import { z } from 'zod';

// Schema for trip data
export const tripSchema = z.object({
  id: z.string().uuid(),
  from_location: z.string(),
  to_location: z.string(),
  date: z.string(),
  time: z.string(),
  price: z.number(),
  seats: z.number(),
  image: z.string(),
  driver_id: z.string().uuid().nullable()
});

// Schema for reservation data
export const reservationSchema = z.object({
  id: z.string().uuid(),
  trip_id: z.string().uuid(),
  passenger_id: z.string().uuid(),
  seats_booked: z.number().min(1),
  status: z.string(),
  created_at: z.string(),
  phone_number: z.string().nullable(),
  notes: z.string().nullable(),
  payment_method: z.string().nullable()
});

export type Trip = z.infer<typeof tripSchema>;
export type Reservation = z.infer<typeof reservationSchema>;
