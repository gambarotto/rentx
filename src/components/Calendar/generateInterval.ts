import { eachDayOfInterval, format } from 'date-fns';
import { DayProps, MarkedDateProps } from '.';
import { getDateAdjusted } from '../../utils/getDateAdjusted';
import theme from '../../styles/theme';

export const generateInterval = (
  start: DayProps,
  end: DayProps,
): MarkedDateProps => {
  let interval: MarkedDateProps = {};
  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getDateAdjusted(item), 'yyyy-MM-dd');

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.shape
            : theme.colors.main,
      },
    };
  });
  return interval;
};
