import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import { now } from '../../common/now.ts';

function SidebarPlace(props:any) {
    let [loading, setLoading] = useState(true);
    let [conditions, setConditions] = useState(null);

    useEffect(() => {
        updateConditions();
    }, []);

    let updateConditions = async () => {
        setLoading(true);
        setConditions(await now(props.place, "imperial"));
        setLoading(false);
    };

    if(loading) {
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
                    <h4>{conditions.condition}</h4>
                </div>

                <div>
                    {/* right */}
                    <h1>{Math.round(conditions.temp)}&deg;</h1>
                </div>
            </div>
        );
    }
}

export default SidebarPlace;
