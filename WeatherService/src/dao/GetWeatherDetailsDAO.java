/**
 * GetWeatherDetailsDAO
 */
package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * @author Durga
 * 
 * This Class maintains the Connections and Queries the DB
 *
 */
public class GetWeatherDetailsDAO {

	public static Connection mySqlDbConnection;
	public Statement stmt;
	public ResultSet cityIdResultSet;
	public ResultSet weatherResultSet;
	
	/**
	 * Return DB Connection
	 * @return
	 * @throws SQLException
	 */
	public static Connection getMySqlDbConnection() throws SQLException
	{
		try {
			System.out.println("Inside DB Connection");
			Class.forName("com.mysql.jdbc.Driver");
			mySqlDbConnection = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/weather", "root", "Yuval@22");
		}
		catch(ClassNotFoundException exception)
		{
			System.out.println("Exception is:" + exception);
		}
		return mySqlDbConnection;
	}
	
	/**
	 * Returns City result set
	 * @param getCityIdQuery
	 * @param dbConn
	 * @return
	 */
	public ResultSet getCityID(String getCityIdQuery, Connection dbConn)
	{
		mySqlDbConnection = dbConn;
		try {
			stmt = mySqlDbConnection.createStatement();
			cityIdResultSet = stmt.executeQuery(getCityIdQuery);
		}
		catch(SQLException exception)
		{
			exception.printStackTrace();
		}
		return cityIdResultSet;
	}
	
	/**
	 * Returns temperatures Result set
	 * @param getTempQuery
	 * @param dbConn
	 * @return
	 */
	public ResultSet getCityTemperatures(String getTempQuery, Connection dbConn)
	{
		mySqlDbConnection = dbConn;
		try {
			stmt = mySqlDbConnection.createStatement();
			weatherResultSet = stmt.executeQuery(getTempQuery);
		}
		catch(SQLException exception)
		{
			exception.printStackTrace();
		}
		return weatherResultSet;
	}
	
	/**
	 * Return Success or Failure based on the insert query
	 * @param getTempQuery
	 * @param dbConn
	 * @return
	 */
	public String setCityTemperatures(String getTempQuery, Connection dbConn)
	{
		mySqlDbConnection = dbConn;
		try {
			stmt = mySqlDbConnection.createStatement();
			stmt.executeUpdate(getTempQuery);
			return "Success";
		}
		catch(SQLException exception)
		{
			exception.printStackTrace();
		}
		return "Failure";
	}
}
