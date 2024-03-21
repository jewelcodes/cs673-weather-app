import React, {useState} from 'react';
import './App.css';
import Sidebar from './sidebar/Sidebar.tsx';
import Pic from './backgrounds/rainnight.jpg';

function App() {
    let [background, setBackground] = useState(Pic);

    return (
      <div className="background" style={{backgroundImage: "url(" + background + ")"}}>
        <Sidebar change={setBackground} />
      </div>
    );
} 

export default App;
