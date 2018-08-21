import Utils from './utils';

export default class Calendars {

  static getYahooCalendarUrl(data) {
    var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
    var duration = Utils.getHoursDuration(data.startDate, data.endDate);

    yahooCalendarUrl += '&TITLE=' + data.title;
    yahooCalendarUrl += '&ST=' + data.startDate + '&DUR=' + duration;
    yahooCalendarUrl += '&DESC=' + data.description;
    yahooCalendarUrl += '&in_loc=' + data.location;

    return yahooCalendarUrl;
  }

  static getMicrosoftCalendarUrl(data) {
    var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
    microsoftCalendarUrl += '&summary=' + data.title;
    microsoftCalendarUrl += '&dtstart=' + data.startDate + '&dtend=' + data.endDate;
    microsoftCalendarUrl += '&description=' + data.description;
    microsoftCalendarUrl += '&location=' + data.location;

    return microsoftCalendarUrl;
  }

  static getGoogleCalendarUrl(data) {
    var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    googleCalendarUrl += '&text=' + data.title;
    googleCalendarUrl += '&dates=' + data.startDate + '/' + data.endDate;
    googleCalendarUrl += '&details=' + data.description;
    googleCalendarUrl += '&location=' + data.location;

    return googleCalendarUrl;
  }

  static getIcsCalendar(data) {
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:angular-addtocalendar',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:' + Utils.getUid(),
      'DTSTAMP:' + Utils.getTimeCreated() + 'Z',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'END:VALARM',
      'DESCRIPTION:' + Utils.formatIcsText(data.description, 255),
      'DTSTART:' + data.startDate,
      'DTEND:' + data.endDate,
      'LOCATION:' + Utils.formatIcsText(data.location, 64),
      'ORGANIZER;CN=MyThrive:MAILTO:support@thrivepartners.co.uk',
      'SUMMARY:' + Utils.formatIcsText(data.title, 66),
      'URL;VALUE=URI:https://my.thrivepartners.co.uk',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');
  }
}
