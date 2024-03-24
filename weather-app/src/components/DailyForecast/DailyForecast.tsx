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
    const tempGradient = (lowest:number, highest:number, min:number, max:number) => {
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
        -50     119, 10, 166
        -40     91, 10, 166
        -30     75, 10, 166
        -20     33, 10, 166
        -10     24, 67, 196
        0       54, 118, 227
        10      54, 192, 227
        20      54, 227, 77
        30      227, 204, 54
        40      227, 54, 54
        50      168, 3, 3 */

        const colors = [[119,10,166],[91,10,166],[75,10,166],[33,10,166],[24,67,196],[79,130,219],[101,212,240],[54,227,77],[227,204,54],[227,54,54],[168,3,3]];
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

        /*hiColor.push(maxColor[0] - (highOffset * (maxColor[0] - minColor[0])));
        hiColor.push(maxColor[1] - (highOffset * (maxColor[1] - minColor[1])));
        hiColor.push(maxColor[2] - (highOffset * (maxColor[2] - minColor[2])));*/
        
        return (
            <div className="gradientContainer">
                <div className="gradient" style={{width: width, left: position, backgroundImage: "linear-gradient(to right," + rgbString(loColor) + "," + rgbString(hiColor) + ")"}}></div>
            </div>
        );
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

            if(getUnits() == "imperial") {
                lowest = fToC(forecast.lowest);
                highest = fToC(forecast.highest);
                minC = fToC(min);
                maxC = fToC(max);
            } else {
                lowest = forecast.lowest;
                highest = forecast.highest;
                minC = min;
                maxC = max;
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
                    <div className="temp"><strong>{Math.round(min)}&deg;{tempGradient(lowest, highest, minC, maxC)}{Math.round(max)}&deg;</strong></div>
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
