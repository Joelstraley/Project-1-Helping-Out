$(document).ready(function(){

if (localStorage.getItem("Favorites")){
   var savedFavorites = JSON.parse(localStorage.getItem("Favorites"))
   var favContainer = document.querySelector(".favContainer")
   for (var i = 0; i < savedFavorites.length; i++){
       console.log(savedFavorites[i])
    favContainer.innerHTML += `
    <div class="favBox favBox1">
        <section>
            <p class="Favorites Info">${savedFavorites[i].name}</p>
            <p class="Favorites Info">${savedFavorites[i].classification ? savedFavorites[i].classification : " "}</p>
            <p class="Favorites Info">${savedFavorites[i].address}</p>
        </section>
    </div>`
} 
} else { 
    var favContainer = document.querySelector(".favContainer")
    favContainer.innerHTML += `<div class="favBox favBox1">
    <section> 
        <p>You currently have no favorites saved</p>
    </section>
    </div>`
} 


});