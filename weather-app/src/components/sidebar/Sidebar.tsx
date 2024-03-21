import React, {useContext} from 'react';
import './Sidebar.css';
import SidebarPlace from './SidebarPlace.tsx';
import { Context } from '../../App.tsx';

function Places() {
    const context = useContext(Context);
    const currentPlace = context.currentLocation;
    let places = [];

    for(let i = 0; i < context.locations.length; i++) {
        let place = context.locations[i];
        places.push(<SidebarPlace place={place} active={i==currentPlace} id={i} />);
    }

    return places;
}

function Sidebar(props:any) {
    const places = Places();
    return (
        <div className="sidebar">
            {places}
        </div>
    );
}

export default Sidebar;
