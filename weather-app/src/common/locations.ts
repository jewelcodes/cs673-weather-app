import { now } from './now.ts';
import { forecast } from './forecast.ts';
import { updateWhile } from 'typescript';

var Locations:string[] = ["Boston", "Cairo", "Moscow", "Bangkok", "Seoul"];
var CurrentLocation:number = 0;
var Conditions:any[] = [];
var Forecast:any[] = [];
var Loading = true;
var Initial = true;
var lastUpdate = 0;
var Units = "imperial";

export function locations() {
    return Locations;
}

export function currentLocation() {
    return CurrentLocation;
}

export function setLocationIndex(n:number) {
    //console.log("setting to " + n);
    CurrentLocation = n;
}

export function isLoading() {
    return Loading;
}

export async function updateConditions() {
    if(Loading && !Initial) return;

    let elapsed = (Date.now()/1000) - lastUpdate;
    if(elapsed < 600) return;   // limit API requests to every 10 minutes

    console.log("updating weather");

    Loading = true;
    Initial = false;

    lastUpdate = Date.now()/1000;

    Conditions = [];
    Forecast = [];
    
    for(let i = 0; i < Locations.length; i++) {
        Conditions[i] = await now(Locations[i], Units);
        Forecast[i] = await forecast(Locations[i], Units);
    }

    Loading = false;
}

export function getConditions(n:number) {
    return Conditions[n];
}

export function getForecast(n:number) {
    return Forecast[n];
}

export function getUnits() {
    return Units;
}

export async function newPlace(query:string) {
    let condition = await now(query, Units);
    if(condition == null) return;

    Loading = true;

    let name = condition.place;     // in case the user-typed query wasn't accurate

    for(let i = 0; i < Locations.length; i++) {
        if(Locations[i] == name) {
            // avoid duplicates
            Loading = false;
            return false;
        }
    }

    let fc = await forecast(query, Units);
    if(condition == null) {
        Loading = false;
        return false;
    }

    Locations.push(name);
    Conditions.push(condition);
    Forecast.push(fc);
    CurrentLocation = Locations.length-1;

    Loading = false;
    return true;
}

export function getPlaceCount() {
    return Locations.length;
}

export function setUnits(u:string) {
    if(u === Units) return;
    
    console.log("changing units to " + u);
    Units = u;
    lastUpdate = 0;
    //updateConditions();
}
