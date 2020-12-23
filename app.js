/* main JS file */
$(document).ready(function(){

var orgname = $('#orgname'); 

//*  CHARITY NAVIGATOR 

var cnAPIID = "29acb795";
var cnAPIKEY = "04b276e51b8c538e2a38bb533518a83d";
var navigatorURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + cnAPIID + "&app_key=" + cnAPIKEY; 


/* function runQuery(cnURL){
    $.ajax({url: cnURL,
    method: "GET"})
    .then(function(cnData){
        console.log(cnData);
        orgname.text(cnData[0].charityName);
        ;
});
}

$("#searchBtn").on('click', function(){
    searchInput = $("#searchInput").val().trim();
        var cnURL = navigatorURL + "&zip=" + searchInput;
        console.log(cnURL);
        runQuery(cnURL);
    });

});  */


//ORG HUNTER: 


var oapiKey = "74f377d05678f8cb039e81aaaa6a9f9c";

var orghunterURL = "https://data.orghunter.com/v1/charitysearch?user_key=" + oapiKey;

function runQuery(ohURL){
    $.ajax({url: ohURL,
    method: "GET",
    mode: 'cors',
    credentials: 'include'})
    .then(function(ohData){
        console.log(ohData);
        orgname.text(ohData);
})
}

$("#searchBtn").on('click', function(){
    alert("test");
    searchInput = $("#searchInput").val().trim();
        var ohURL = orghunterURL + "&zipCode=" + searchInput;
        console.log(ohURL);
        runQuery(ohURL);
    });

}); 
