import { register } from "./Register.js";
import { invalidFeedback, errorAlert } from "./Feedback.js";
import { LogoutButton } from "./LogoutButton.js";
export function login() {
  let form = $(`
      <form method="post" id="loginForm">
        <div class="form-floating" id="first">
            <input
            type="email"
            class="form-control" name="email" id="email" placeholder="">
            <label for="email">Email</label>
          </div>
          <div class="form-floating">
            <input
            type="password"
              class="form-control" name="password" id="password" placeholder="">
            <label for="password">Password</label>
          </div>
          <div>
              <button type="submit" class="btn btn-primary w-100"> Login </button>
              <p id="registerLink">Don't have an Account?? <span>Register here</span></p>
          </div>
      </form>
    `);
  form.find("#registerLink").on("click", function () {
    register();
  });
  $("#signUp .modal-title").empty().append("Login Your Account");
  form.on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    let button = $(this).find('button[type="submit"]');

    $(this).find("input").removeClass("is-invalid");
    $(this).find(".invalid-feedback").remove();
    button.prop("disabled", true).html(`
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      `);

    $.post("/login", data, null, "json")
      .done((res) => {
        button.prop("disabled", false).text(`Login`);
        if (res.errors) {
          res.errors.forEach((el) => {
            let target = $(`#${el.param}`);
            target.addClass("is-invalid");
            invalidFeedback(el.msg).insertAfter(target);
          });
        } else if (res.error) {
          let field = res.field.split(",");
          field.forEach((el) => {
            let target = $(`#${el}`);
            target.addClass("is-invalid");
          });
          let response = errorAlert(res.error);
          response.insertBefore($(this));
        } else if (res.success) {
          location.reload();
        }
      })
      .fail((res) => {
        console.log(res.responseText);
      });
  });
  $("#signUp .modal-body").empty().append(form);
}
