window.addEventListener('load', () => {
    let lon;
    let lat;
    let currentLocation = document.querySelector('.cur-location');
    let degree = document.querySelector('.degree');
    let condition = document.querySelector('.condition');
    let currentHumidity = document.querySelector('.humidity');
    let newWeather = document.querySelector('#new-weather-container');


    let input = document.querySelector('#input');
    const button = document.querySelector('.search-btn');
    let errMessage = document.querySelector('#err-message');

 

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            const key = 'bb089c819255a670f079ed776a9016a3'

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    
                    const {temp, humidity} = data.main
                    const {description} = data.weather[0]
                    let tempCeil = Math.ceil(temp);
                    
                    currentLocation.textContent = data.name;
                    degree.textContent = tempCeil;
                    currentHumidity.textContent = 'Humidity: ' + humidity;
                    condition.textContent = description;
                    
                })
        })
    } else {
        currentLocation.textContent = 'PLease allow location services to see weather updates.'
    }

    button.addEventListener('click', () => {
        const key = 'bb089c819255a670f079ed776a9016a3';
        const api2 = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial&appid=${key}`;

        fetch(api2)
            .then(response => response.json())
            .then(data => {
                
                const {temp, humidity} = data.main;
                const {description} = data.weather[0];
                let tempCeil = Math.ceil(temp);
                let condition = description[0].toUpperCase() + description.slice(1);


                const newDiv = document.createElement('div');
                newDiv.classList.add('new-weather');
                
                newDiv.innerHTML += `<p>${data.name}</p>`;
                newDiv.innerHTML += `<h1>${tempCeil}</h1>`;
                newDiv.innerHTML += `<p>Humidity: ${humidity}</p>`;
                newDiv.innerHTML += `<p>${condition}</p>`;
                newWeather.appendChild(newDiv);
                

                input.value = '';
                errMessage.textContent = '';

            })

        .catch(err => errMessage.textContent = 'Please enter valid city name!' )
    })

})