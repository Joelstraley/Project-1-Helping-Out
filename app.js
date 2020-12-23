$(document).ready(function(){


// step 1: use maps javascript to create a basic map using the latitude and longitude coordinates for which ever location in order to test whether the map zeros into the location. the let variable MUST be changed depending on the location in oder to best track which static location we are performing the test on.  

let infoWindow;
let autocomplete;
let marker= [];
let charitiesApi= [];
let charityGeoCodeResults = [];

var orgname = $('#orgname'); 

//*  CHARITY NAVIGATOR 
var cnAPIID = "29acb795";
var cnAPIKEY = "04b276e51b8c538e2a38bb533518a83d";
var navigatorURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + cnAPIID + "&app_key=" + cnAPIKEY; 
function runQuery(cnURL){
    $.ajax({url: cnURL,
    method: "GET"})
    .then(function(cnData){
        
        orgname.text(cnData[0].charityName);
        for (let i= 0; i < cnData.length; i++) {
            if(!cnData[i].mailingAddress.streetAddress1.includes('PO')){
                charitiesApi.push(cnData[i])
                
            }
        }
        var geoCodeURL = 'https://maps.google.com/maps/api/geocode/json?key=&address='
        for (let j= 0; j < 5; j++) {
            var address= charitiesApi[j].mailingAddress.streetAddress1 + "," + charitiesApi[j].mailingAddress.city + "," + charitiesApi[j].mailingAddress.stateOrProvince + "," + charitiesApi[j].mailingAddress.postalCode;
            var charitiesGeoCode=  geoCodeURL + address;
            $.ajax({url: charitiesGeoCode,
            method: "GET"})
            .then(function(geoLocation) {
                
                charityGeoCodeResults.push(geoLocation)
            });

        }
        console.log("hi", charityGeoCodeResults)
        for(let k = 0; k < charityGeoCodeResults.length; k++){
            let place = charityGeoCodeResults[k];
            console.log(place.geometry.location)
            new google.maps.Marker({
                map,
                ///title// 
                position: place.geometry.location,

            });
        }
        

    });


}


// Google map
let map;

const sanFran= { lat: 37.7576171, lng: -122.5776844 }
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: sanFran,
        zoom: 10,

    });
    // Info windows will shows the list of results from the search
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("info-content"),
    });
    // for the search box to help the user complete their cities search
    autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
        {
            types: ["(cities)"],
            componentRestrictions: countryRestrict,
        }
    );

    
   //static location search     
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({location: sanFran, radius: 16093.4, type: "hospital", keyword: "bloodbank", setting: "open now"},function (results, status, pagination){
        console.log(results)
        for(let i = 0; i < results.length; i++){
            let place = results[i]
            new google.maps.Marker({
                map,
                title: place.name,
                position: place.geometry.location,
            });
        }
    })
} 


function getZipFood() {
    $("#bloodButton").css("display","none")
    $("#foodButton").css("display","none")
    $("#timeButton").css("display","none")
    $(".footer").text(" ")
    $(".footer").css("padding","100px 1000px")
    $("#modalBox").css("display", "grid")
    $("#modalBox").html("")
    $("#modalBox").html(`<div class="ui action input" id="zipBox">
    <input type="text" placeholder="Enter Zip Code..." id="searchInput">
    <button class="ui button" id="searchBtn"><i class="inverted circular search link icon"></i></button>
  </div>`);
    
} 


function getZipBlood() {
    $("#bloodButton").css("display","none")
    $("#foodButton").css("display","none")
    $("#timeButton").css("display","none")
    $("#modalBox").css("display", "grid")
    $("#modalBox").html("")
    $("#modalBox").html("")
       
}


function getZipTime() {
    $("#bloodButton").css("display","none")
    $("#foodButton").css("display","none")
    $("#timeButton").css("display","none")
    $("#modalBox").css("display", "grid")
    $("#modalBox").html("")
    $("#modalBox").html("")
    
   
}


$('.burger').on('click', function() {
    $(this).toggleClass('active');
    $('.overlay').toggleClass('burger-open');
});


$('nav a').on('click', function() {
    $('.burger').removeClass('active');
    $('overlay').removeClass('burger-open');
});

$("#bloodButton").on("click",getZipBlood);
$("#foodButton").on("click", getZipFood);
$("#timeButton").on("click", getZipTime);


})


