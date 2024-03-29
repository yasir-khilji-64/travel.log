'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  TravelLogKey,
  // TravelLogKeys,
  TravelLogSchema,
  TravelLogType,
} from '@/lib/logs/TravelLogSchema';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

// interface TravelLogInput {
//   name: TravelLogKey;
//   type: 'text' | 'url' | 'textarea' | 'number' | 'date';
// }

const TravelLogInputs: Record<
  TravelLogKey,
  {
    label?: string;
    type: 'text' | 'textarea' | 'url' | 'number' | 'date';
  }
> = {
  title: {
    label: 'Title',
    type: 'text',
  },
  description: {
    label: 'Description',
    type: 'textarea',
  },
  image: {
    label: 'Image',
    type: 'url',
  },
  rating: {
    label: 'Rating',
    type: 'number',
  },
  latitude: {
    label: 'Latitude',
    type: 'number',
  },
  longitude: {
    label: 'Longitude',
    type: 'number',
  },
  visit_date: {
    label: 'Visit Date',
    type: 'date',
  },
};

export function TravelLogForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLogType>({
    resolver: zodResolver(TravelLogSchema),
  });
  const onSubmit: SubmitHandler<TravelLogType> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md flex gap-4 flex-col"
    >
      {Object.entries(TravelLogInputs).map(([name, value]) => {
        const key = name as TravelLogKey;
        const { label } = value;
        return (
          // Todo: Add Date component from Shadcn
          <div key={key} className="w-full">
            {value.type === 'textarea' ? (
              <Textarea
                placeholder={label}
                {...register(key as TravelLogKey)}
                className={`rounded-xl w-full ${errors[key] ? 'border-destructive' : ''} ${key === 'title' ? 'mt-2' : ''}`}
              />
            ) : (
              <Input
                type={value.type}
                step={0.1}
                placeholder={label}
                {...register(key as TravelLogKey)}
                className={`rounded-xl w-full ${errors[key] ? 'border-destructive' : ''} ${key === 'title' ? 'mt-2' : ''}`}
              />
            )}
            {errors[key] && (
              <Label htmlFor="title" className="text-destructive">
                {errors[key]?.message}
              </Label>
            )}
          </div>
        );
      })}
      <Button variant="default" type="submit">
        Create
      </Button>
    </form>
  );
}
