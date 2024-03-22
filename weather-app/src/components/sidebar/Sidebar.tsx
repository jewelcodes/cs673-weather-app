import React, {useState, useContext, useEffect} from 'react';
import './Sidebar.css';
import SidebarPlace from './SidebarPlace.tsx';
import { locations, currentLocation, setLocationIndex } from '../../common/locations.ts';

function Places(handler:Function, locations:string[], current:number) {
    let places = [];

    for(let i = 0; i < locations.length; i++) {
        let place = locations[i];
        places.push(<SidebarPlace clickHandler={handler} place={place} active={i==current} id={i} />);
    }

    return places;
}

function Sidebar(props:any) {
    let [ current, setCurrent ] = useState(currentLocation());

    useEffect(() => {
        console.log("sidebar: useeffect change to " + current);
        props.update(current);
        setLocationIndex(current);
    }, [current]);

    const places = Places(setCurrent, locations(), current);
    return (
        <div className="sidebar">
            {places}
        </div>
    );
}

export default Sidebar;
