import React, {useState, createContext, useContext, useEffect} from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar.tsx';
import Main from './components/main/Main.tsx';
import Pic from './backgrounds/night.jpg';
import { currentLocation } from './common/locations.ts';

function updateBackground() {
    return "url(" + Pic + ")";  // TODO
}

function App() {
    let [background, setBackground] = useState(Pic);
    let [current, setCurrent] = useState(0);

    useEffect(() => {
        //console.log("app" + currentLocation());
    }, [current]);

    return (
        <div className="background" style={{backgroundImage: updateBackground()}}>
            <Sidebar update={setCurrent}  />
            <Main />
        </div>
    );
} 

export default App;