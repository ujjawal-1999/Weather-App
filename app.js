window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone'); 
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');
    let humid = document.querySelector('.humidity');
    let visible = document.querySelector('.visibility');
    let dew = document.querySelector('.dewPoint');
    let cloud = document.querySelector('.cloudCover');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api =`${proxy}https://api.darksky.net/forecast/84d409672e1419aa360ec2c83a759a17/${lat},${long}`;
            fetch(api)
                .then(response =>{
                    return response.json();
            })
                .then(data =>{
                    console.log(data);
                    const {temperature,summary, icon,humidity, visibility, dewPoint, cloudCover} = data.currently;
                    //Set DOM elements from api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    visible.textContent = `Visibility:- ${visibility}`;
                    humid.textContent = `Humidity:- ${humidity}`;
                    dew.textContent = `Dew Point:- ${dewPoint}`;
                    cloud.textContent = `Cloud Cover:- ${cloudCover}`;
                    let celsius = (temperature-32) * (5 / 9);
                    //Set Icons
                    setIcons(icon, document.querySelector('.icon'));
                    
                    temperatureSection.addEventListener('click',() =>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureDegree.textContent = Math.floor(celsius);
                            temperatureSpan.textContent = "C";
                        }
                        else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })


            });
        });
    }

    function setIcons(icon, iconId){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});