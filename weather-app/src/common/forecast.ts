
async function rawForecast(place:string, units:string) {
    let response = await fetch("https://api.openweathermap.org/data/2.5/forecast?appid=7b38e8c5a03a1636803ff7e9127b7b69&units=" + units + "&q=" + place);
    if(response.status != 200 || !response.ok) {
        return null;
    }

    let data = await response.json();
    return data;
}

/* HELPER FUNCTIONS */
function forecastDate(raw:any, day:number) {
    let date:string = "";
    let current:number = 0;
    let localDate;

    for(let i = 0; i < raw.list.length; i++) {
        localDate = new Date(raw.list[i].dt_txt + " UTC");
        //localDate.setUTCDate(raw.list[i].dt_txt);
        localDate.setUTCHours(localDate.getUTCHours() + (raw.city.timezone/3600));

        //console.log("converted " + raw.list[i].dt_txt + " to " + localDate.toISOString() + " for " + raw.city.name);

        raw.list[i].local_time = localDate.toUTCString().slice(0, 10);

        //if(raw.list[i].dt_txt.slice(0, 10) != date) {
        if(raw.list[i].local_time != date) {
            current++;
            date = raw.list[i].local_time;

            if(current > day) return i;
        }
    }

    return 0;
}

function getLow(raw:any, n:number) {
    let start:number = forecastDate(raw, n);
    let lowest:number = 5000;

    for(let i = start; i < start+8; i++) {
        if(raw.list[i].main.temp < lowest) {
            lowest = raw.list[i].main.temp;
        }
    }

    return lowest;
}

function getHigh(raw:any, n:number) {
    let start:number = forecastDate(raw, n);
    let highest:number = -5000;

    for(let i = start; i < start+8; i++) {
        if(raw.list[i].main.temp > highest) {
            highest = raw.list[i].main.temp;
        }
    }

    return highest;
}

/*
 * forecast(): returns the weather forecast for a given place
 * Parameter: place - city or zip code
 * Returns: JSON object
 */

export async function forecast(place:string, units:string) {
    let object:any = {};
    let raw:any = await rawForecast(place, units);

    if(raw == null) return null;

    object.place = raw.city.name;
    object.forecast = [];
    
    for(let i = 0; i < 5; i++) {
        let entry:any = {};

        entry.low = getLow(raw, i);
        entry.high = getHigh(raw, i);

        object.forecast.push(entry);
    }

    return object;
}
