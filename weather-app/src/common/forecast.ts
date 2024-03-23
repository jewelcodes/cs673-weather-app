
async function rawForecast(place:string, units:string) {
    let response = await fetch("https://api.openweathermap.org/data/2.5/forecast?appid=7b38e8c5a03a1636803ff7e9127b7b69&units=" + units + "&q=" + place);
    if(response.status != 200 || !response.ok) {
        return null;
    }

    let data = await response.json();
    return data;
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
    
    for(let i = 0; i < raw.list.length; i++) {
        let entry:any = {};
        entry.time = raw.list[i].dt;
        entry.low = raw.list[i].main.temp_min;
        entry.high = raw.list[i].main.temp_max;
        entry.condition = raw.list[i].weather[0].main;

        object.forecast.push(entry);
    }

    return object;
}
