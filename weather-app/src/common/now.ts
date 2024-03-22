
async function rawWeather(place:string, units:string) {
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?appid=7b38e8c5a03a1636803ff7e9127b7b69&units=" + units + "&q=" + place);
    if(response.status != 200 || !response.ok) {
        return null;
    }

    let data = await response.json();
    return data;
}

/*
 * now(): returns the weather conditions for a given place
 * Parameter: place - city or zip code
 * Returns: JSON object
 */

export async function now(place:string, units:string) {
    let object:any = {};
    let raw:any = await rawWeather(place, units);

    if(raw == null) return null;

    object.place = raw.name;
    object.condition = raw.weather[0].main;
    object.time = raw.dt;
    object.timezone = raw.timezone;
    object.temp = raw.main.temp;
    object.feels = raw.main.feels_like;
    object.low = raw.main.temp_min;
    object.high = raw.main.temp_max;
    object.pressure = raw.main.pressure;
    object.wind = raw.wind.speed;
    object.gust = raw.wind.gust;

    return object;
}
