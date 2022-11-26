import { specialOffer } from './specialOffer.js'

export function foodCard (props) {
  let goodsName = props.goods_name.split(' ')
  goodsName = modifyName(goodsName)
  let card = $(`
       <div class="card text-start" data-cost="${props.cost}" data-id="${
    props.id
  }">
         <img class="card-img-top" src="/assets/images/food2.jpg"  alt="Title">
         <div class="card-body">
           <div class="head">
                <h6 class="card-title name">${goodsName}</h6>
                ${
                  props.cart == 'cart'
                    ? `<span class="btn delete btn-sm btn-success"><i class="fa fa-trash" aria-hidden="true"></i></span>`
                    : ''
                }
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
    `)
  if (props.cart == 'cart') {
    card.find('.action').append(addAndSubInCart(props.number))
  } else if (props.in_cart == 1) {
    card.find('.action').append(remove())
  } else {
    card.find('.action').append(addToCart())
  }
  card.find('.delete').on('click', function () {
    let id = $(this)
      .parents('.card')
      .data('id')
    let page = $('header')
      .find('.nav-link.active')
      .html()

    $.post(`/delete_from_cart/${id}`, null, null, 'json')
      .done(res => {
        let inCart = page == 'Menus' ? $('#menu-section').find($('.card')) : ''
        $(inCart).each((i, el) => {
          if ($(el).data('id') === id) {
            $(el)
              .find('.action')
              .empty()
              .append(addToCart())
          }
        })
        $(this)
          .parents('.card')
          .remove()
        alterCart()
      })
      .fail(res => {
        console.log(res.responseText)
      })
  })
  return card
}

function add () {
  alterCart('add')
  let me = $(this)
  let id = $(this)
    .parents('.card')
    .data('id')

  $.post(`/add_to_cart/${id}`, null, null, 'json')
    .done(res => {
      $.post(`/food_detail/${id}`, null, null, 'json')
        .done(res => {
          $(res).each((i, el) => {
            el.cart = 'cart'
            el.number = 1
            $('#cart .body').append(foodCard(el))
          })
        })
        .fail(res => {
          console.log(res.responseText)
        })
      me.replaceWith(remove())
    })
    .fail(res => {
      console.log(res.responseText)
    })
}

function alterCart (action) {
  let inCart = Number($('#headCart .badge').text())
  if (action == 'add') {
    $('#headCart .badge').text(++inCart)
  } else {
    $('#headCart .badge').text(--inCart)
  }
}

function addToCart () {
  let button = $(`
        <button type="button" class="addToCart btn btn-sm btn-success"><i class="fas fa-cart-plus"></i></button>
    `)
  button.on('click', add)
  return button
}

function remove () {
  let me = $(`
    <span class="btn remove  btn-sm btn-success"><i class="fa fa-trash" aria-hidden="true"></i></span>
    `)
  me.on('click', function () {
    removeAction($(this))
  })
  return me
}

function removeAction (element) {
  let id = element.parents('.card').data('id')
  // console.log(id)

  $.post(`/delete_from_cart/${id}`, null, null, 'json')
    .done(res => {
      let inCart = $('#cart .body').find($('.card'))
      $(inCart).each((i, el) => {
        if ($(el).data('id') === id) {
          $(el).remove()
        }
      })
      element
        .parents('.card')
        .find('.action')
        .empty()
        .append(addToCart())
      alterCart()
    })
    .fail(res => {
      console.log(res.responseText)
    })
}

function addAndSubInCart (number) {
  let space = $(`
        <div class="addAndSub">
            <button type="button" id="minus" ${
              number > 1 ? '' : 'disabled'
            } class="btn btn-sm btn-success"> <i class="fa fa-minus" aria-hidden="true"></i> </button>
            <span class="quantity" aria-live="polite"> ${
              number ? number : 1
            } </span>
            <button type="button" id="add" class="btn btn-sm btn-success"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </div>
    `)
  space.find('button').on('click', function () {
    let myId = $(this).attr('id')
    let num
    if (myId == 'add') {
      num = Number(
        $(this)
          .prev()
          .text()
      )
      if (++num > 1)
        $(this)
          .prevAll('#minus')
          .attr('disabled', false)
      $(this)
        .prev()
        .text(num)
    } else {
      num = Number(
        $(this)
          .next()
          .text()
      )
      if (--num == 1) $(this).attr('disabled', true)
      $(this)
        .next()
        .text(num)
    }
  })
  return space
}

export function modifyName (item) {
  return item
    .map(el => {
      return el.slice(0, 1).toUpperCase() + el.slice(1).toLowerCase()
    })
    .join(' ')
}
