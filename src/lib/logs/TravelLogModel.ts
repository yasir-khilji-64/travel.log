import { WithId } from 'mongodb';

import database from '../db';
import { TravelLogType } from './TravelLogSchema';

export type TravelLogWithId = WithId<TravelLogType>;
export const TravelLogs = database.collection<TravelLogWithId>('logs');
