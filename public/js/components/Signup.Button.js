import { register } from "./Register.js";
export function signupButton() {
  let button = $(`
      <button  class="nav-link" id="signupToggler" data-bs-toggle="modal" data-bs-target="#signUp">Sign up</button>
    `);
  button.on("click", function () {
    register();
  });
  return button;
}
