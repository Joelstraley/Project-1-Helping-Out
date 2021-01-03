// Need to make the map dynamic and hardcode a nearby search with google Places to find blood banks
let map;
let places;
let autocomplete;
let cityLatLng;
const countryRestrict = { country: "us" };
const countries = {
    us: {
        center: { lat: 37.1, lng: -95.7 },
        zoom: 3,
    },
}
    

// Create the map that allows the user to pick a city (or potentially a zipcode).
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: countries["us"].zoom,
        center: countries["us"].center,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
    })
   
    // Create the autocomplete for the user search box
    // Restrict the search to the default country, and to place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),{
          types: ["(cities)"],
          componentRestrictions: countryRestrict,
        }
    );
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener("place_changed", userSelectCity);
    // Add a DOM event listener to react when the user selects a country.
    document
    .getElementById("country");
        
    

    
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
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

 



                
                    

                  