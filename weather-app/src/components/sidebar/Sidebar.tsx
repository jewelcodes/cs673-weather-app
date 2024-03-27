import React, {useState, useContext, useEffect} from 'react';
import './Sidebar.css';
import SidebarPlace from './SidebarPlace.tsx';
import Search from '../Search/Search.tsx';
import UnitMenu from '../UnitMenu/UnitMenu.tsx';
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

    const deselect = () => {
        document.querySelector("#sidebarToggle").checked = false;
    };

    const clickHandler = (n:number) => {
        deselect();
        setCurrent(n);
    };

    const places = Places(clickHandler, locations(), current);
    return (
        <div className="sidebarContainer">
            <input type="checkbox" id="sidebarToggle" />
            <div className="sidebar">
                <UnitMenu />
                <Search handler={clickHandler} />
                {places}
            </div>

            <div className="bottom">
                <label htmlFor="sidebarToggle">
                    <i className="fa-solid fa-list"></i>
                </label>
            </div>
        </div>
    );
}

export default Sidebar;
