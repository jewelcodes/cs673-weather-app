import React, {useContext, useEffect, useState} from 'react';
import './DailyForecast.css';
import { isLoading, currentLocation, getForecast } from '../../common/locations';

function DailyForecast(props:any) {
    const dailyEntry = (d:number, min:number, max:number) => {
        let forecast:any = getForecast(currentLocation());
        let day:any;
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
            day = new Date(forecast.forecast[d].timestamp + " 00:00:00 UTC");
            day = day.getUTCDay();

            return (
                <div className="dailyEntry">
                    <div className="day"><strong>{d == 0 ? "Today" : days[day]}</strong></div>
                    <div className="icon"></div>
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
