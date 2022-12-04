import { addToCart } from "./AddToCart.js";
import { alterCart } from "./AlterCartNumberAtHeader.js";
import { setAmount } from "./Cart.js";
import { cartFeedback } from "./Feedback.js";
export function deleteFromCart() {
  let button = $(
    `<button class="btn delete btn-sm btn-success"><i class="fa fa-trash" aria-hidden="true"></i></button>`
  );
  button.on("click", function () {
    let me = $(this);
    let price = $(this).parents(".card").data("cost");
    let quantity = me.parents(".card").find(".quantity").text();
    let innerHtml = me.html();
    me.attr("disabled", "true").html(
      `<span class="spinner-border text-white spinner-border-sm"></span>`
    );
    let id = $(this).parents(".card").data("id");
    let page = $("header").find(".nav-link.active").html();
    page = typeof page === "undefined" ? "Home" : page;
    $.post(`/delete_from_cart/${id}`, null, null, "json")
      .done((res) => {
        if (res.error) {
          me.attr("disabled", false).html(innerHtml);
          $("body").prepend(
            cartFeedback({
              message: res.error,
              className: "error",
            })
          );
          return;
        }
        let inCart =
          page == "Menus"
            ? $("#menu-section").find($(".card"))
            : page == "Home"
            ? ""
            : "";
        $(inCart).each((i, el) => {
          if ($(el).data("id") === id) {
            $(el).find(".action").empty().append(addToCart());
          }
        });
        $(this).parents(".card").remove();
        let cost = $("#checkout_button").data("amount");
        let total = Number(quantity) * Number(price);
        let amount = Number(cost) - total;
        setAmount(amount);
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
  });
  return button;
}
