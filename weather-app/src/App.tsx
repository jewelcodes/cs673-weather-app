import React from 'react';
import './App.css';
import Sidebar from './sidebar/Sidebar.tsx';
import Background from './backgrounds/rainnight.jpg';

function App() {
  return (
    <div className="background" style={{backgroundImage: "url(" + Background  + ")"}}>
      hello test something
      <Sidebar />
    </div>
  );
}

export default App;
