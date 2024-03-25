import React from 'react';
import './Search.css';
import {getPlaceCount, newPlace} from '../../common/locations.ts';

function Search(props:any) {
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        if(await newPlace(event.target.query.value) == true)
            props.handler(getPlaceCount()-1);
    };

    return (
        <div className="search">
            <form onSubmit={submit}>
                <input type="text" name="query" placeholder="Search" autocomplete="off" />
                <input type="submit" />
            </form>
        </div>
    );
}

export default Search;