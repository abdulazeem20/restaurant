import { cart } from "./Cart.js";
import { signupButton } from "./Signup.Button.js";
import { LogoutButton } from "./LogoutButton.js";
export function header(page) {
  let header = $(`
    <header>
       <div class="my-container">
            <div class="logo">
               <a href="/"> <img src="assets/images/logo.png" alt=""></a>
            </div>
            <div class="links">
                <a  class="nav-link ${
                  page == "menu" && "active"
                } " href="/menu">Menus</a>
                <a class="nav-link ${
                  page == "about" && "active"
                } " href="/about">About</a>
            </div>
            <div class="icon">
                <span id="headCart">
                    <span class="badge navtotal"></span>
                    <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
                </span>
                <span id="bar">
                    <i class="fa fa-bars" aria-hidden="true"></i> 
                </span>
            </div>
        </div>
    </header>`);

  $.post("/session", null, null, "json").done((res) => {
    res.session === false
      ? header.find(".links").append(signupButton())
      : header.find(".links").append(LogoutButton());
  });
  $("body").prepend(signUpModal());
  $(document).on("scroll", function () {
    if ($(document).scrollTop() > $("#showcase")[0].clientHeight) {
      header.addClass("scroll");
    } else if ($(document).scrollTop() <= $("#showcase")[0].clientHeight) {
      header.removeClass("scroll");
    }
  });
  header.append(cart());
  header.find("#headCart").on("click", function () {
    header.find(".overlay").addClass("open");
    header.find(".overlayContent").addClass("open");
    $("body").css("overflow", "hidden");
  });
  header.find("#bar").on("click", clickMe);
  $.post("/number_in_cart", null, null, "json").done((res) => {
    res.forEach((el) => {
      header.find(".navtotal").text(el.total);
    });
  });
  return header;
}

function clickMe() {
  if (!$(".links").hasClass("open")) {
    $(this).html(`<i class="fa fa-times" aria-hidden="true"></i>`);
    $("body").css("overflow", "hidden");
  } else if ($(".links").hasClass("open")) {
    $(this).html(`<i class="fa fa-bars" aria-hidden="true"></i>`);
    $("body").css("overflow-y", "auto");
  }
  $(".links").toggleClass("open");
}

function signUpModal() {
  let signUpModal = $(`
        <div class="modal fade" id="signUp" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTitleId"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            
                        </div>
                </div>
            </div>
        </div>        
    `);
  return signUpModal;
}
