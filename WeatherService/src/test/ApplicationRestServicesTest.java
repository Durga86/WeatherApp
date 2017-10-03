package test;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;

import org.junit.Test;

/**
 * 
 * @author Durga
 * This class is to Mock the REST Service calls.
 *
 */
public class ApplicationRestServicesTest {
	@Test
    public void shouldCheckURIs() throws IOException {

        Client client = ClientBuilder.newClient();

        // Valid URIs
        assertEquals(200, client.target("http://localhost:8080/WeatherService/weather/current?cityName=Austin").request().get().getStatus());
        assertEquals(200, client.target("http://localhost:8080/WeatherService/weather/historical?cityName=Austin&days=2").request().get().getStatus());
        assertEquals(200, client.target("http://localhost:8080/WeatherService/weather/historical?cityName=Austin&days=5").request().get().getStatus());
        assertEquals(200, client.target("http://localhost:8080/WeatherService/weather/public/api").request().get().getStatus());

        // Invalid URIs
        assertEquals(404, client.target("http://localhost:8080/WeatherService/weather/curr?days=Dallas").request().get().getStatus());
        assertEquals(404, client.target("http://localhost:8080/WeatherService/weather/history?cityName=Austin?days=5").request().get().getStatus());

    }
}
