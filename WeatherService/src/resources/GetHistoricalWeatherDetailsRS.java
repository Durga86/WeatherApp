/**
 * GetHistoricalWeatherDetailsRS
 */
package resources;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.mysql.jdbc.ResultSetMetaData;

import dao.GetWeatherDetailsDAO;


/**
 * @author Durga
 * 
 * This class is used to retrieve two day and five day 
 * historical weather details from the database.
 *
 */
@Path("/historical")
public class GetHistoricalWeatherDetailsRS {
	
	GetWeatherDetailsDAO detailsDAO;
	Connection mySqlDbConnection;
	ResultSet cityIdRs;
	ResultSet cityTemperaturesRs;
	
	/*
	 * Gets Historical Weather data based on city and days parameters sent
	 */
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getHistoricalWeatherByCity(@QueryParam("cityName") String cityName, 
										@QueryParam("days") String days) throws SQLException
	{
		int daysBefore = Integer.parseInt(days);
		String getCityIDQuery = "select city_id from cities where city_name='"+cityName+"'";
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Map<String, Object> tempRow = null;
		detailsDAO = new GetWeatherDetailsDAO();
		try {
			mySqlDbConnection = GetWeatherDetailsDAO.getMySqlDbConnection();
			cityIdRs = detailsDAO.getCityID(getCityIDQuery, mySqlDbConnection);
			if(cityIdRs.next())
			{
				String cityID = cityIdRs.getString(1);
				Date today = new Date();
				SimpleDateFormat sdf=new SimpleDateFormat("YYYY-MM-dd");
				String todayDateString=sdf.format(today);
				Calendar cal = Calendar.getInstance();
				cal.add(Calendar.DATE, -daysBefore);
				Date daysBeforeDate = cal.getTime();
				String daysBeforeDateString=sdf.format(daysBeforeDate);
				String getTempQuery = "select * from temperatures where city_id='"+cityID+"' and cast(date as date)<'"+todayDateString+"'"
																								+ "and cast(date as date)>='"+daysBeforeDateString+"'";
				cityTemperaturesRs = detailsDAO.getCityTemperatures(getTempQuery, mySqlDbConnection);
				if(cityTemperaturesRs != null)
				{
					ResultSetMetaData rsMetaData = (ResultSetMetaData) cityTemperaturesRs.getMetaData();
				    Integer columnCount = rsMetaData.getColumnCount();
				    while (cityTemperaturesRs.next()) {
				        tempRow = new HashMap<String, Object>();
				        for (int i = 1; i <= columnCount; i++) {
				        	tempRow.put(rsMetaData.getColumnName(i), cityTemperaturesRs.getObject(i));
				        }
				        resultList.add(tempRow);
				    }
				}
			}
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
		Gson gson = new Gson();
	    String tempListJson = gson.toJson(resultList);
	    return tempListJson;
	}

}
