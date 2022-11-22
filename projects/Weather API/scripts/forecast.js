class Forecast{
    constructor(){
        this.key = 'TpUdCDrA7t6MZK4QCv65u4h1ecFPLHJy';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`
        const response = await fetch(this.cityURI + query)
        const data = await response.json();
        return data[0];
    }
};