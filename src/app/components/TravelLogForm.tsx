'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import {
  TravelLogKey,
  TravelLogSchema,
  TravelLogType,
} from '@/lib/logs/TravelLogSchema';
import { AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface InputProps {
  label: string;
  type: 'number' | 'text' | 'textarea' | 'url' | 'date';
}

const TravelLogInputs: Record<TravelLogKey, InputProps> = {
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

const getStep = (label: string) => {
  if (label === 'Latitude' || label === 'Longitude') return 'any';
  if (label === 'Rating') return 0.1;
  return undefined;
};

const getMax = (label: string) => {
  if (label === 'Rating') return 5;
  if (label === 'Latitude') return 90;
  if (label === 'Longitude') return 180;
  return undefined;
};

const getMin = (label: string) => {
  if (label === 'Rating') return 0;
  if (label === 'Latitude') return -90;
  if (label === 'Longitude') return -180;
  return undefined;
};

const getRenderComponent = (
  key: TravelLogKey,
  value: InputProps,
  register: any,
  errors: any
) => {
  switch (value.type) {
    case 'number':
      return (
        <Input
          type={value.type}
          step={getStep(value.label)}
          max={getMax(value.label)}
          min={getMin(value.label)}
          placeholder={value.label}
          {...register(key as TravelLogKey)}
          className={`rounded-xl w-full ${errors[key] ? 'border-destructive' : ''}`}
        />
      );
    case 'text':
      return (
        <Input
          type={value.type}
          placeholder={value.label}
          {...register(key as TravelLogKey)}
          className={`rounded-xl w-full ${errors[key] ? 'border-destructive' : ''}`}
        />
      );
    case 'textarea':
      return (
        <Textarea
          placeholder={value.label}
          maxLength={150}
          {...register(key as TravelLogKey)}
          className={`rounded-xl w-full max-h-[200px] ${errors[key] ? 'border-destructive' : ''}`}
        />
      );
    case 'url':
      return (
        <Input
          type={value.type}
          placeholder={value.label}
          {...register(key as TravelLogKey)}
          className={`rounded-xl w-full ${errors[key] ? 'border-destructive' : ''}`}
        />
      );
    case 'date':
      return (
        <Input
          type={value.type}
          placeholder={value.label}
          {...register(key as TravelLogKey)}
          className={`rounded-xl w-full ${errors[key] ? 'border-destructive' : ''}`}
        />
      );
    default:
      return <></>;
  }
};

interface TravelLogFormProps {
  onComplete: () => void;
}

export function TravelLogForm({ onComplete }: TravelLogFormProps) {
  const [formError, setFormError] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TravelLogType>({
    resolver: zodResolver(TravelLogSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      rating: 2.5,
      latitude: 32.765,
      longitude: -74.775,
    },
  });
  const onSubmit: SubmitHandler<TravelLogType> = async (data) => {
    try {
      setFormError('');
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
        onComplete();
        router.refresh();
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      setFormError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md flex gap-4 flex-col"
    >
      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      {Object.entries(TravelLogInputs).map(([name, value]) => {
        const key = name as TravelLogKey;
        return (
          <div key={key} className="w-full">
            <div className="flex flex-col">
              <Label
                htmlFor={value.label}
                className="text-sm font-medium mb-2"
                // className={`${value.label === 'Title' ? 'mt-2' : ''}`}
              >
                {value.label}
              </Label>
              {getRenderComponent(key, value, register, errors)}
            </div>
            {errors[key] && (
              <Label className="text-destructive">{errors[key]?.message}</Label>
            )}
          </div>
        );
      })}
      <Button variant="secondary" type="submit">
        Create
      </Button>
    </form>
  );
}
