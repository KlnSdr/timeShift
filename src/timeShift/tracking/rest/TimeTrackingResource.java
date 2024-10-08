package timeShift.tracking.rest;

import dobby.annotations.Get;
import dobby.annotations.Post;
import dobby.io.HttpContext;
import dobby.io.response.ResponseCodes;
import dobby.session.Session;
import dobby.util.json.NewJson;
import hades.annotations.AuthorizedOnly;
import timeShift.tracking.TimeTrackingDataPoint;
import timeShift.tracking.TimeTrackingDataPointFactory;
import timeShift.tracking.service.TimeTrackingService;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class TimeTrackingResource {
    private static final String BASE_PATH = "/rest/time-tracking";
    private static final TimeTrackingService service = TimeTrackingService.getInstance();

    private static UUID getUserId(HttpContext context) {
        final Session session = context.getSession();
        return UUID.fromString(session.get("userId"));
    }

    @AuthorizedOnly
    @Get(BASE_PATH + "/get-next-state")
    public void getNextState(HttpContext context) {
        final NewJson payload = new NewJson();
        payload.setString("nextState", getNextState(getUserId(context)));

        context.getResponse().setBody(payload);
    }

    @AuthorizedOnly
    @Get(BASE_PATH + "/{year}")
    public void getByYear(HttpContext context) {
        final int year = Integer.parseInt(context.getRequest().getParam("year"));
        final TimeTrackingDataPoint[] dataPoints = service.find(getUserId(context), year);


        final NewJson jsonBody = new NewJson();
        jsonBody.setList("data", List.of(Arrays.stream(dataPoints).map(TimeTrackingDataPoint::toJson).toArray(NewJson[]::new)));
        context.getResponse().setBody(jsonBody);
    }

    @AuthorizedOnly
    @Get(BASE_PATH + "/{year}/{month}")
    public void getByYearMonth(HttpContext context) {
        final int year = Integer.parseInt(context.getRequest().getParam("year"));
        final int month = Integer.parseInt(context.getRequest().getParam("month"));
        final TimeTrackingDataPoint[] dataPoints = service.find(getUserId(context), year, month);

        final NewJson jsonBody = new NewJson();
        jsonBody.setList("data", List.of(Arrays.stream(dataPoints).map(TimeTrackingDataPoint::toJson).toArray(NewJson[]::new)));
        context.getResponse().setBody(jsonBody);
    }

    @AuthorizedOnly
    @Get(BASE_PATH + "/{year}/{month}/{day}")
    public void getByYearMonthDay(HttpContext context) {
        final int year = Integer.parseInt(context.getRequest().getParam("year"));
        final int month = Integer.parseInt(context.getRequest().getParam("month"));
        final int day = Integer.parseInt(context.getRequest().getParam("day"));
        final TimeTrackingDataPoint[] dataPoints = service.find(getUserId(context), year, month, day);

        final NewJson jsonBody = new NewJson();
        jsonBody.setList("data", List.of(Arrays.stream(dataPoints).map(TimeTrackingDataPoint::toJson).toArray(NewJson[]::new)));
        context.getResponse().setBody(jsonBody);
    }

    @AuthorizedOnly
    @Post(BASE_PATH)
    public void save(HttpContext context) {
        final String nextState = getNextState(getUserId(context));

        final TimeTrackingDataPoint dataPoint = parseDataPoint(context);
        if (dataPoint == null) {
            context.getResponse().setCode(ResponseCodes.BAD_REQUEST);
            return;
        }
        dataPoint.setStart("kommen".equals(nextState));
        final boolean didSave = service.save(dataPoint);
        if (!didSave) {
            context.getResponse().setCode(ResponseCodes.INTERNAL_SERVER_ERROR);
            return;
        }
        context.getResponse().setCode(ResponseCodes.CREATED);
        context.getResponse().setBody(dataPoint.toJson());
    }

    private String getNextState(UUID userId) {
        final TimeTrackingDataPoint calendar = TimeTrackingDataPointFactory.getNow();
        final TimeTrackingDataPoint[] dataPoints = service.find(userId, calendar.getYear(), calendar.getMonth(), calendar.getDay());

        String nextState = "kommen";
        if (dataPoints.length > 0) {
            final TimeTrackingDataPoint lastDataPoint = dataPoints[dataPoints.length - 1];
            nextState = lastDataPoint.isStart() ? "gehen" : "kommen";
        }
        return nextState;
    }

    private static TimeTrackingDataPoint parseDataPoint(HttpContext context) {
        final NewJson json = context.getRequest().getBody();
        if (!json.hasKeys("isRemote")) {
            return null;
        }
        final TimeTrackingDataPoint dataPoint = TimeTrackingDataPointFactory.getNow();
        dataPoint.setUserId(getUserId(context));
        dataPoint.setRemote(json.getBoolean("isRemote"));
        return dataPoint;
    }
}
