import { setAmount } from "./Cart.js";
export function addAndSubInCart(number) {
  let space = $(`
        <div class="addAndSub">
          <button type="button" id="minus" 
              ${number > 1 ? "" : "disabled"} 
              class="btn btn-sm btn-success"> <i class="fa fa-minus" aria-hidden="true"></i> 
          </button>
          <span class="quantity" aria-live="polite"> 
              ${number}
          </span>
          <button type="button" id="add" class="btn btn-sm btn-success">
              <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>  
    `);
  space.find("button").on("click", function () {
    let myId = $(this).attr("id");
    let id = $(this).parents(".card").data("id");
    let price = $(this).parents(".card").data("cost");
    let me = $(this);
    let innerHtml = me.html();
    let num;
    if (myId == "add") {
      num = Number($(this).prev().text());
      if (++num > 1) $(this).prevAll("#minus").attr("disabled", false);
      me.attr("disabled", true).html(
        `<span class="spinner-border text-white spinner-border-sm"></span>`
      );
      me.prevAll("#minus").attr("disabled", true);
    } else {
      num = Number($(this).next().text());
      if (--num == 1) $(this).attr("disabled", true);
      me.attr("disabled", true).html(
        `<span class="spinner-border text-white spinner-border-sm"></span>`
      );
      me.nextAll("#add").attr("disabled", true);
    }
    $.post(`/update_quantity/${id}/${num}`, null, null, "json")
      .done((res) => {
        let cost = $("#checkout_button").data("amount");
        let amount = 0;
        if (myId == "add") {
          amount = Number(cost) + Number(price);
          $(this).prev().text(num);
          me.attr("disabled", false);
          me.html(innerHtml);
          if (num > 1) me.prevAll("#minus").attr("disabled", false);
        } else {
          amount = Number(cost) - Number(price);
          $(this).next().text(num);
          if (num > 1) me.attr("disabled", false);
          me.nextAll("#add").attr("disabled", false);
          me.html(innerHtml);
        }
        setAmount(amount);
      })
      .fail((res) => {});
  });
  return space;
}
