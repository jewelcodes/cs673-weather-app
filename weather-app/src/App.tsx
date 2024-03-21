import React, {useState} from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar.tsx';
import Pic from './backgrounds/cloudynight.jpg';

function App() {
    let [background, setBackground] = useState(Pic);

    return (
      <div className="background" style={{backgroundImage: "url(" + background + ")"}}>
        <Sidebar change={setBackground} />
      </div>
    );
} 

export default App;
