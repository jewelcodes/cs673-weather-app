import React, {useContext, useEffect} from 'react';
import Current from '../Current/Current.tsx';
import DailyForecast from '../DailyForecast/DailyForecast.tsx';
import Footer from '../Footer/Footer.tsx';
import './Main.css';

function Main(props:any) {
    return (
        <div className="main">
            <Current />
            <DailyForecast />
            <Footer />
        </div>
    );
}

export default Main;
