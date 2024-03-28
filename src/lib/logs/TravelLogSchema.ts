import { z } from 'zod';

export const TravelLogSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  rating: z.coerce.number().min(0).max(5).default(0),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  visit_date: z.coerce.date(),
});

export type TravelLogType = z.infer<typeof TravelLogSchema>;
