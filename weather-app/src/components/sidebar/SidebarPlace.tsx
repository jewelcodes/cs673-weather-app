import React, {useContext} from 'react';
import './Sidebar.css';
import { Context } from '../../App';

function SidebarPlace(props:any) {
    return (
        <div className={props.active ? "active" : ""} onClick={() => props.clickHandler(props.id)}>
            <div>
                {/* left flexbox */}
                <h2>{props.place}</h2>
                <h3>HH:MM</h3>
                <h4>Windy</h4>
            </div>

            <div>
                {/* right */}
                <h1>X&deg;</h1>
            </div>
        </div>
    );
}

export default SidebarPlace;
