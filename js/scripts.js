var cartTotal = 0;
var numberOfItems = 0;
var cartObjects = [];

function Pizza (size, cheese, veggies, meats){
  this.size = size;
  this.cheese = cheese;
  this.veggies = veggies;
  this.meats = meats;
  this.cheeseImg = getImages(cheese);
  this.veggiesImgs = getImages(veggies);
  this.meatsImgs = getImages(meats);
  this.pizzaPrice = this.price();
}

Pizza.prototype.price = function(){
  var basePrice = basePriceSet[this.size],
      cheesePrice = cheesePriceSet[this.cheese],
      veggiesPrice = this.veggies.length,
      meatPrice = this.meats.length * 2.5;

  return basePrice + cheesePrice + veggiesPrice + meatPrice;
}

Pizza.prototype.cartItem = function(){
  return `
  <div class='cart-item'>
    <button type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    <div class='pizza-header'>
      <img src='img/crust.png'>` + this.cheeseImg +
      this.meatsImgs.join("") +
      this.veggiesImgs.join("") + `
    </div>
    <div class="pizza-price">
      $<span class="item-price">` + this.pizzaPrice + `</span>
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
  } else {
    return "";
  }
}

$(function(){
  var thisPizza;
  $('#cheese-img').html("<img src ='img/cheese.png'>");
  $('#pizza-builder').change(function(){
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
    thisPizza = new Pizza(selectedSize, selectedCheese, selectedVeggies, selectedMeats);
    $('#cheese-img').html(thisPizza.cheeseImg);
    $('#veggie-img').html(thisPizza.veggiesImgs);
    $('#meat-img').html(thisPizza.meatsImgs);
  });

  $('#pizza-builder').submit(function(event){
    if ($('input[name=size]:checked').val()) {
      event.preventDefault();
      cartObjects.push(thisPizza);
      refreshCart();
      $('.close').click(function(){
        var closeThis = $(this).parent().attr('id')
        console.log(closeThis);
        cartObjects.splice(closeThis, 1);
        refreshCart();
      });
    } else {
      alert("you must select a size")
    }
  });

  function refreshCart(){
    $('#cart-items').text("");
    cartTotal = 0;
    numberOfItems = 0;
    for (var i = 0; i < cartObjects.length; i++) {
      $('#cart-items').append(cartObjects[i].cartItem());
      $('.cart-item').last().attr('id', i);
      cartTotal += cartObjects[i].pizzaPrice;
      numberOfItems++;
    }
    $('#cart-total').text(cartTotal);
    $('#num-items').text(numberOfItems);
    $('.close').click(function(){
      var closeThis = $(this).parent().attr('id');
      cartObjects.splice(closeThis, 1);
      refreshCart();
    });
    console.log(cartObjects);
  }
});
