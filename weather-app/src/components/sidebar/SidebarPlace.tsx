import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import { now } from '../../common/now.ts';
import { isLoading, getConditions } from '../../common/locations.ts';

function SidebarPlace(props:any) {
    /*useEffect(() => {
        updateConditions();
    }, []);

    let updateConditions = async () => {
        setLoading(true);
        setConditions(await now(props.place, "imperial"));
        setLoading(false);
    };*/

    let conditions = getConditions(props.id);

    if(isLoading() || conditions == null) {
        return (
            <div className={props.active ? "active" : ""} onClick={() => props.clickHandler(props.id)}>
                <div>
                    {/* left flexbox */}
                    <h2>{props.place}</h2>
                    <h3>--:--</h3>
                    <h4>--</h4>
                </div>

                <div>
                    {/* right */}
                    <h1>&ndash;</h1>
                </div>
            </div>
        );
    } else {
        return (
            <div className={props.active ? "active" : ""} onClick={() => props.clickHandler(props.id)}>
                <div>
                    {/* left flexbox */}
                    <h2>{props.place}</h2>
                    <h3>--:--</h3>
                    <h4>{getConditions(props.id).condition}</h4>
                </div>

                <div>
                    {/* right */}
                    <h1>{Math.round(getConditions(props.id).temp)}&deg;</h1>
                </div>
            </div>
        );
    }
}

export default SidebarPlace;
