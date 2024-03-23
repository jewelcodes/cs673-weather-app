import { now } from './now.ts';

var Locations:string[] = ["Boston", "Paris", "Cairo", "Tokyo" ];
var CurrentLocation:number = 0;
var Conditions:any[] = []
var Loading = true;
var Initial = true;
var lastUpdate = 0;

export function locations() {
    return Locations;
}

export function currentLocation() {
    return CurrentLocation;
}

export function setLocationIndex(n:number) {
    console.log("setting to " + n);
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
    
    for(let i = 0; i < Locations.length; i++) {
        Conditions[i] = await now(Locations[i], "metric");
    }

    Loading = false;
}

export function getConditions(n:number) {
    return Conditions[n];
}