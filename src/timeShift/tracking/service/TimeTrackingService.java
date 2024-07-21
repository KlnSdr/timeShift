package timeShift.tracking.service;
import dobby.util.json.NewJson;
import janus.Janus;
import thot.connector.Connector;
import timeShift.tracking.TimeTrackingDataPoint;

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
        final NewJson[] jsons = Connector.readPattern(BUCKET_NAME, userId.toString() + "-" + year + ".*", NewJson.class);
        final TimeTrackingDataPoint[] dataPoints = new TimeTrackingDataPoint[jsons.length];

        for (int i = 0; i < jsons.length; i++) {
            dataPoints[i] = Janus.parse(jsons[i], TimeTrackingDataPoint.class);
        }

        return dataPoints;
    }

    public TimeTrackingDataPoint[] find(UUID userId, int year, int month) {
        final NewJson[] jsons = Connector.readPattern(BUCKET_NAME, userId.toString() + "-" + year + "-" + month + ".*", NewJson.class);
        final TimeTrackingDataPoint[] dataPoints = new TimeTrackingDataPoint[jsons.length];

        for (int i = 0; i < jsons.length; i++) {
            dataPoints[i] = Janus.parse(jsons[i], TimeTrackingDataPoint.class);
        }

        return dataPoints;
    }

    public TimeTrackingDataPoint[] find(UUID userId, int year, int month, int day) {
        final NewJson[] jsons = Connector.readPattern(BUCKET_NAME, userId.toString() + "-" + year + "-" + month + "-" + day, NewJson.class);
        final TimeTrackingDataPoint[] dataPoints = new TimeTrackingDataPoint[jsons.length];

        for (int i = 0; i < jsons.length; i++) {
            dataPoints[i] = Janus.parse(jsons[i], TimeTrackingDataPoint.class);
        }

        return dataPoints;
    }

    public boolean delete(TimeTrackingDataPoint dataPoint) {
        return Connector.delete(BUCKET_NAME, dataPoint.getKey());
    }
}
