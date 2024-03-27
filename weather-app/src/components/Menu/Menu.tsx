import React from 'react';
import './Menu.css';
import MenuItem from './MenuItem.tsx';

function Menu(props:any) {
    let list = [];

    for(let i = 0; i < props.list.length; i++) {
        //list.push(<li onClick={() => props.handler(i)}>{props.list[i]}</li>)
        list.push(<MenuItem selected={props.selected} index={i} handler={props.handler} text={props.list[i]} />)
    }

    return (
        <div className="menu">
            <i tabIndex={-1} className="fa-solid fa-ellipsis" />
            <ul>
                {list}
            </ul>
        </div>
    );
}

export default Menu;
