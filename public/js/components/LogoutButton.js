export function LogoutButton() {
  let button = $(`
        <a class="nav-link">Logout</a>
    `);
  button.on("click", () => {
    $.post("/logout", null, null, "json").done((res) => {
      if (res.success) {
        location.reload();
      }
    });
  });
  return button;
}
