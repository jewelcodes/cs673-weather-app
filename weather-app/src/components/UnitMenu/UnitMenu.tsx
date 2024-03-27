import React from 'react';
import Menu from '../Menu/Menu.tsx';
import './UnitMenu.css';
import {setUnits, getUnits} from '../../common/locations.ts';

function UnitMenu(props:any) {
    const handler = (id:number) => {
        if(id === 0) {
            setUnits("metric");
        } else {
            setUnits("imperial");
        }
    }

    let units:number;
    if(getUnits() === "metric") units = 0;
    else units = 1;

    return (
        <div className="unitMenu">
            <Menu list={["Celsius", "Fahrenheit"]} handler={handler} selected={units}>
            </Menu>
        </div>
    );
}

export default UnitMenu;