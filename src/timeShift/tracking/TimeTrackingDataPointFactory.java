package timeShift.tracking;


import java.util.Calendar;

public class TimeTrackingDataPointFactory {
    public static TimeTrackingDataPoint getNow() {
        final TimeTrackingDataPoint dataPoint = new TimeTrackingDataPoint();
        final Calendar calendar = Calendar.getInstance();
        dataPoint.setYear(calendar.get(Calendar.YEAR));
        dataPoint.setMonth(calendar.get(Calendar.MONTH) + 1);
        dataPoint.setDay(calendar.get(Calendar.DAY_OF_MONTH));
        dataPoint.setHour(calendar.get(Calendar.HOUR_OF_DAY));
        dataPoint.setMinute(calendar.get(Calendar.MINUTE));
        return dataPoint;
    }
}
