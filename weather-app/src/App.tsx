import React, {useState, createContext, useContext, useEffect} from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar.tsx';
import Main from './components/main/Main.tsx';
import Pic from './backgrounds/night.jpg';
import { currentLocation, getConditions, updateConditions, isLoading } from './common/locations.ts';

function updateBackground() {
    return "url(" + Pic + ")";  // TODO
}

function App() {
    let [background, setBackground] = useState(Pic);
    let [current, setCurrent] = useState(currentLocation());
    let [time, setTime] = useState(0);

    let update = async () => {
        console.log("app" + currentLocation());
        await updateConditions();
        setTime(getConditions(0) == null ? 0 : getConditions(0).time);
    };

    useEffect(() => {
        update();
    });

    return (
        <div className="background" style={{backgroundImage: updateBackground()}}>
            <Sidebar update={setCurrent}  />
            <Main />
        </div>
    );
} 

export default App;