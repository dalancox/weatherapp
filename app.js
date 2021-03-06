window.addEventListener('load', ()=> {
    let lon;
    let lat;

    //grabbing html elements

    let location = document.querySelector(".location");
    let temperature = document.querySelector(".temp-degree");
    let weatherDescription = document.querySelector(".weather-description");
    let displayIcon = document.querySelector(".icon");
    let degreeSection = document.querySelector(".degree-section");
    const convertDegrees = document.querySelector(".degree-section span");


    // if statement get current postion of user

    if(navigator.geolocation){
        // navigator grabs user location and puts it into variables
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            
            //grabbing the open weather api 
            //using proxy for local development                       
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e430828eaa2a466ac69e449d7b72800b`;
            console.log(api);
 

            //using fetch to get api from server

            fetch(api)
                .then(data => {
                    //putting data in a json format
                    return data.json();
                })
                    .then(data => {
                        //grapping the data and putting it into my variables
                        console.log(data.timezone);
                        let temp = data.main.temp;
                        console.log(temp);
                        let cityName = data.name;
                        console.log(cityName);
                        let description = data.weather[0].description;
                        console.log(description);
                        let country = data.sys.country;
                        console.log(country);
                        let icon = data.weather[0].icon;
                        console.log(icon);

                        const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

                        function convertFahrenheit() {
                            temp = (temp - 273.15) * 9/5 + 32;
                            console.log(temp);
                        }


                        //convert temp into fahrenheit by default
                        convertFahrenheit();

                        //fomula for celsius 
                        let celsius = (temp - 32) * 5/9;

                        //event listener for changing from F to C
                        degreeSection.addEventListener('click', ()=> {
                            if(convertDegrees.textContent === 'F') {
                                convertDegrees.textContent = 'C';
                                temperature.textContent = Math.floor(celsius);

                            } else {
                                convertDegrees.textContent = 'F';
                                temperature.textContent = Math.floor(temp);
                            
                            }

                        })

                        //assigning DOM elements to the API 
                        weatherDescription.textContent = `${description}`;
                        temperature.textContent = Math.floor(temp);
                        location.textContent = `${cityName}, ${country}`;
                        displayIcon.src = iconUrl;

                        //grabbing local timezone of user

                        timezone = data.timezone;
                        var d = new Date((new Date().getTime())-25200*1000);

                        //d.toISOString();

                        console.log(d);
                    })

        });
    }else {
        //error message if geolocation doesn't work

    }
});


