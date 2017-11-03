function PizzaBuild (size, cheese, vegies, meats){
  this.size = size;
  this.cheese = cheese;
  this.vegies = vegies;
  this.meats = meats;
  this.cheeseImg = getCheese(cheese);
  this.vegiesImgs = getImages(this.vegies);
  this.meatsImgs = getImages(meats);
}

function getCheese(cheese){
  if (cheese && cheese !== "noCheese") {
    return cheese + ".png";
  }
}
function getImages(toppings){
  console.log(toppings);
  var imgArr = [];
  toppings.forEach(function(topping){
    imgArr.push(topping + ".png");
    console.log(topping);
  });
  return imgArr;
}
var basePriceSet = {
  "small": 9,
  "medium": 11,
  "large": 13,
  "extraLarge": 15,
};
var cheesePriceSet = {
  "noCheese": 0,
  "regCheese": 2,
  "xCheese": 3,
};

PizzaBuild.prototype.price = function(){
  var basePrice = basePriceSet[this.size],
      cheesePrice = cheesePriceSet[this.cheese],
      vegiesPrice = this.vegies.length,
      meatPrice = this.meats.length * 2.5;

  return basePrice + cheesePrice + vegiesPrice + meatPrice;
}

PizzaBuild.prototype.addToCart = function(){

}



$(function(){
  $('#pizza-builder').submit(function(event){
    event.preventDefault();
    var selectedSize = $('input[name=size]:checked').val();
    var selectedCheese = $('input[name=cheese]:checked').val();
    var selectedVegies = [];
    var selectedMeats = [];
    var thisPizza = new PizzaBuild(selectedSize, selectedCheese, selectedVegies, selectedMeats);
    var thisPrice = thisPizza.price()

    $('input[name=vegies]:checked').each(function(){
      selectedVegies.push($(this).val());
    });
    $('input[name=meats]:checked').each(function(){
      selectedMeats.push($(this).val());
    });
    console.log(thisPizza);
  });
});
