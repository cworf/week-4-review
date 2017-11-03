function PizzaBuild (size, cheese, vegies, meat){
  this.size = size;
  this.cheese = cheese;
  this.vegies = vegies;
  this.meat = meat;
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
  var basePrice = basePriceSet[this.size];
  var cheesePrice = cheesePriceSet[this.cheese];
  var vegiesPrice = this.vegies.length;
  var meatPrice = this.meat.length * 2.5;

  return basePrice + cheesePrice + vegiesPrice + meatPrice;
}





$(function(){
  $('#pizza-builder').submit(function(event){
    event.preventDefault();
    var selectedSize = $('input[name=size]:checked').val();
    var selectedCheese = $('input[name=cheese]:checked').val();
    var selectedVegies = [];
    var selectedMeat = [];
    var thisPizza = new PizzaBuild(selectedSize, selectedCheese, selectedVegies, selectedMeat);
    var thisPrice = thisPizza.price()

    $('input[name=vegies]:checked').each(function(){
      selectedVegies.push($(this).val());
    });
    $('input[name=meats]:checked').each(function(){
      selectedMeat.push($(this).val());
    });

    console.log(thisPizza);
    console.log(thisPrice);
  });
});
