import React, {useContext, useEffect, useState} from 'react';
import './DailyForecast.css';
import { isLoading, currentLocation, getForecast, getConditions, getUnits } from '../../common/locations';

function DailyForecast(props:any) {
    // we will need this for color gradients because i internally used celsius for this
    const fToC = (f:number) => {
        return (f-32) * (5/9);
    };

    const dailyEntry = (d:number) => {
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

            let lowest:number, highest:number;  // in celsius!!!

            if(getUnits() == "imperial") {
                lowest = fToC(forecast.lowest);
                highest = fToC(forecast.highest);
            } else {
                lowest = forecast.lowest;
                highest = forecast.highest;
            }

            let min:number, max:number;

            if(d == 0) {
                if(conditions.temp < forecast.forecast[d].low) {
                    min = conditions.temp;
                } else {
                    min = forecast.forecast[d].low;
                }

                if(conditions.temp > forecast.forecast[d].high) {
                    max = conditions.temp;
                } else {
                    max = forecast.forecast[d].high;
                }
            } else {
                min = forecast.forecast[d].low;
                max = forecast.forecast[d].high;
            }

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
                    <div className="temp"><strong>{Math.round(min)} {Math.round(max)}</strong></div>
                </div>
            );
        }
    };

    return (
        <div className="daily">
            <h1>DAILY FORECAST</h1>
            {dailyEntry(0)}
            {dailyEntry(1)}
            {dailyEntry(2)}
            {dailyEntry(3)}
            {dailyEntry(4)}
        </div>
    );
}

export default DailyForecast;
