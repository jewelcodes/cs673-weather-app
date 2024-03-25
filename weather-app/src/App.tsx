import React, {useState, createContext, useContext, useEffect} from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar.tsx';
import Main from './components/main/Main.tsx';
import { currentLocation, getConditions, updateConditions, isLoading } from './common/locations.ts';

// backgrounds for diff conditions
import Night from './backgrounds/night.jpg';
import CloudyNight from './backgrounds/cloudynight.jpg';
import RainNight from './backgrounds/rainnight.jpg';
import SnowNight from './backgrounds/snownight.jpg';
import Day from './backgrounds/day.jpg';
import CloudyDay from './backgrounds/cloudyday.jpg';
import RainDay from './backgrounds/rainday.jpg';
import SnowDay from './backgrounds/snowday.jpg';
import Mist from './backgrounds/mist.jpg';

function App() {
    let [background, setBackground] = useState(Night);  // default
    let [current, setCurrent] = useState(currentLocation());
    let [time, setTime] = useState(0);

    const update = async () => {
        //console.log("app: useeffect" + currentLocation());
        await updateConditions();

        let now = Date.now() / 1000;
        let conditions = getConditions(currentLocation());

        if(conditions != null) {
            if(conditions.condition == "Mist" || conditions.condition == "Haze" || conditions.condition == "Fog") {
                setBackground(Mist);
            } else if(now < conditions.sunrise || now > conditions.sunset) {
                // here we know it's night
                if(conditions.condition == "Cloudy") setBackground(CloudyNight);
                else if(conditions.condition == "Rain" || conditions.condition == "Drizzle" || conditions.condition == "Showers") setBackground(RainNight);
                else if(conditions.condition == "Snow") setBackground(SnowNight);
                else setBackground(Night);
            } else {
                if(conditions.condition == "Cloudy") setBackground(CloudyDay);
                else if(conditions.condition == "Rain" || conditions.condition == "Drizzle" || conditions.condition == "Showers") setBackground(RainDay);
                else if(conditions.condition == "Snow") setBackground(SnowDay);
                else setBackground(Day);
            }
        }

        setTime(now);
    };

    useEffect(() => {
        update();
    });

    setInterval(update, 1000);

    return (
        <div className="background" style={{backgroundImage: "url('" + background + "')"}}>
            <Sidebar update={setCurrent}  />
            <Main />
        </div>
    );
} 

export default App;