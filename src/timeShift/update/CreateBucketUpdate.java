package timeShift.update;

import hades.update.Update;
import thot.connector.Connector;

import static timeShift.tracking.service.TimeTrackingService.BUCKET_NAME;

public class CreateBucketUpdate implements Update {
    @Override
    public boolean run() {
        return Connector.write(BUCKET_NAME, "TEST", true) && Connector.delete(BUCKET_NAME, "TEST");
    }

    @Override
    public String getName() {
        return "CreateTimeTrackingDataBucket";
    }

    @Override
    public int getOrder() {
        return 20;
    }
}
