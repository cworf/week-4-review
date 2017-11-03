function Pizza (size, cheese, vegies, meats){
  this.size = size;
  this.cheese = cheese;
  this.vegies = vegies;
  this.meats = meats;
  this.cheeseImg = getImages(cheese);
  this.vegiesImgs = getImages(vegies);
  this.meatsImgs = getImages(meats);
}

Pizza.prototype.price = function(){
  var basePrice = basePriceSet[this.size],
      cheesePrice = cheesePriceSet[this.cheese],
      vegiesPrice = this.vegies.length,
      meatPrice = this.meats.length * 2.5;

  return basePrice + cheesePrice + vegiesPrice + meatPrice;
}

Pizza.prototype.CartItem = function(){
  var newItem = `

  `
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

function getImages(toppings){
  if (Array.isArray(toppings)) {
    var imgs = toppings.map(function(topping){
      return "<img src ='img/" + topping + ".png'>";
    });
    return imgs;
  } else if (toppings && toppings !== "noCheese") {
    return "<img src ='img/cheese.png'>";
  }

}

$(function(){
  $('#pizza-builder').submit(function(event){
    event.preventDefault();
    var selectedSize = $('input[name=size]:checked').val();
    var selectedCheese = $('input[name=cheese]:checked').val();
    var selectedVegies = [];
    var selectedMeats = [];

    $('input[name=vegies]:checked').each(function(){
      selectedVegies.push($(this).val());
    });
    $('input[name=meats]:checked').each(function(){
      selectedMeats.push($(this).val());
    });
    var thisPizza = new Pizza(selectedSize, selectedCheese, selectedVegies, selectedMeats);
    var thisPrice = thisPizza.price();
    console.log(thisPizza);
  });
});
