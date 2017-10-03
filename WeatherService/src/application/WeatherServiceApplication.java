/**
 * WeatherServiceApplication.java
 */
package application;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import resources.GetCurrentWeatherDetailsRS;
import resources.GetHistoricalWeatherDetailsRS;
import resources.GetWeatherDetailsClientRS;

/**
 * @author Durga
 * This is the Main Application class
 *
 */
@ApplicationPath("weather")
public class WeatherServiceApplication extends Application {
	/*
	 * This method is used to configure all the resources in the application.
	 * If you have a new resource you need to add it to the set otherwise you will get 404 error.
	 * (non-Javadoc)
	 * @see javax.ws.rs.core.Application#getClasses()
	 */
	public Set<Class<?>> getClasses() {
        Set<Class<?>> s = new HashSet<Class<?>>();
        s.add(GetCurrentWeatherDetailsRS.class);
        s.add(GetHistoricalWeatherDetailsRS.class);
        s.add(GetWeatherDetailsClientRS.class);
        return s;
    }
}
