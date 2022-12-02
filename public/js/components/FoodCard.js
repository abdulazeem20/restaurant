import { addAndSubInCart } from "./AddAndSubstract.js";
import { deleteFromCart } from "./DeleteFromCart.js";
import { addToCart } from "./AddToCart.js";
import { remove } from "./RemoveFromCart.js";

export function foodCard(props) {
  let goodsName = props.goods_name.split(" ");
  goodsName = modifyName(goodsName);
  let card = $(`
       <div class="card text-start" 
            data-cost="${props.cost}" data-id="${props.id}"
        >
         <img class="card-img-top" src="/assets/images/food2.jpg"  alt="Title">
         <div class="card-body">
           <div class="head">
                <h6 class="card-title name">${goodsName}</h6>
           </div>
           <div class="foot">
                <div class="price">
                    ₦ <span class="main">${new Intl.NumberFormat().format(
                      props.cost
                    )}</span>
                </div>
                <div class="action">
                </div>
           </div>
         </div>
       </div>
    `);
  if (props.cart == "cart") {
    card.find(".action").append(addAndSubInCart(props.number));
    deleteFromCart().insertAfter(card.find(".name"));
  } else if (props.in_cart == 1) {
    card.find(".action").append(remove());
  } else {
    card.find(".action").append(addToCart());
  }
  return card;
}

export function modifyName(item) {
  return item
    .map((el) => {
      return el.slice(0, 1).toUpperCase() + el.slice(1).toLowerCase();
    })
    .join(" ");
}
