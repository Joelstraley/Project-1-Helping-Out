//Start with a Static Search: trying to get the map the appear in one location: 


let map;
// start with hard coded latLng to sanfrancisco
const sanFran= { lat: 37.7576171, lng: -122.5776844 }
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: sanFran,
        zoom: 10,
        
    });
    // // Info windows will shows the list of results from the search
    // infoWindow = new google.maps.InfoWindow({
    //     content: document.getElementById("info-content"),
    // });
    // // for the search box to help the user complete their cities search
    // autocomplete = new google.maps.places.Autocomplete(
    // document.getElementById("autocomplete"),
    //     {
    //         types: ["(cities)"],
            
    //     }
    // );

                
    //google places API trying to do nearby search hardcode attempt at type:hospitals and keyword:Bloodbanks : no search bar yet or results for blood bank yet

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