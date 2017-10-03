//  This JS file has all the functions to display required data in DOM.
	var xmlhttp;
	var days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
	function init() {
		document.getElementById("defaultOpen").click();
    }
    
    //Gets called when the Current and Past Tabs are clicked.
    function openCity(evt, tabName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
        
        if(tabName == "current")
        {
        	populateCurrentTab();
        }
        else if(tabName == "pasttwodays")
        {
        	populatePastTwoDaystTab();
        }
        else
        {
        	populatePastFiveDaystTab();
        }
    }
    
    //Populates data in Current Tab
    function populateCurrentTab() {
    	xmlhttp = new XMLHttpRequest();
    	var cityName = document.getElementById("cityName");
        var url = "http://localhost:8080/WeatherService/weather/current?cityName=" + cityName.value;
        xmlhttp.open('GET',url,true);
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
               if (xmlhttp.readyState == 4) {
                  if ( xmlhttp.status == 200) {
                       var currTempData = eval( "(" +  xmlhttp.responseText + ")");
                       if (currTempData != null && currTempData.length > 0) {
                    	   var currentTable = document.getElementById("currentTable");
                    	   var currentTableRowCount = currentTable.rows.length;
                    	   if(currentTableRowCount > 0)
                    	   {
                    		   for (var i=currentTableRowCount-1; i >=0; i--) {
                    			   currentTable.deleteRow(i);
                        	   }
                    	   }
                    	   for(var i=0; i<currTempData.length; i++)
                    	   {
                    		   var tableHeader = currentTable.createTHead();
                    		   tableHeader.className = "tableHeader";
                    		   var tableHeaderRow = tableHeader.insertRow(0);     
                    		   var tableHeaderRowCell1 = tableHeaderRow.insertCell(0);
                    		   tableHeaderRowCell1.align = 'center';
                    		   tableHeaderRowCell1.innerHTML = "DAY";
                    		   var tableHeaderRowCell2 = tableHeaderRow.insertCell(1);
                    		   tableHeaderRowCell2.align = 'center';
                    		   tableHeaderRowCell2.innerHTML = "TEMPERATURE";
                    		   var tableHeaderRowCell3 = tableHeaderRow.insertCell(2);
                    		   tableHeaderRowCell3.align = 'center';
                    		   tableHeaderRowCell3.innerHTML = "DESCRIPTION";
                    		   var tableHeaderRowCell4 = tableHeaderRow.insertCell(3);
                    		   tableHeaderRowCell4.align = 'center';
                    		   tableHeaderRowCell4.innerHTML = "HIGH/LOW";
                    		   
                    		   var currDate = new Date(currTempData[i].date);
                    		   var currDayRow = currentTable.insertRow(1);
                    		   var currDayRowCell1 = currDayRow.insertCell(0);
                    		   currDayRowCell1.align = "center";
                    		   currDayRowCell1.innerHTML = "<b>"+days[currDate.getDay()]+"</b>";
                    		   var currDayRowCell2 = currDayRow.insertCell(1);
                    		   currDayRowCell2.align = "center";
                    		   currDayRowCell2.innerHTML = currTempData[i].curr_temp+"<sup>o</sup> F <div> as of "+currTempData[i].date+"</div>";
                    		   var currDayRowCell3 = currDayRow.insertCell(2);
                    		   currDayRowCell3.align = "center";
                    		   currDayRowCell3.innerHTML = currTempData[i].weather_type;
                    		   var currDayRowCell4 = currDayRow.insertCell(3);
                    		   currDayRowCell4.align = "center";
                    		   currDayRowCell4.innerHTML = currTempData[i].max_temp+"<sup>o</sup> F /"+currTempData[i].min_temp+"<sup>o</sup> F";
                    	   }
                       }
                       else {
                    	   var noDataRow = currentTable.insertRow(1);
                		   var noDataRowCell1 = noDataRow.insertCell(0);
                		   noDataRowCell1.innerHTML = "<b> No Data Available <b>";
                       }
                 }
               }
        	}
    }
    
  //Populates data in Past 2 Days Tab
    function populatePastTwoDaystTab() {
    	xmlhttp = new XMLHttpRequest();
        var cityName = document.getElementById("cityName");
        var url = "http://localhost:8080/WeatherService/weather/historical?cityName=" 
        			+cityName.value+"&days="+2;
        xmlhttp.open('GET',url,true);
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
               if (xmlhttp.readyState == 4) {
                  if ( xmlhttp.status == 200) {
                       var pastTwoDaysData = eval( "(" +  xmlhttp.responseText + ")");
                       if (pastTwoDaysData != null && pastTwoDaysData.length > 0) {
                    	   var pastTwoDaysTable = document.getElementById("pastTwoDaysTable");
                    	   var pastTwoDaysTableRowCount = pastTwoDaysTable.rows.length;
                    	   if(pastTwoDaysTableRowCount > 0)
                    	   {
                    		   for (var i=pastTwoDaysTableRowCount-1; i >=0; i--) {
                    			   pastTwoDaysTable.deleteRow(i);
                        	   }
                    	   }
                    	   var twoDaysTableHeader = pastTwoDaysTable.createTHead();
                    	   twoDaysTableHeader.className = "tableHeader";
                		   var twoDaysTableHeaderRow = twoDaysTableHeader.insertRow(0);     
                		   var twoDaysTableHeaderRowCell1 = twoDaysTableHeaderRow.insertCell(0);
                		   twoDaysTableHeaderRowCell1.align = 'center';
                		   twoDaysTableHeaderRowCell1.innerHTML = "DAY";
                		   var twoDaysTableHeaderRowCell2 = twoDaysTableHeaderRow.insertCell(1);
                		   twoDaysTableHeaderRowCell2.align = 'center';
                		   twoDaysTableHeaderRowCell2.innerHTML = "TEMPERATURE";
                		   var twoDaysTableHeaderRowCell3 = twoDaysTableHeaderRow.insertCell(2);
                		   twoDaysTableHeaderRowCell3.align = 'center';
                		   twoDaysTableHeaderRowCell3.innerHTML = "DESCRIPTION";
                		   var twoDaysTableHeaderRowCell4 = twoDaysTableHeaderRow.insertCell(3);
                		   twoDaysTableHeaderRowCell4.align = 'center';
                		   twoDaysTableHeaderRowCell4.innerHTML = "HIGH/LOW";
                		   
                    	   for(var i=0; i<pastTwoDaysData.length; i++)
                    	   {
                    		   var pastDate = new Date(pastTwoDaysData[i].date);
                    		   var pastTwoDayRow = pastTwoDaysTable.insertRow(1);
                    		   var pastTwoDayRowCell1 = pastTwoDayRow.insertCell(0);
                    		   pastTwoDayRowCell1.align = "center";
                    		   pastTwoDayRowCell1.innerHTML = "<b>"+days[pastDate.getDay()]+"</b>";
                    		   var pastTwoDayRowCell2 = pastTwoDayRow.insertCell(1);
                    		   pastTwoDayRowCell2.align = "center";
                    		   pastTwoDayRowCell2.innerHTML = pastTwoDaysData[i].curr_temp+"<sup>o</sup> F <div> as of "+pastTwoDaysData[i].date+"</div>";
                    		   var pastTwoDayRowCell3 = pastTwoDayRow.insertCell(2);
                    		   pastTwoDayRowCell3.align = "center";
                    		   pastTwoDayRowCell3.innerHTML = pastTwoDaysData[i].weather_type;
                    		   var pastTwoDayRowCell4 = pastTwoDayRow.insertCell(3);
                    		   pastTwoDayRowCell4.align = "center";
                    		   pastTwoDayRowCell4.innerHTML = pastTwoDaysData[i].max_temp+"<sup>o</sup> F /"+pastTwoDaysData[i].min_temp+"<sup>o</sup> F";
                    	   }
                       }
                       else {
                    	   var noDataRow = pastTwoDaysTable.insertRow(0);
                		   var noDataRowCell1 = noDataRow.insertCell(0);
                		   noDataRowCell1.innerHTML = "No Data Available";
                       }
                 }
               }
        	}
    }
    
  //Populates data in Past 5 Days Tab
    function populatePastFiveDaystTab() {
    	xmlhttp = new XMLHttpRequest();
        var cityName = document.getElementById("cityName");
        var url = "http://localhost:8080/WeatherService/weather/historical?cityName=" 
        			+cityName.value+"&days="+5;
        xmlhttp.open('GET',url,true);
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
               if (xmlhttp.readyState == 4) {
                  if ( xmlhttp.status == 200) {
                       var pastFiveDaysData = eval( "(" +  xmlhttp.responseText + ")");
                       if (pastFiveDaysData != null && pastFiveDaysData.length > 0) {
                    	   var pastFiveDaysTable = document.getElementById("pastFiveDaysTable");
                    	   var pastFiveDaysTableRowCount = pastFiveDaysTable.rows.length;
                    	   if(pastFiveDaysTableRowCount > 0)
                    	   {
                    		   for (var i=pastFiveDaysTableRowCount-1; i >=0; i--) {
                    			   pastFiveDaysTable.deleteRow(i);
                        	   }
                    	   }
                    	   var fiveDaysTableHeader = pastFiveDaysTable.createTHead();
                    	   fiveDaysTableHeader.className = "tableHeader";
                		   var fiveDaysTableHeaderRow = fiveDaysTableHeader.insertRow(0);     
                		   var fiveDaysTableHeaderRowCell1 = fiveDaysTableHeaderRow.insertCell(0);
                		   fiveDaysTableHeaderRowCell1.align = 'center';
                		   fiveDaysTableHeaderRowCell1.innerHTML = "DAY";
                		   var fiveDaysTableHeaderRowCell2 = fiveDaysTableHeaderRow.insertCell(1);
                		   fiveDaysTableHeaderRowCell2.align = 'center';
                		   fiveDaysTableHeaderRowCell2.innerHTML = "TEMPERATURE";
                		   var fiveDaysTableHeaderRowCell3 = fiveDaysTableHeaderRow.insertCell(2);
                		   fiveDaysTableHeaderRowCell3.align = 'center';
                		   fiveDaysTableHeaderRowCell3.innerHTML = "DESCRIPTION";
                		   var fiveDaysTableHeaderRowCell4 = fiveDaysTableHeaderRow.insertCell(3);
                		   fiveDaysTableHeaderRowCell4.align = 'center';
                		   fiveDaysTableHeaderRowCell4.innerHTML = "HIGH/LOW";
                    	   for(var i=0; i<pastFiveDaysData.length; i++)
                    	   {
                    		   var pastFiveDate = new Date(pastFiveDaysData[i].date);
                    		   var pastFiveDayRow = pastFiveDaysTable.insertRow(1);
                    		   var pastFiveDayRowCell1 = pastFiveDayRow.insertCell(0);
                    		   pastFiveDayRowCell1.align = "center";
                    		   pastFiveDayRowCell1.innerHTML = "<b>"+days[pastFiveDate.getDay()]+"</b>";
                    		   var pastFiveDayRowCell2 = pastFiveDayRow.insertCell(1);
                    		   pastFiveDayRowCell2.align = "center";
                    		   pastFiveDayRowCell2.innerHTML = pastFiveDaysData[i].curr_temp+"<sup>o</sup> F <div> as of "+pastFiveDaysData[i].date+"</div>";
                    		   var pastFiveDayRowCell3 = pastFiveDayRow.insertCell(2);
                    		   pastFiveDayRowCell3.align = "center";
                    		   pastFiveDayRowCell3.innerHTML = pastFiveDaysData[i].weather_type;
                    		   var pastFiveDayRowCell4 = pastFiveDayRow.insertCell(3);
                    		   pastFiveDayRowCell4.align = "center";
                    		   pastFiveDayRowCell4.innerHTML = pastFiveDaysData[i].max_temp+"<sup>o</sup> F /"+pastFiveDaysData[i].min_temp+"<sup>o</sup> F";
                    	   }
                       }
                       else {
                    	   var noDataRow = pastFiveDaysTable.insertRow(0);
                		   var noDataRowCell1 = noDataRow.insertCell(0);
                		   noDataRowCell1.innerHTML = "No Data Available";
                       }
                 }
               }
        	}
    }