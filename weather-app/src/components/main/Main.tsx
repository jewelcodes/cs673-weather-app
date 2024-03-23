import React, {useContext, useEffect} from 'react';
import Current from '../Current/Current.tsx';
import DailyForecast from '../DailyForecast/DailyForecast.tsx';
import './Main.css';

function Main(props:any) {
    return (
        <div className="main">
            {/* <Search /> */}
            <Current />
            {/* <HourlyForecast /> */}
            <DailyForecast />
        </div>
    );
}

export default Main;
