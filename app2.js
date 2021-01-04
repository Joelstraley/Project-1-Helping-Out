$(document).ready(function(){
    // step 1: use maps javascript to create a basic map using the latitude and longitude coordinates for which ever location in order to test whether the map zeros into the location. the let variable MUST be changed depending on the location in oder to best track which static location we are performing the test on.  
    let infoWindow;
    let autocomplete;
    let marker= [];
    let charitiesApi= [];
    let charityGeoCodeResults = []; 
    let mapContainer = document.getElementById("map");
    //*  CHARITY NAVIGATOR 
    var cnAPIID = "29acb795";
    var cnAPIKEY = "04b276e51b8c538e2a38bb533518a83d";
    var navigatorURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + cnAPIID + "&app_key=" + cnAPIKEY; 
/*   function runQuery(cnURL){
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
   // let map;
    const sanFran= { lat: 37.7576171, lng: -122.5776844 }
    function initMap() {
        map = new google.maps.Map($("#map"), {
            center: sanFran,
            zoom: 10,
        });
        // Info windows will shows the list of results from the search
        infoWindow = new google.maps.InfoWindow({
            content: $("#info-content"),
        });
        // for the search box to help the user complete their cities search
        autocomplete = new google.maps.places.Autocomplete(
        $("#autocomplete"),
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
 */
    function getZipBlood() {

        $(".asidestyle").css("display","none")
        $("#bloodButton").css("display","none")
        $("#foodButton").css("display","none")
        $("#timeButton").css("display","none")
        $("#modalBox").css("display", "grid")
        $("#modalBox").html(`<div class="ui three column grid container middleContainer" >
        <div class="column"></div>
        <div class="column">
        <div class="ui action input">
        <input type="text" placeholder="Enter city..." id="autocomplete">
        <button class="ui icon button mainSearchBtns" id="bloodSearchBtn">
          <i class="search icon"></i>
        </button>
      </div>
      
      </div>`) 
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),{
          types: ["(cities)"],
          componentRestrictions: countryRestrict,
        }
    );
    console.log(autocomplete)
    places = new google.maps.places.PlacesService(map);
        autocomplete.addListener("place_changed", userSelectCity);

            //change to "Enter City" above if we go with City search for Blood banks
        //  $("#bloodSearchBtn").on('click', function(event){
        //         searchInput = $("#bloodZipInput").val();
        //             var cnBloodURL = navigatorURL + "&zip=" + searchInput;
        //             runQueryBlood(cnBloodURL);
        //         });           
    }
    function getZipFood() {
        $(".asidestyle").css("display","none")
        $("#bloodButton").css("display","none")
        $("#foodButton").css("display","none")
        $("#timeButton").css("display","none")
        $("#modalBox").css("display", "grid")
        $("#modalBox").html(`<div class="ui three column grid container">
        <div class="column"></div>
        <div class="column">
        <div class="ui action input">
        <input type="text" placeholder="Enter Zip code..." id="foodZipInput">
        <button class="ui icon button mainSearchBtns" id="foodSearchBtn">
          <i class="search icon"></i>
        </button>
      </div>
      </div>`)
        $("#foodSearchBtn").on('click', function(event){
                searchInput = $("#foodZipInput").val();
                    var cnFoodURL = navigatorURL + "&search=food" + "&zip=" + searchInput;
                    runQueryFood(cnFoodURL);
                });
    } 
    function getZipTime() {
        $(".asidestyle").css("display","none")
        $("#bloodButton").css("display","none")
        $("#foodButton").css("display","none")
        $("#timeButton").css("display","none")
        $("#modalBox").css("display", "grid")
        $("#modalBox").html(`
        <div class="ui three column grid container">
        <div class="column"></div>
        <div class="column">
        <div class="ui action input">
        <input type="text" placeholder="Enter Zip Code..." id="autocomplete">
        <button class="ui icon button mainSearchBtns" id="timeSearchBtn">
          <i class="search icon"></i>
        </button>
      </div>
      </div>`)
        $("#timeSearchBtn").on('click', function(event){
            searchInput = $("#timeZipInput").val();
            var cnTimeURL = navigatorURL + "&search=social" + "&zip=" + searchInput;
                    runQueryTime(cnTimeURL);
        });
    };
    
            
        
    //     // $.ajax({url: cnBloodURL,
    //     method: "GET"})
    //     .then(function(cnBloodData){
    //          // Comment to keep Zip Code box 
    //          //document.querySelector('#modalBox').innerHTML = "";
    //          var maxCount;
    //          if (cnBloodData.length > 5) {
    //              maxCount = 5;
         

    //          }
    //          else{
    //              maxCount = cnBloodData.length;
    //             }
         
    //         for (let i= 0; i < maxCount; i++) {
            
    //             if(!cnBloodData[i].mailingAddress.streetAddress1.includes('PO')){    
    //                 bloodResultsModal(cnBloodData[i]);
    //                 var geoCodeURL = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyCDhdaVqsZrmCYF70GkdpO_GH4y0DGhYqE&address='
    //                 var address= cnBloodData[i].mailingAddress.streetAddress1 + "," + cnBloodData[i].mailingAddress.city + "," + cnBloodData[i].mailingAddress.stateOrProvince + "," + cnBloodData[i].mailingAddress.postalCode;
                    
    //                 var charitiesGeoCode=  geoCodeURL + address;
    //                 $.ajax({url: charitiesGeoCode,
    //                 method: "GET"})
    //                 .then(function(geoLocation) {
    //                     console.log(geoLocation)
    //                     map.panTo(geoLocation.results[0].geometry.location);
    //                     map.setZoom(15);
    //                     new google.maps.Marker({
    //                         map,
    //                         position: geoLocation.results[0].geometry.location,
    //                     })
    //                 });
    //             } 
    //         } document.querySelector('#modalBox').append(mapContainer);
    //     });
                       
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
                var maxCountBlood;
             if (results.length > 5) {
                 maxCountBlood = 5;
         

             }
             else{
                 maxCountBlood = results.length;
                }
                $("#modalBox").css("display", "flex")
                $(".middleContainer").css("display","none")
                var resultsContainer= document.createElement("div")
                resultsContainer.id= "resultsContainer"
                document.querySelector('#modalBox').append(resultsContainer)
                for (var i=0;i<maxCountBlood; i++) {
                    resultsContainer.innerHTML += `
                    <div class="scrolling content">
                    <div class="box like">
                    <button><i class="fas fa-heart"></i></button>
                    <div><h2 id="charityname">${results[i].name}</h2></div> </div>
                    <p>Street Address:${results[i].vicinity}</p>
                    </div>`;
                    $('#modalBox').css("text-align","center")
                    let infoWindowContent = `<div>
                    <p>${results[i].name}</p> 
                    <p>${results[i].vicinity}</p></div>`
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

                document.querySelector('#modalBox').prepend(mapContainer)
                if (status !== "OK") return;
                
                
    
                
                
            
            }
        );
        } 
        else {
        document.getElementById("autocomplete").placeholder = "Enter a city";
        }
        
    }


