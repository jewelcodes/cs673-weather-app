import React, {useContext, useEffect, useState} from 'react';
import './DailyForecast.css';
import { currentLocation } from '../../common/locations';

function DailyForecast(props:any) {

    return (
        <div>hi context test {currentLocation()}</div>
    );
}

export default DailyForecast;
