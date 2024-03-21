import React, {useState, createContext, useContext} from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar.tsx';
import Main from './components/main/Main.tsx';
import Pic from './backgrounds/night.jpg';

export const Context = createContext();

function updateBackground() {
    return "url(" + Pic + ")";  // TODO
}

function App() {
    let [background, setBackground] = useState(Pic);

    return (
        <Context.Provider value={{location: "Boston"}}>
            <div className="background" style={{backgroundImage: updateBackground()}}>
                <Sidebar change={setBackground} />
                <Main />
            </div>
        </Context.Provider>
    );
} 

export default App;