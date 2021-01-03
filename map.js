// Need to make the map dynamic and hardcode a nearby search with google Places to find blood banks

let map;
let places;
let autocomplete;
let cityLatLng;
// try to make restrict the search to the USA
const countryRestrict = { country: "us" };
const countries = {
    us: {
        center: { lat: 37.1, lng: -95.7 },
        zoom: 3,
    },
}
//try to make it dynamic and restricted to the US. Kept the zoom and center; added more controls
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: countries["us"].zoom,
        center: countries["us"].center,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
    })
    // Info windows will shows the list of results from the search
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("info-content"),
    });
    // auto complete for the search box to help the user complete their cities search
    autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
        { 
            //limit to cities, for now
            types: ["(cities)"],
            
        }
    );

    

}
// more controls maybe more dynamic
// enter a city name and it will zoom in on the inputted city
function userSelectCity() {
    const place = autocomplete.getPlace();
      
    if (place.geometry) {
        cityLatLng = place.geometry.location;
        map.panTo(place.geometry.location);
        map.setZoom(15);
        const service = new google.maps.places.PlacesService(map);
        // Perform a nearby search with search parameters; user location and bloodbanks
        service.nearbySearch(
        {location: cityLatLng, radius: 80467.2, type: "hospital", keyword: "blood_donation", setting: "open now"},
        (results, status, pagination) => {
            console.log(results)
            if (status !== "OK") return;
            createMarkers(results, map);
        }
    );
    } 
        else {
            document.getElementById("autocomplete").placeholder = "Enter a city";
        }
}
// Markers on the Map: click responsive
function createMarkers(results, map) {
   
    for(let i = 0; i < results.length; i++){
        let infoWindowContent = `<div>
        ${results[i].name} ${results[i].vicinity} ${results[i].opening_hours}</div>`
        let infoWindow = new google.maps.InfoWindow({
            content:infoWindowContent
        });
        
        let place = results[i]
            let marker = new google.maps.Marker({
                map,
                title: place.name,
                position: place.geometry.location,
            });
          
    
            marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });  
    }
       
}  
            