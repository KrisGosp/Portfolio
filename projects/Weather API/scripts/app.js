const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const history = document.querySelector('.history-item');

const forecast = new Forecast();

const updateUI = (data) => {

    const cityDetails = data.cityDetails;
    const weather = data.weather;
    const isRaining = weather.HasPrecipitation ? 'Dry' : 'Raining'; 

    //update Details
    details.innerHTML = `<h3 class="my-3">${cityDetails.EnglishName}</h3>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="my-3"><h4>${isRaining}<h4/></div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg; C</span>
    </div>`;

    // update day/night images
    let iconSource = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSource);

    console.log(weather.WeatherIcon)

    let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSource);

    // remove d-none
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    };
};

const updateCity = async (city) => {
    const cityDetails = await forecast.getCity(city);
    const weather = await forecast.getWeather(cityDetails.Key);

    return {
        cityDetails,
        weather
    }
};

form.addEventListener('submit', e => {
    e.preventDefault();

    const location = form.city.value.trim();
    form.reset();

    //update UI
    updateCity(location)
        .then(data => {
            updateUI(data)
        })
        .catch(err => console.log(err));

        //set local storage
        localStorage.setItem('city', location);
});

if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
};