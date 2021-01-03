// Need to make the map dynamic 


let map;
//try to put result makers on
let infowindow;
let autocomplete;
let marker= [];

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

    //google places API trying to do nearby search hardcode attempt at type:hospitals and keyword:Bloodbanks : no search bar yet or results for blood bank yet

//     const service = new google.maps.places.PlacesService(map);
//     service.nearbySearch({location: sanFran, radius: 16093.4, type: "hospital", keyword: "bloodbank", setting: "open now"},function (results, status, pagination){
//         console.log(results)
//         for(let i = 0; i < results.length; i++){
//             let place = results[i]
//             // result markers
//             new google.maps.Marker({
//                 map,
//                     title: place.name,
//                     position: place.geometry.location,
//                 });
//         }
//     })
// } 
// more controls maybe more dynamic?
function userSelectCity() {
    const place = autocomplete.getPlace();
      
    if (place.geometry) {
        cityLatLng = place.geometry.location;
        map.panTo(place.geometry.location);
        map.setZoom(15);
        
    
    }
}
            