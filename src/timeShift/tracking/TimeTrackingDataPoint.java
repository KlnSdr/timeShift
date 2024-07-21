package timeShift.tracking;

import dobby.util.json.NewJson;
import janus.DataClass;
import janus.annotations.JanusBoolean;
import janus.annotations.JanusInteger;
import janus.annotations.JanusUUID;
import thot.annotations.Bucket;

import java.util.UUID;

import static timeShift.tracking.service.TimeTrackingService.BUCKET_NAME;

@Bucket(BUCKET_NAME)
public class TimeTrackingDataPoint implements DataClass {
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

    public TimeTrackingDataPoint() {
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
        return userId + "-" + year + "-" + month + "-" + day;
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
        json.setString("isStart", isStart ? "true" : "false");
        json.setString("isRemote", isRemote ? "true" : "false");
        return json;
    }
}
