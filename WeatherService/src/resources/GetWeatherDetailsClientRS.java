/**
 * GetWeatherDetailsClientRS
 */
package resources;

import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import dao.GetWeatherDetailsDAO;

/**
 * @author Durga
 * 
 * This class gets the weather details from public api
 * and updates the database.
 *
 */
@Path("/public")
public class GetWeatherDetailsClientRS {

	GetWeatherDetailsDAO detailsDAO;
	Connection mySqlDbConnection;

	/**
	 * Gets Weather data from Public API and updates DB
	 * @return
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/api")
	public String updateWeatherDetails(){
		String responseString = "";
		try {
			Client client = ClientBuilder.newClient();

			WebTarget target = client
					.target("http://api.openweathermap.org/data/2.5");

			Response response = target.path("group")
					.queryParam("id", "4254010,4726206")
					.queryParam("units", "imperial")
					.queryParam("APPID", "1cfa4e8576b9ac791ef13c1a2d42c26f")
					.request(MediaType.APPLICATION_JSON_TYPE).get();

			responseString = response.readEntity(String.class);
			parseResponse(responseString);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return responseString;
	}

	/**
	 * Parses the JSON response and inserts the values into DB
	 * @param responseString
	 * @return
	 * @throws SQLException
	 */
	public String parseResponse(String responseString) throws SQLException {
	    JsonObject tempObject = null;
	    JsonArray weatherArray = null;
	    try {
	    	JsonElement jelement = new JsonParser().parse(responseString);
	    	JsonObject  jobject = jelement.getAsJsonObject();
	    	JsonArray jarray = jobject.getAsJsonArray("list");
	    	String dbUpdateResponse = "Failure";
	    	for(int i=0; i<jarray.size(); i++)
	    	{
	    		detailsDAO = new GetWeatherDetailsDAO();
		    	mySqlDbConnection = GetWeatherDetailsDAO.getMySqlDbConnection();
	    		jobject = (JsonObject)jarray.get(i);
	    		tempObject = jobject.getAsJsonObject("main");
	    		int cityID = (Integer)jobject.get("id").getAsInt();
	    		int currTemp = Math.round((Integer)tempObject.get("temp").getAsInt());
	    		int minTemp = Math.round((Integer)tempObject.get("temp_min").getAsInt());
	    		int maxTemp = Math.round((Integer)tempObject.get("temp_max").getAsInt());
	    		long timeinMillis = (Long)jobject.get("dt").getAsLong();
	    		Date currDate = new Date((long)timeinMillis*1000);
	    		SimpleDateFormat sdf=new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
	    		String currDateString=sdf.format(currDate);
	    		weatherArray = jobject.getAsJsonArray("weather");
	    		String weatherType = ((JsonObject)weatherArray.get(0)).get("main").getAsString();
	    		String insertQuery = "insert into temperatures values (default,'"+cityID+"','"+currTemp+"','"+minTemp+"','"+maxTemp+"','"+currDateString+"','"+weatherType+"')";
	    		dbUpdateResponse = detailsDAO.setCityTemperatures(insertQuery, mySqlDbConnection);
	    	}
	    	return dbUpdateResponse;
	    }
	    catch(Exception e)
	    {
	    	e.printStackTrace();
	    }
	    finally
		{
			//finally block used to close resources
	      try{
	         if(mySqlDbConnection!=null)
	         {
	        	 mySqlDbConnection.close();
	         }
	      }catch(SQLException exception){
	    	  exception.printStackTrace();
	      }
		}//end finally
	    return "Failure";
	}
}
