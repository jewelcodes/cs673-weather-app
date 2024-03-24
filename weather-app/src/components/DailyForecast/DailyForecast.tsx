import React, {useContext, useEffect, useState} from 'react';
import './DailyForecast.css';
import { isLoading, currentLocation, getForecast, getConditions } from '../../common/locations';

function DailyForecast(props:any) {
    const dailyEntry = (d:number, min:number, max:number) => {
        let forecast:any = getForecast(currentLocation());
        let conditions:any = getConditions(currentLocation());
        let now = Date.now()/1000;
        const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

        if(isLoading() || forecast == null) {
            return (
                <div className="dailyEntry">
                    <div className="day"><strong>--</strong></div>
                    <div className="icon"></div>
                    <div className="temp"></div>
                </div>
            );
        } else {
            let day:any = new Date(forecast.forecast[d].timestamp);
            day = day.getUTCDay();

            let icon:any;
            let isNight = (now < conditions.sunrise || now > conditions.sunset);
            let conditionText:any;

            if(d == 0) {
                conditionText = conditions.condition;
            } else {
                conditionText = forecast.forecast[d].condition;
            }
            
            // for current day only
            if(conditionText == "Cloudy") {
                icon = "fa-solid fa-cloud";
            } else if(conditionText == "Rain") {
                icon = "fa-solid fa-cloud-rain"
            } else if(conditionText == "Snow") {
                icon = "fa-solid fa-snowflake";
            } else if(conditionText == "Mist" || conditionText == "Fog" || conditionText == "Haze") {
                icon = "fa-solid fa-smog";
            } else if(d == 0 && isNight) {
                icon = "fa-solid fa-cloud-moon";
            } else {
                icon = "fa-solid fa-sun";
            }

            return (
                <div className="dailyEntry">
                    <div className="day"><strong>{d == 0 ? "Today" : days[day]}</strong></div>
                    <div className="icon"><i className={icon} title={conditionText}></i></div>
                    <div className="temp"></div>
                </div>
            );
        }
    };

    return (
        <div className="daily">
            <h1>DAILY FORECAST</h1>
            {dailyEntry(0, 0, 0)}
            {dailyEntry(1, 0, 0)}
            {dailyEntry(2, 0, 0)}
            {dailyEntry(3, 0, 0)}
            {dailyEntry(4, 0, 0)}
        </div>
    );
}

export default DailyForecast;
