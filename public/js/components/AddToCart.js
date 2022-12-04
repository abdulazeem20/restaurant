import { alterCart } from "./AlterCartNumberAtHeader.js";
import { remove } from "./RemoveFromCart.js";
import { foodCard } from "./FoodCard.js";
import { setAmount } from "./Cart.js";
import { cartFeedback } from "./Feedback.js";
import { login } from "./Login.js";
export function addToCart() {
  let button = $(`
          <button type="button" class="addToCart btn btn-sm btn-success"><i class="fas fa-cart-plus"></i></button>
      `);
  button.on("click", add);
  return button;
}

function add() {
  let me = $(this);
  let id = $(this).parents(".card").data("id");
  let innerHtml = me.html();
  me.attr("disabled", true).html(
    `<span class="spinner-border text-white spinner-border-sm"></span>`
  );
  $.post(`/add_to_cart/${id}`, null, null, "json")
    .done((res) => {
      if (res.error) {
        me.attr("disabled", false).html(innerHtml);
        $(".modal#signUp").modal("show");
        login();
        $("body").prepend(
          cartFeedback({
            message: res.error,
            className: "error",
          })
        );
        return;
      }
      $.post(`/food_detail/${id}`, null, null, "json")
        .done((res) => {
          $(res).each((i, el) => {
            el.cart = "cart";
            el.number = 1;
            $("#cart .body").append(foodCard(el));
            let cost = $("#checkout_button").data("amount");
            let amount = Number(cost) + Number(el.cost);
            setAmount(amount);
          });
        })
        .fail((res) => {
          console.log(res.responseText);
        });
      me.replaceWith(remove());
      me.attr("disabled", "false");
      alterCart("add");
      $("body").prepend(
        cartFeedback({
          message: "Goods Sucessfully Added to cart",
        })
      );
    })
    .fail((res) => {
      console.log(res.responseText);
    });
}
