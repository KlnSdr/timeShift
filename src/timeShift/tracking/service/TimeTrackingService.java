package timeShift.tracking.service;
import dobby.util.json.NewJson;
import thot.connector.Connector;
import thot.janus.Janus;
import timeShift.tracking.TimeTrackingDataPoint;

import java.util.Arrays;
import java.util.UUID;

public class TimeTrackingService {
    public static final String BUCKET_NAME = "timeTracking_data";
    private static TimeTrackingService instance;

    private TimeTrackingService() {
    }

    public static TimeTrackingService getInstance() {
        if (instance == null) {
            instance = new TimeTrackingService();
        }
        return instance;
    }

    public boolean save(TimeTrackingDataPoint dataPoint) {
        return Connector.write(BUCKET_NAME, dataPoint.getKey(), dataPoint.toStoreJson());
    }

    public TimeTrackingDataPoint[] find(UUID userId, int year) {
        return find(userId.toString() + "-" + year + ".*");
    }

    public TimeTrackingDataPoint[] find(UUID userId, int year, int month) {
        return find(userId.toString() + "-" + year + "-" + month + ".*");
    }

    public TimeTrackingDataPoint[] find(UUID userId, int year, int month, int day) {
        return find(userId.toString() + "-" + year + "-" + month + "-" + day + "-.*");
    }

    public boolean delete(TimeTrackingDataPoint dataPoint) {
        return Connector.delete(BUCKET_NAME, dataPoint.getKey());
    }

    private TimeTrackingDataPoint[] find(String pattern) {
        final NewJson[] jsons = Connector.readPattern(BUCKET_NAME, pattern, NewJson.class);
        final TimeTrackingDataPoint[] dataPoints = new TimeTrackingDataPoint[jsons.length];

        for (int i = 0; i < jsons.length; i++) {
            dataPoints[i] = Janus.parse(jsons[i], TimeTrackingDataPoint.class);
        }
        Arrays.sort(dataPoints);

        return dataPoints;
    }
}
