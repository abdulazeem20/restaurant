import { foodCard } from "./FoodCard.js";
export function cart() {
  let cart = $(`
          <div class="cart-overlay overlay">
              <section id='cart' class="overlayContent">
                  <div class="my-container">
                      <div class="head">
                          <h3>My Cart</h3>
                          <div>
                              <span id="back"><i class="fas fa-angle-right"></i></span>
                              <div class="total">
                                  
                              </div>
                          </div> 
                      </div>
                      <div class="body">
                          
                      </div>
                  </div>
              </section>
          </div>
      `);
  cart.find("#back").on("click", function () {
    closeCart(cart);
  });
  $("body").on("click", function (e) {
    if ($(e.target).is($(".overlay"))) {
      closeCart($(e.target));
    }
  });
  $.post("/in_cart", null, null, "json")
    .done((res) => {
      let cost = 0;
      $(res).each((i, el) => {
        if (res[0].success == true) return;
        el.cart = "cart";
        cart.find(".body").append(foodCard(el));
        cost += Number(el.cost) * Number(el.number);
      });
      setAmount(cost);
    })
    .fail((res) => {
      console.log(res.responseText);
    });
  return cart;
}

export function setAmount(amount) {
  let button = $(`
    <button id="checkout_button" type="button" class="btn" 
    data-amount=${amount} ${amount == 0 && "disabled"}>  
      <i class="fas fa-shopping-cart"></i> ₦ ${new Intl.NumberFormat().format(
        amount
      )}
    </button>
  `);
  button.on("click", function () {
    let total_cost = $(this).data("amount");
    console.log(total_cost);
  });
  $("#cart").find(".total").empty().html(button);
}

function closeCart(target) {
  target.find(".overlayContent").removeClass("open");
  setTimeout(() => {
    target.removeClass("open");
  }, 500);
  $("body").css("overflow-y", "auto");
}
