import { addToCart } from "./AddToCart.js";
import { alterCart } from "./AlterCartNumberAtHeader.js";
import { setAmount } from "./Cart.js";
import { cartFeedback } from "./Feedback.js";
export function remove() {
  let me = $(`
      <button class="btn remove  btn-sm btn-success"><i class="fa fa-trash" aria-hidden="true"></i></button>
      `);
  me.on("click", function () {
    removeAction($(this));
  });
  return me;
}

function removeAction(element) {
  let id = element.parents(".card").data("id");
  let innerHtml = element.html();
  element
    .attr("disabled", "true")
    .html(`<span class="spinner-border text-white spinner-border-sm"></span>`);
  $.post(`/delete_from_cart/${id}`, null, null, "json")
    .done((res) => {
      if (res.error) {
        element.attr("disabled", false).html(innerHtml);
        $("body").prepend(
          cartFeedback({
            message: res.error,
            className: "error",
          })
        );
        return;
      }
      let inCart = $("#cart .body").find($(".card"));
      $(inCart).each((i, el) => {
        if ($(el).data("id") === id) {
          let price = $(el).data("cost");
          let quantity = $(el).find(".quantity").text();
          let cost = $("#checkout_button").data("amount");
          let total = Number(quantity) * Number(price);
          let amount = Number(cost) - total;
          setAmount(amount);
          $(el).remove();
        }
      });
      element.parents(".card").find(".action").empty().append(addToCart());
      alterCart();
      $("body").prepend(
        cartFeedback({
          message: "Goods Sucessfully Removed from cart",
        })
      );
    })
    .fail((res) => {
      console.log(res.responseText);
    });
}
