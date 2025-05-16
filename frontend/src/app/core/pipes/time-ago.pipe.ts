import { DatePipe } from '@angular/common';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
@Injectable({
  providedIn: 'root'
})
export class TimeAgoPipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe
  ) {}

  /**
   * This function transforms a given date into a human-readable format indicating how long ago it was.
   * If the date is less than 60 seconds ago, it returns 'Just now'.
   * If the date is more than 1 'type' ago, it returns the date in 'HH:mm:ss dd/MM/yyyy' format.
   * Example: '1 hour ago', '2 hours ago', 'Just now', '12:34:56 01/12/2022'.
   * @param value The date to be transformed.
   * @param type The type of time interval to be used to display 'HH:mm:ss dd/MM/yyyy' format when more than 1 type ago. Default is 'week'. Example: 'h', will display 'HH:mm:ss dd/MM/yyyy' format when more than 1 hour ago.
   * @returns A string representing how long ago the date was, or the original value if it's not a valid date.
   * @example
   * {{ post.createdDate | dateAgoPipe }}
   * {{ messageContent.createdDate | dateAgoPipe: 'day' }}
   */
  transform(value: any, type?: 'h'| 'd' | 'w' | 'mth' | 'y'): string | null {
    if (value) {
      if(!type) type = 'w';
      // Calculate the difference between the current date and the given date in seconds.
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

      // If the difference is less than 60 seconds, return 'Just now'.
      if (seconds < 60)
        return 'Just now';

      // Define the intervals for year, month, week, day, hour, minute, and second in seconds.
      const intervals: { [key: string]: number } = {
        'y': 31536000,
        'mth': 2592000,
        'w': 604800,
        'd': 86400,
        'h': 3600,
        'm': 60,
        's': 1
      };

      let counter;
      // Iterate over each interval.
      for (const i in intervals) {
        // Calculate the count of the current interval in the difference.
        counter = Math.floor(seconds / intervals[i]);

        // If the count is greater than 0, it means the difference includes the current interval.
        if (counter > 0) {
          // If the count is 1, return the count and the interval in singular form.
          if ((counter === 1 || i !== type) && seconds < intervals[type]) {
            return counter + i; // 1h, 1d, 3m, 6y
          } 
          else {
            // If the interval is 'type' (may be day, week, month, year) and the count is more than 1, return the date in 'HH:mm:ss dd/MM/yyyy' format.
            return this.datePipe.transform(value, 'HH:mm:ss dd/MM/yyyy'); // more than 1 day ago
          }
        }
      }
    }
    // If the value is not a valid date, return the original value.
    return value;
  }

}
