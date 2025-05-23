package timeShift.tracking;

import dobby.util.json.NewJson;
import thot.api.annotations.v2.Bucket;
import thot.janus.DataClass;
import thot.janus.annotations.JanusBoolean;
import thot.janus.annotations.JanusInteger;
import thot.janus.annotations.JanusUUID;

import java.util.UUID;

import static timeShift.tracking.service.TimeTrackingService.BUCKET_NAME;

@Bucket(BUCKET_NAME)
public class TimeTrackingDataPoint implements DataClass, Comparable<TimeTrackingDataPoint> {
    @JanusInteger("year")
    private int year;
    @JanusInteger("month")
    private int month;
    @JanusInteger("day")
    private int day;
    @JanusInteger("hour")
    private int hour;
    @JanusInteger("minute")
    private int minute;
    @JanusUUID("userId")
    private UUID userId;
    @JanusBoolean("isStart")
    private boolean isStart;
    @JanusBoolean("isRemote")
    private boolean isRemote;
    @JanusUUID("id")
    private UUID id;

    public TimeTrackingDataPoint() {
        id = UUID.randomUUID();
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public int getMinute() {
        return minute;
    }

    public void setMinute(int minute) {
        this.minute = minute;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public boolean isStart() {
        return isStart;
    }

    public void setStart(boolean start) {
        isStart = start;
    }

    public boolean isRemote() {
        return isRemote;
    }

    public void setRemote(boolean remote) {
        isRemote = remote;
    }

    @Override
    public String getKey() {
        return userId + "-" + year + "-" + month + "-" + day + "-" + id;
    }

    @Override
    public NewJson toJson() {
        final NewJson json = new NewJson();
        json.setInt("year", year);
        json.setInt("month", month);
        json.setInt("day", day);
        json.setInt("hour", hour);
        json.setInt("minute", minute);
        json.setString("userId", userId.toString());
        json.setString("id", id.toString());
        json.setBoolean("isStart", isStart);
        json.setBoolean("isRemote", isRemote);
        return json;
    }

    public NewJson toStoreJson() {
        final NewJson json = new NewJson();
        json.setInt("year", year);
        json.setInt("month", month);
        json.setInt("day", day);
        json.setInt("hour", hour);
        json.setInt("minute", minute);
        json.setString("userId", userId.toString());
        json.setString("id", id.toString());
        json.setString("isStart", isStart ? "true" : "false");
        json.setString("isRemote", isRemote ? "true" : "false");
        return json;
    }

    @Override
    public int compareTo(TimeTrackingDataPoint other) {
        if (this.year != other.year) {
            return Integer.compare(this.year, other.year);
        }
        if (this.month != other.month) {
            return Integer.compare(this.month, other.month);
        }
        if (this.day != other.day) {
            return Integer.compare(this.day, other.day);
        }
        if (this.hour != other.hour) {
            return Integer.compare(this.hour, other.hour);
        }
        return Integer.compare(this.minute, other.minute);
    }
}
