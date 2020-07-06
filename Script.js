var button=document.querySelector('.button')
var inputValue=document.querySelector('inputValue')
var name=document.querySelector('.name');
var desc=document.querySelector('.desc');
var temp=document.querySelector('.temp');

button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+
    '&appid=d8670830c78ec21b5bb611388f0b0cf4')
.then(response => response.json())
.then(data => {
    var nameValue= data ['name'];
    var tempValue= data ['main']['temp'];
    var descValue= data ['weather'][0]['description'];
}

name.innerHTML =nameValue; 
temp.innerHTML =tempValue; 
desc.innnerHTML=descValue; 

.catch(err => alert("Wrong city name!"))
})

'use strict';

var getFutureDate = function (day) {
	var someDate = new Date();
	var numberOfDaysToAdd = day;
	someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

	var dd = someDate.getDate();
	var mm = someDate.getMonth();
	var y = someDate.getFullYear();
	var d = someDate.getDay();

	var month = new Array();
	month[0] = 'January';
	month[1] = 'February';
	month[2] = 'March';
	month[3] = 'April';
	month[4] = 'May';
	month[5] = 'June';
	month[6] = 'July';
	month[7] = 'August';
	month[8] = 'September';
	month[9] = 'October';
	month[10] = 'November';
	month[11] = 'December';


	var day = new Array();
	day[1] = 'Monday';
	day[2] = 'Tuesday';
	day[3] = 'Wednesday';
	day[4] = 'Thursday'; 
	day[5] = 'Friday';
	day[6] = 'Saturday';
	day[0] = 'Sunday';

	var futureMonth = month[mm];
	var futureDay = day[d];

	var someFormattedDate = futureDay + ", " + futureMonth + ' '+ dd + ', '+ y;

	return someFormattedDate;
}

var getClouds = function(clouds) {
	if ( 100 < clouds && clouds < 90 ) {
	
		var condition = {
			cloudNumber: 6,
			cloudText: 'Cloudy'
		};
		return condition;
	} else if ( 89 < clouds && clouds < 60 ) {
	
		var condition = {
			cloudNumber: 5,
			cloudText: 'Mostly Cloudy'
		};
		return condition;
	} else if ( 59 < clouds && clouds < 30 ) {
	
		var condition = {
			cloudNumber: 4,
			cloudText:'Partly Cloudy'
		};
	} else if (29 < clouds && clouds > 20) {
	
		var condition =  {
			cloudNumber: 3,
			cloudText: 'Mostly Sunny'
		};
		return condition;
	} else if ( 19 > clouds && clouds > 10 ) {
	
		var condition = {
			cloudNumber: 2,
			cloudText: 'Sunny to Mostly Sunny'
		};
		return condition;
	} else {
		
		var condition = {
			cloudNumber: 1,
			cloudText: 'Sunny'
		};
		return condition;
	}
}


var getWeather = function(theForecast) {
	
	$('#results').html(theForecast.city.name);

	var source = $('#weather-spot').html();
	
	var template = Handlebars.compile(source);

	
	for (var i = 1 ; i < theForecast.list.length; i++) {
		
		var futureDate = getFutureDate(i);
		var cloudsCondition = getClouds(theForecast.list[i].clouds);
		

		var weatherData = {
			now: futureDate,
			average: Math.round(theForecast.list[i].temp.day),
			high: Math.round(theForecast.list[i].temp.max),
			low: Math.round(theForecast.list[i].temp.min),
			morning: Math.round(theForecast.list[i].temp.morn),
			nighttime: Math.round(theForecast.list[i].temp.night),
			cloudInfo: cloudsCondition.cloudNumber,
			cloudInfoText: cloudsCondition.cloudText
		}
		

		$('.container').append(fullText);
	}
};


var APICall = function(theCity) {

	var weatherUrl = "//api.openweathermap.org/data/2.5/forecast/daily?q=" + theCity;
	
	var apiKey = "d8670830c78ec21b5bb611388f0b0cf4";
	
	var unitType = "imperial";
	
	var daysTotal = 8;

	$.get({
		url: weatherUrl + "&APPID=" + apiKey + "&units=" + unitType + "&cnt=" + daysTotal,
		success: function(objectFromOWM){
			getWeather(objectFromOWM);
		},
		error: function(){
			console.log("error");
		}
	});

};


$('#getWeather').on('click', function(e){

	
	e.preventDefault();
	
	if( $('#city-name').val().trim() === "" || $('#city-name').val().trim() === null ) {
		
		return;
	} else {
	
		$('.section').remove();

		var cityName = $('#city-name').val().trim();
		$('#city-name').val("");
		APICall(cityName);
	}
});
}