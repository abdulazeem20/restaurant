import { login } from "./Login.js";
import { invalidFeedback } from "./Feedback.js";
import { LogoutButton } from "./LogoutButton.js";

export function register() {
  let form = $(`
        <form method="post" id="registerForm">
            <div class="form-floating">
              <input
                type="text"
                class="form-control" name="firstname" id="firstname" placeholder="">
              <label for="firstname">First Name</label>
            </div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control" name="lastname" id="lastname" placeholder="">
              <label for="lastname">Last Name</label>
            </div>
            <div class="form-floating">
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
            <div class="form-floating">
              <input
                type="password"
                class="form-control" name="cpassword" id="cpassword" placeholder="">
              <label for="cpassword">Confirm Password</label>
            </div>
            <div>
                <button type="submit" class="btn btn-primary w-100"> Register </button>
                <p id="loginLink">Already have an Account?? <span>login here</span></p>
            </div>
        </form>
    `);

  form.find("#loginLink").on("click", function () {
    login();
  });

  $("#signUp .modal-title").empty().append("Create An Account");
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

    $.post("/register", data, null, "json")
      .done((res) => {
        button.prop("disabled", false).text(`Register`);
        if (res.errors) {
          res.errors.forEach((el) => {
            let target = $(`#${el.param}`);
            target.addClass("is-invalid");
            invalidFeedback(el.msg).insertAfter(target);
          });
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
