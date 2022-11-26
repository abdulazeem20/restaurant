import { foodCard } from './general.js'
import { register } from './registerLoginCompponent.js'
export function header (page) {
  let header = $(`
    <header>
       <div class="my-container">
            <div class="logo">
               <a href="/"> <img src="assets/images/logo.png" alt=""></a>
            </div>
            <div class="links">
                <a  class="nav-link ${
                  page == 'menu' ? 'active' : ''
                } " href="/menu">Menus</a>
                <a class="nav-link ${
                  page == 'about' ? 'active' : ''
                } " href="/about">About</a>
                <button  class="nav-link" id="signupToggler" data-bs-toggle="modal" data-bs-target="#signUp">Sign up</button>
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
    </header>`)
  header.find('#signupToggler').on('click', function () {
    register()
  })
  $('body').prepend(signUpModal())
  $(document).on('scroll', function () {
    if ($(document).scrollTop() > $('#showcase')[0].clientHeight) {
      header.addClass('scroll')
    } else if ($(document).scrollTop() <= $('#showcase')[0].clientHeight) {
      header.removeClass('scroll')
    }
  })
  header.append(cart())
  header.find('#headCart').on('click', function () {
    header.find('.overlay').addClass('open')
    header.find('.overlayContent').addClass('open')
    $('body').css('overflow', 'hidden')
  })
  header.find('#bar').on('click', clickMe)
  $.post('/number_in_cart', null, null, 'json').done(res => {
    res.forEach(el => {
      header.find('.navtotal').text(el.total)
    })
  })
  return header
}

function clickMe () {
  if (!$('.links').hasClass('open')) {
    $(this).html(`<i class="fa fa-times" aria-hidden="true"></i>`)
    $('body').css('overflow', 'hidden')
  } else if ($('.links').hasClass('open')) {
    $(this).html(`<i class="fa fa-bars" aria-hidden="true"></i>`)
    $('body').css('overflow-y', 'auto')
  }
  $('.links').toggleClass('open')
}

function signUpModal () {
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
    `)
  return signUpModal
}

function cart () {
  let cart = $(`
        <div class="cart-overlay overlay">
            <section id='cart' class="overlayContent">
                <div class="my-container">
                    <div class="head">
                        <h3>My Cart</h3>
                        <div>
                            <span id="back"><i class="fas fa-angle-right"></i></span>
                            <div class="total">
                                <button type="button" class="btn"> <i class="fas fa-shopping-cart"></i>  ₦${new Intl.NumberFormat().format(
                                  0
                                )}</button>
                            </div>
                        </div> 
                    </div>
                    <div class="body">
                        
                    </div>
                </div>
            </section>
        </div>
    `)
  // for (let index = 1; index <= 10; index++) {
  //     cart.find('.body').append(foodCard(index + '0000', `Item ${index}`, 'cart', index))
  // }
  cart.find('#back').on('click', function () {
    closeCart(cart)
  })
  $('body').on('click', function (e) {
    if ($(e.target).is($('.overlay'))) {
      closeCart($(e.target))
    }
  })
  $.post('/in_cart', null, null, 'json')
    .done(res => {
      $(res).each((i, el) => {
        el.cart = 'cart'
        cart.find('.body').append(foodCard(el))
      })
    })
    .fail(res => {
      console.log(res.responseText)
    })
  return cart
}

function closeCart (target) {
  target.find('.overlayContent').removeClass('open')
  setTimeout(() => {
    target.removeClass('open')
  }, 500)
  $('body').css('overflow-y', 'auto')
}