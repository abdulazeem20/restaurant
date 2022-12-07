import { Bank } from "./Bank.js";
export function Checkout({ totalCost }) {
  let modal = $(`
  <div class="modal fade" id="checkout-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Checkout Your Purchase</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5>Total Cost <b>₦${new Intl.NumberFormat().format(
            totalCost
          )}</b></h5>
          <h6>Choose a Payment Method</h6>
         <div class="methods">
            <div class="method">
                <input type="radio" name="method" id="bank" />
                <label for="bank"> Bank Transfer </label>
            </div>
            <div class="method">
                <input type="radio" name="method" id="paystack" checked="checked" />
                <label for="paystack"> Card Payment </label>
            </div>
            <div class="method">
                <input type="radio" name="method" id="onDelivery"/>
                <label for="onDelivery"> Payment on Delivery </label>
            </div>
         </div>
         <div id="action">
         
         </div>
        </div>
      </div>
    </div>
  </div>`);
  modal.find("input[type='radio']").on("click", function () {
    modal.find("#action").empty();
    let id = this.id;
    switch (id) {
      case "paystack":
        modal.find("#action").append(Paystack());
        break;
      case "bank":
        modal.find("#action").append(Bank());
        break;
      case "onDelivery":
        modal.find("#action").append(DeliveryPayment());
        break;
    }
  });
  modal.find("#action").append(Paystack());
  return modal;
}

function Paystack() {
  let link = $(`
    <p class="paystack">click to proceed with payment <i class="fa fa-arrow-right" aria-hidden="true"></i> </p>
  `);
  return link;
}

function DeliveryPayment() {
  let link = $(`
    <button class="btn btn-success" type="button"> Place The Order </button>
  `);
  return link;
}
