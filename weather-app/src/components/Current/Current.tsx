import React from 'react';
import './Current.css';
import { getConditions, currentLocation, isLoading, getForecast } from '../../common/locations';

function Current(props:any) {
    let conditions = getConditions(currentLocation());
    let forecast = getForecast(currentLocation());
    if(isLoading() || conditions == null) {
        return (
            <div className="current">
                <h2>--</h2>
                <h1>&ndash;</h1>
                <h3>--</h3>
                <h3>H: --&nbsp;&nbsp;L: --</h3>
            </div>
        )
    } else {
        return (
            <div className="current">
                <h2>{conditions.place}</h2>
                <h1>{Math.round(conditions.temp)}&deg;</h1>
                <h3>{conditions.condition}</h3>
                <h3>H: {Math.round(forecast.forecast[0].high)}&deg;&nbsp;&nbsp;L: {Math.round(forecast.forecast[0].low)}&deg;</h3>
            </div>
        );
    }
}

export default Current;
