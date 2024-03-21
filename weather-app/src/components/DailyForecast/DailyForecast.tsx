import React, {useContext} from 'react';
import './DailyForecast.css';
import { Context } from '../../App.tsx';

function DailyForecast(props:any) {
    const context = useContext(Context);

    return (
        <div>hi context test {context.hello}</div>
    );
}

export default DailyForecast;
