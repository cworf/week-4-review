var cartTotal = 0;
var numberOfItems = 0;
var cartObjects = [];

function Pizza (size, cheese, veggies, meats){
  this.id = 0;
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
    <div class='pizza-header ` + this.size + `'>
      <img src='img/crust.png'>` + this.cheeseImg +
      this.meatsImgs.join("") +
      this.veggiesImgs.join("") + `
    </div>
    <div class="pizza-price">
      $<span class="item-price">` + this.pizzaPrice + `</span>
    </div>
    <div class="pizza-info">
      <div id="accordion` + this.id + `" role="tablist">
        <div class="card">
          <div class="card-header" role="tab" id="cheeseHeading` + this.id + `">
            <h5 class="mb-0">
              <a data-toggle="collapse" href="#collapseCheese` + this.id + `">
                Cheese Selection
              </a>
            </h5>
          </div>

          <div id="collapseCheese` + this.id + `" class="collapse" role="tabpanel" data-parent="#accordion` + this.id + `">
            <div class="card-body">
              ` + this.cheese + `
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" role="tab" id="meatHeading` + this.id + `">
            <h5 class="mb-0">
              <a class="collapsed" data-toggle="collapse" href="#collapseMeat` + this.id + `">
                Meat Selections
              </a>
            </h5>
          </div>
          <div id="collapseMeat` + this.id + `" class="collapse" role="tabpanel" data-parent="#accordion` + this.id + `">
            <div class="card-body">
              <ul>
                <li>` + this.meats.join("</li><li>") + `</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" role="tab" id="veggieHeading` + this.id + `">
            <h5 class="mb-0">
              <a class="collapsed" data-toggle="collapse" href="#collapseVeggie` + this.id + `">
                Veggie Selections
              </a>
            </h5>
          </div>
          <div id="collapseVeggie` + this.id + `" class="collapse" role="tabpanel" data-parent="#accordion` + this.id + `">
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
      if (cartObjects.length !== 0) {
        var lastItem = cartObjects.slice(-1)[0];
        thisPizza.id = lastItem.id + 1;
      }
      cartObjects.push(thisPizza);
      refreshCart();
      $('.total-box').addClass('show');
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
      cartObjects[i].id = i;
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
  $('input[type=checkbox]').click(function(){
    $(this).parent().toggleClass('checked');
  });
  $('input[type=radio]').click(function(){
    $(this).parent().addClass('checked');
    $(this).parent().siblings().removeClass('checked');
  });
});
