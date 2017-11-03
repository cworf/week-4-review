function PizzaBuild (size, cheese, vegies, meat){
  this.size = size;
  this.cheese = cheese;
  this.vegies = vegies;
  this.meat = meat;
};
var basePrice = {
  small: 9,
  medium: 11,
  large: 13,
  extraLarge : 15,
};
var cheesePrice = {
  noCheese: 0,
  regCheese: 2,
  xCheese: 3,
};





$(function(){
  $('#pizza-builder').submit(function(event){
    event.preventDefault();
    var selectedSize = $('input[name=size]:checked').val();
    var selectedCheese = $('input[name=cheese]:checked').val();
    var selectedVegies = [];
    var selectedMeat = [];

    $('input[name=vegies]:checked').each(function(){
      selectedVegies.push($(this).val());
    });
    $('input[name=meats]:checked').each(function(){
      selectedMeat.push($(this).val());
    });

    var thisPizza = new PizzaBuild(selectedSize, selectedCheese, selectedVegies, selectedMeat);
    console.log(thisPizza);
  });
});
