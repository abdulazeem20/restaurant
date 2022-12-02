import { getAllFood, menuSidebar,closeList } from "./MenuSidebar.js";
export function menuSection() {
  let container = $(`
        <section id="menu-section">
            <div class="my-container">
            <span class="list-toggler"><i class="fa fa-bars" aria-hidden="true"></i></span>
                
            </div>
        </section>
    `);
  container.find(".my-container").append(menuSidebar());
  container.find(".my-container").append(menuMain());
  container.find(".list-toggler").on("click", function () {
    let target = container.find(".menu-list");
    closeList($(this), target);
  });
  return container;
}

function menuMain() {
  let container = $(`
        <section class="menu">
            
        </section>
    `);
  getAllFood(container);
  return container;
}

