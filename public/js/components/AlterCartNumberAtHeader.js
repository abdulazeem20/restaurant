export function alterCart(action) {
  let inCart = Number($("#headCart .badge").text());
  if (action == "add") {
    $("#headCart .badge").text(++inCart);
  } else {
    $("#headCart .badge").text(--inCart);
  }
}
