var cartTotal = 0;
var cartNumber = 0;
function Pizza (size, cheese, veggies, meats){
  this.size = size;
  this.cheese = cheese;
  this.veggies = veggies;
  this.meats = meats;
  this.cheeseImg = getImages(cheese);
  this.veggiesImgs = getImages(veggies);
  this.meatsImgs = getImages(meats);
}

Pizza.prototype.price = function(){
  var basePrice = basePriceSet[this.size],
      cheesePrice = cheesePriceSet[this.cheese],
      veggiesPrice = this.veggies.length,
      meatPrice = this.meats.length * 2.5;

  return basePrice + cheesePrice + veggiesPrice + meatPrice;
}

Pizza.prototype.cartItem = function(){
  cartTotal += this.price();
  cartNumber++;
  return `
  <div class='cart-item'>
    <div class='pizza-header'>
      <img src='img/crust.png'>` + this.cheeseImg +
      this.meatsImgs.join("") +
      this.veggiesImgs.join("") + `
    </div>
    <div class="pizza-price">
      $` + this.price() + `
    </div>
    <div class="pizza-info">
      <div id="accordion" role="tablist">
        <div class="card">
          <div class="card-header" role="tab" id="cheeseHeading">
            <h5 class="mb-0">
              <a data-toggle="collapse" href="#collapseCheese">
                Cheese Selection
              </a>
            </h5>
          </div>

          <div id="collapseCheese" class="collapse show" role="tabpanel" data-parent="#accordion">
            <div class="card-body">
              ` + this.cheese + `
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" role="tab" id="meatHeading">
            <h5 class="mb-0">
              <a class="collapsed" data-toggle="collapse" href="#collapseMeat">
                Meat Selections
              </a>
            </h5>
          </div>
          <div id="collapseMeat" class="collapse" role="tabpanel" data-parent="#accordion">
            <div class="card-body">
              <ul>
                <li>` + this.meats.join("</li><li>") + `</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" role="tab" id="veggieHeading">
            <h5 class="mb-0">
              <a class="collapsed" data-toggle="collapse" href="#collapseVeggie">
                Veggie Selections
              </a>
            </h5>
          </div>
          <div id="collapseVeggie" class="collapse" role="tabpanel" data-parent="#accordion">
            <div class="card-body">
              <ul>
                <li>` + this.veggies.join("</li><li>") + `</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
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
  $('#pizza-builder').change(function(){
    // event.preventDefault();
    var selectedSize = $('input[name=size]:checked').val();
    var selectedCheese = $('input[name=cheese]:checked').val();
    var selectedVeggies = [];
    var selectedMeats = [];

    $('input[name=veggies]:checked').each(function(){
      selectedVeggies.push($(this).val());
    });
    $('input[name=meats]:checked').each(function(){
      selectedMeats.push($(this).val());
    });
    var thisPizza = new Pizza(selectedSize, selectedCheese, selectedVeggies, selectedMeats);
    var thisPrice = thisPizza.price();
    console.log(thisPizza);
  });
});
