import { modifyName, foodCard } from "./FoodCard.js";

export function menuSidebar() {
  let container = $(`
          <section class="menu-list">
              <label data-cat="all" class="active"> All </label>
  
          </section>
      `);
  $.post("/category", null, null, "json")
    .done(function (res) {
      $.each(res, function (i, el) {
        let catName = el.cat_name;
        if (catName.search("_") != -1) {
          catName = catName.split("_");
          catName = modifyName(catName);
        } else {
          catName =
            catName.slice(0, 1).toUpperCase() + catName.slice(1).toLowerCase();
        }
        container.append(`<label data-cat="${el.id}">${catName}</label>`);
      });

      container.find("label").on("click", function () {
        container.find("label").each(function (i, el) {
          $(el).removeClass("active");
        });
        $(this).addClass("active");

        closeList($(this).parent().prev(), $(this).parent());

        let target = $(this).parent().next();
        target.empty();
        if ($(this).data("cat") == "all") {
          getAllFood(target);
          return;
        }
        getSpecificFood(target, $(this).data("cat"));
      });
    })
    .fail(function (res) {
      // console.log(res.responseText);
    });

  return container;
}

function getSpecificFood(target, cat) {
  $.post(`/foods/${cat}`, null, null, "json")
    .done((res) => {
      target.empty();
      $.each(res, (i, el) => {
        target.append(foodCard(el));
      });
    })
    .fail();
}
export function getAllFood(target) {
  $.post("/allfoods", null, null, "json")
    .done((res) => {
      target.empty();
      $.each(res, (i, el) => {
        target.append(foodCard(el));
      });
    })
    .fail();
}

export function closeList(button, list) {
  if (!button.hasClass("open")) {
    button.html(`<i class="fa fa-times" aria-hidden="true"></i>`);
  } else {
    button.html(`<i class="fa fa-bars" aria-hidden="true"></i>`);
  }
  button.toggleClass("open");
  list.toggleClass("open");
}
