const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"],
        photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];
let container = document.getElementById("container");
let getCities = function (cities) {
    let city = "";
    for (let i = 0;i < cities.length;i++){
        city = city +"<ul>"+ cities[i]+"</ul>";
    }
    return city;
}
let getPhotos = function(photos){
    let photo = "";
    for (let j = 0;j < photos.length;j++){
        //let photoSrc = '"'+photos[j]+;
        photo = photo + "<img  class='photo' "+"src="+ "'"+"images/"+photos[j] +"'"+">"
    }
    return photo;
}


// language=HTML
let getItems = function(contries){
    let  itemContect = "";
    for (let k = 0; k <contries.length; k++){
        itemContect +=
        "<div class='item'class='justify'>"
        +"<h2>"+countries[k].name +"</h2>"
        +"<p>"+countries[k].continent+"</p>"
        +"<div class='inner-box' class='justify'>"
        +"<h3>Cities</h3>"
        + getCities(countries[k].cities)
        +"</div> "
        +"<div class='inner-box'>"
        +"<h3>Popular Photos</h3>"
        + getPhotos(countries[k].photos)
        +"</div>"
        +"<button>Visit</button>"
        +"</div>";
        }
    return itemContect;
}
container.innerHTML = getItems(countries);