function bloodResultsModal(cnBloodData){
        document.querySelector('#modalBox').innerHTML += `
        <div class="scrolling content">
        <div class="box like">
        <button><i class="fas fa-heart"></i></button>
   <div><h2 id="charityname">${cnBloodData.charityName}</h2></div> </div>
          <p>${cnBloodData.irsClassification.nteeClassification}</p>
          <p>Street Address: ${cnBloodData.mailingAddress.streetAddress1}</p>
          </div>`;
          $('#modalBox').css("text-align","center")
    }
    function runQueryFood(cnFoodURL){
        $.ajax({url: cnFoodURL,
        method: "GET"})
        .then(function(cnFoodData){
             // Comment to keep Zip Code box 
             //document.querySelector('#modalBox').innerHTML = "";
            for (let i= 0; i < 5; i++) {
                if(!cnFoodData[i].mailingAddress.streetAddress1.includes('PO')){
                    charitiesApi.push(cnFoodData[i])
                    foodResultsModal(cnFoodData[i]); 
                } 
            } 
        });
    }
function foodResultsModal(cnFoodData){
    document.querySelector('#modalBox').innerHTML += `
    <div class="scrolling content">
    <div class="box like">
    <button><i class="fas fa-heart" id="charitySave"></i></button>
</div><h2 id="charityname">${cnFoodData.charityName}</h2></div></div>
      <p>${cnFoodData.irsClassification.nteeClassification}</p>
      <p>Street Address: ${cnFoodData.mailingAddress.streetAddress1}</p>
    </div>`
    $('#modalBox').css("text-align","center")
}
function runQueryTime(cnTimeURL){
    $.ajax({url: cnTimeURL,
    method: "GET"})
    .then(function(cnTimeData){
         // Comment to keep Zip Code box 
         //document.querySelector('#modalBox').innerHTML = "";
        for (let i= 0; i < 5; i++) {
            if(!cnTimeData[i].mailingAddress.streetAddress1.includes('PO')){
                charitiesApi.push(cnTimeData[i])
                timeResultsModal(cnTimeData[i]); 
            } 
        } 
    });
}            
function timeResultsModal(cnTimeData){
    document.querySelector('#modalBox').innerHTML += `
    <div class="scrolling content">
    <div class="box like">
    <button><i class="fas fa-heart"></i></button>
</div><h2 id="charityname">${cnTimeData.charityName}</h2>
</div>
</div>
      <p>${cnTimeData.irsClassification.nteeClassification}</p>
      <p>Street Address: ${cnTimeData.mailingAddress.streetAddress1}</p>
    </div>`
    $('#modalBox').css("text-align","center")
}
            /* var geoCodeURL = 'https://maps.google.com/maps/api/geocode/json?key=&address='
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
                new google.maps.Marker({
                    map,
                    ///title// 
                    position: place.geometry.location,
                });
            } */ 
    $('.burger').on('click', function() {
        $(this).toggleClass('active');
        $('.overlay').toggleClass('burger-open');
    });
    $('nav a').on('click', function() {
        $('.burger').removeClass('active');
        $('.overlay').removeClass('burger-open');
    });
    $("#bloodButton").on("click",getZipBlood);
    $("#foodButton").on("click", getZipFood);
    $("#timeButton").on("click", getZipTime);
});