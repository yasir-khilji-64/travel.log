import { z } from 'zod';

export const TravelLogSchema = z.object({
  title: z.string().trim().min(1, { message: 'Title cannot be empty' }),
  description: z.string().trim().min(1, 'Description cannot be empty'),
  image: z.string().trim().url('Provide a valid Image URL'),
  rating: z.coerce.number().min(0).max(5).default(0),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  visit_date: z.coerce.date(),
});

export type TravelLogType = z.infer<typeof TravelLogSchema>;
export const TravelLogKeys = TravelLogSchema.keyof().Enum;
export type TravelLogKey = keyof typeof TravelLogKeys;
