import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import { now } from '../../common/now.ts';
import { isLoading, getConditions } from '../../common/locations.ts';

function SidebarPlace(props:any) {
    let [conditions, setConditions] = useState(getConditions(props.id));
    let [time, setTime] = useState(conditions == null ? 0 : conditions.time);

    useEffect(() => {
        setConditions(getConditions(props.id));
        setTime(conditions == null ? 0 : conditions.time);
    });

    const timeString = (timezone:number) => {
        const date = new Date((Date.now()) + (timezone*1000));
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();

        let ampm = "AM";

        if(hours == 0) hours = 12;
        else if(hours == 12) ampm = "PM";
        else if(hours > 12) {
            ampm = "PM";
            hours -= 12;
        }

        return hours + ":" + minutes + " " + ampm;
    };

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
                    <h3>{timeString(getConditions(props.id).timezone)}</h3>
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
