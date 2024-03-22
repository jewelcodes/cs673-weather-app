var Locations:string[] = ["Boston", "New York", "London"];
var CurrentLocation:number = 0;

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
