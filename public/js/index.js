import { header } from "./components/Header.js";
import { specialOffer } from "./components/SpecialOffer.js";

$("body").prepend(header);
specialOffer().insertAfter($("#description"));

$("#back").on("click", function () {
  $("#specialOffer").remove();
  specialOffer().insertAfter($("#description"));
});

ScrollReveal({
  reset: true,
  distance: "30%",
  duration: 500,
  delay: 400,
});

ScrollReveal().reveal($("#showcase .showcase-text h1"), {
  origin: "top",
  delay: 500,
});

ScrollReveal().reveal($("#showcase .showcase-text h3"), {
  origin: "left",
  delay: 900,
});

ScrollReveal().reveal($("#showcase .showcase-text a"), {
  origin: "bottom",
  delay: 700,
});

ScrollReveal().reveal($("section h5"), { origin: "left", delay: 700 });
