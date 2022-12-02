import { foodCard } from "./FoodCard.js";
export function specialOffer() {
  let specialSection = $(`
        <section id="specialOffer">
               <div class="my-container">
                    <h5>Special Offers</h5>
                    <div class="card-container">
                        
                    </div>
               </div>
        </section>
    `);
  for (let index = 1; index <= 4; index++) {
    specialSection
      .find(".card-container")
      .append(foodCard(index + "0000", `Item ${index}`));
  }
  return specialSection;
}
