export function updateClock() {
  const currentTime = new Date();
  let currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  //   let currentSeconds = currentTime.getSeconds();
  const shortDays = [
    'Sun', //Sunday starts at 0
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  const longDays = [
    'Sunday', //Sunday starts at 0
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const d = new Date(); //This returns Wed Apr 02 2014 17:28:55 GMT+0800 (Malay Peninsula Standard Time)
  const m = d.getMonth();
  const month = months[m];
  const date = d.getDate();
  const year = d.getFullYear();
  const x = d.getDay(); //This returns a number, starting with 0 for Sunday

  const day = shortDays[x];
  const longDay = longDays[x];

  // Pad the minutes and seconds with leading zeros, if required
  const showCurrentMinutes =
    (currentMinutes < 10 ? '0' : '') + String(currentMinutes);
  //   currentSeconds = (currentSeconds < 10 ? '0' : '') + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  const timeOfDay = currentHours < 12 ? 'AM' : 'PM';

  // Convert the hours component to 12-hour format if needed
  currentHours = currentHours > 12 ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = currentHours === 0 ? 12 : currentHours;

  // Compose the string for display
  const currentTimeString =
    day + ' ' + currentHours + ':' + showCurrentMinutes + ' ' + timeOfDay;
  const longTimeString = longDay + ', ' + month + ' ' + date + ', ' + year;
  $('#clock').html(currentTimeString);
  $('#date').html(longTimeString);
}
