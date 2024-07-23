package timeShift.filter;

import dobby.filter.Filter;
import dobby.filter.FilterType;
import dobby.io.HttpContext;
import dobby.io.response.Response;
import dobby.io.response.ResponseCodes;
import dobby.session.Session;
import dobby.util.Config;
import hades.filter.FilterOrder;
import hades.user.service.UserService;

import java.util.ArrayList;
import java.util.Arrays;

public class AuthorizedRedirectFilter implements Filter {
    private static final ArrayList<String> redirectPaths = new ArrayList<>(Arrays.asList("/", "/index.html"));

    @Override
    public String getName() {
        return "authorized-redirect-pre-filter";
    }

    @Override
    public FilterType getType() {
        return FilterType.PRE;
    }

    @Override
    public int getOrder() {
        return FilterOrder.AUTHORIZED_REDIRECT_PRE_FILTER.getOrder();
    }

    @Override
    public boolean run(HttpContext httpContext) {
        final String path = httpContext.getRequest().getPath().toLowerCase();
        final Session session = httpContext.getSession();

        if (UserService.getInstance().isLoggedIn(session)) {
            return true;
        }

        if (redirectPaths.contains(path)) {
            final Response response = httpContext.getResponse();

            response.setHeader("location", Config.getInstance().getString("hades.context", "") + "/hades/login/");
            response.setCode(ResponseCodes.FOUND);

            return false;
        }
        return true;
    }
}
