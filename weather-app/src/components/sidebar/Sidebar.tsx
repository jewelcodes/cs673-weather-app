import React, {useState, useContext, useEffect} from 'react';
import './Sidebar.css';
import SidebarPlace from './SidebarPlace.tsx';
import { Context } from '../../App.tsx';

function Places(handler, locations, current) {
    let places = [];

    for(let i = 0; i < locations.length; i++) {
        let place = locations[i];
        places.push(<SidebarPlace clickHandler={handler} place={place} active={i==current} id={i} />);
    }

    return places;
}

function Sidebar(props:any) {
    const context = useContext(Context);
    let [ current, setCurrent ] = useState(context.currentLocation);

    useEffect(() => {
        console.log("sidebar: useeffect change to " + current);
        context.currentLocation = current;
    }, [current]);

    const places = Places(setCurrent, context.locations, current);
    return (
        <div className="sidebar">
            {places}
        </div>
    );
}

export default Sidebar;
