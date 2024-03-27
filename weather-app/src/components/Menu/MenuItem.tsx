import React from 'react';
import './Menu.css';

function MenuItem(props:any) {
    return (
        <li onMouseDown={() => props.handler(props.index)} className={props.selected == props.index ? "selected" : ""}>
            {props.text}
        </li>
    );
}

export default MenuItem;
