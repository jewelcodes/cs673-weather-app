import React from 'react';
import DailyForecast from '../DailyForecast/DailyForecast.tsx';
import './Main.css';

function Main(props:any) {
    return (
        <div className="main">
            {/* <Search /> */}
            {/* <HourlyForecast /> */}
            <DailyForecast />
        </div>
    );
}

export default Main;
