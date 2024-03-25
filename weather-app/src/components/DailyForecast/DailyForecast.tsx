import React, {useContext, useEffect, useState} from 'react';
import './DailyForecast.css';
import { isLoading, currentLocation, getForecast, getConditions, getUnits } from '../../common/locations';

function DailyForecast(props:any) {
    // we will need this for color gradients because i internally used celsius for this
    const fToC = (f:number) => {
        return (f-32) * (5/9);
    };

    const rgbString = (color:any) => {
        return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
    };

    /* ALL VALUES IN CELSIUS FOR THIS FUNCTION */
    const tempGradient = (today:boolean, lowest:number, highest:number, min:number, max:number, now:number) => {
        // start by calculating width
        let totalRange = highest-lowest;
        let dayRange = max-min;

        let width = Math.round((dayRange*100)/totalRange) + "%";

        // and position
        let offset = min-lowest;
        let position = Math.round((offset*100)/totalRange) + "%";

        // and finally colors
        let maxColor, minColor; // min/max for the entire forecast
        let hiColor, loColor;   // max/min of this specific day

        /* Color Reference
        deg C      color
        -50     166, 36, 164
        -40     196, 61, 194
        -30     224, 83, 222
        -20     193, 115, 235
        -10     115, 123, 235
        0       71, 114, 214
        10      71, 214, 169
        20      143, 214, 71
        30      214, 138, 71
        40      212, 44, 44
        50      163, 8, 8 */

        const colors = [[166,36,164],[196,61,194],[224,83,222],[193,115,235],[115,123,235],[71,114,214],[71,214,169],[143,214,71],[214,138,71],[212,44,44],[163,8,8]];
        let lowestClass = Math.round((lowest/10)+5);
        let highestClass = Math.round((highest/10)+5);

        if(lowestClass >= colors.length) lowestClass = colors.length-1;
        if(highestClass >= colors.length) highestClass = colors.length-1;
        
        //console.log("lowest: " + lowest + " highest: " + highest + " lowest class: " + lowestClass + " highest class: " + highestClass);

        minColor = colors[lowestClass];
        maxColor = colors[highestClass];

        // do low first
        loColor = [];
        let lowOffset = (min-lowest)/totalRange;
    
        console.log("attempt to go from " + minColor + " to " + maxColor);

        for(let i = 0; i < 3; i++) {
            if(maxColor[i] > minColor[i]) {
                loColor.push(minColor[i] + (lowOffset * (maxColor[i] - minColor[i])));
            } else {
                loColor.push(minColor[i] - (lowOffset * (minColor[i] - maxColor[i])));
            }
        }
        
        // and high
        hiColor = []
        let highOffset = (highest-max)/totalRange;
        for(let i = 0; i < 3; i++) {
            if(maxColor[i] > minColor[i]) {
                hiColor.push(maxColor[i] - (highOffset * (maxColor[i] - minColor[i])));
            } else {
                hiColor.push(maxColor[i] + (highOffset * (minColor[i] - maxColor[i])));
            }
        }

        // for today's date, also add something to indicate current temp
        if(today) {
            let currentOffset = now-min;
            let currentPosition = Math.floor((currentOffset*100)/dayRange) + "%";

            return (
                <div className="gradientContainer">
                    <div className="gradient" style={{width: width, left: position, backgroundImage: "linear-gradient(to right," + rgbString(loColor) + "," + rgbString(hiColor) + ")"}}>
                        <div className="now" style={{left: "calc(" + currentPosition + " - 0.2em)"}}></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="gradientContainer">
                    <div className="gradient" style={{width: width, left: position, backgroundImage: "linear-gradient(to right," + rgbString(loColor) + "," + rgbString(hiColor) + ")"}}></div>
                </div>
            );
        }
    };

    const dailyEntry = (d:number) => {
        let forecast:any = getForecast(currentLocation());
        let conditions:any = getConditions(currentLocation());
        let now = Date.now()/1000;
        const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

        if(isLoading() || forecast == null) {
            return (
                <div className="dailyEntry">
                    <div className="day"><strong>&ndash;</strong></div>
                    <div className="icon"></div>
                    <div className="temp">
                        <strong>--</strong>
                        <div className="gradientContainer"></div>
                        <strong>--</strong>
                    </div>
                </div>
            );
        } else {
            let day:any = new Date(forecast.forecast[d].timestamp);
            day = day.getUTCDay();

            let icon:any;
            let isNight = (now < conditions.sunrise || now > conditions.sunset);
            let conditionText:any;

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

            // for the gradient
            let minC:number, maxC:number;
            let lowest:number, highest:number;  // in celsius!!!
            let nowC:number;

            if(getUnits() == "imperial") {
                lowest = fToC(forecast.lowest);
                highest = fToC(forecast.highest);
                minC = fToC(min);
                maxC = fToC(max);
                nowC = fToC(conditions.temp);
            } else {
                lowest = forecast.lowest;
                highest = forecast.highest;
                minC = min;
                maxC = max;
                nowC = conditions.temp;
            }
            
            // for current day only
            if(d == 0) {
                conditionText = conditions.condition;
            } else {
                conditionText = forecast.forecast[d].condition;
            }

            if(conditionText == "Cloudy") {
                icon = "fa-solid fa-cloud";
            } else if(conditionText == "Rain") {
                icon = "fa-solid fa-cloud-showers-heavy"
            } else if(conditionText == "Snow") {
                icon = "fa-regular fa-snowflake";
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
                    <div className="temp"><strong>{Math.round(min)}&deg;</strong>{tempGradient(d == 0, lowest, highest, minC, maxC, nowC)}<strong>{Math.round(max)}&deg;</strong></div>
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
