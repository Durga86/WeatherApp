@echo off
echo Curl script starting.
::CURL script to to call the Public Weather API and insert the weather details into data base
curl http://localhost:8080/WeatherService/weather/public/api ^-H "Content-Type: application/json"
echo REST API called successfully