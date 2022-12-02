export function invalidFeedback(message) {
  return $(`
      <p class="invalid-feedback">
        ${message}
      </p>
    `);
}

export function errorAlert(msg) {
  let response =
    $(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>${msg}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`);
  setTimeout(() => {
    response.remove();
  }, 5000);
  return response;
}

export function cartFeedback({ message }) {
  let icon = '<i class="fa fa-check" aria-hidden="true"></i>';
  let feedback = $(`
    <div class="cart_feedback" >
      ${icon + " " + message}
    </div>
  `);
  $("body").find(".cart_feedback").addClass("remove");

  setTimeout(() => {
    feedback.addClass("remove");
  }, 5000);
  setTimeout(() => {
    feedback.remove();
  }, 6000);
  return feedback;
}
