import { addDays } from 'date-fns';

export const getDateAdjusted = (date: Date): Date => addDays(date, 1);
