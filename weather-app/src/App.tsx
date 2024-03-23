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

    const update = async () => {
        //console.log("app: useeffect" + currentLocation());
        await updateConditions();
        setTime(Date.now()/1000);
    };

    useEffect(() => {
        update();
    });

    setInterval(update, 1000);

    return (
        <div className="background" style={{backgroundImage: updateBackground()}}>
            <Sidebar update={setCurrent}  />
            <Main />
        </div>
    );
} 

export default App;