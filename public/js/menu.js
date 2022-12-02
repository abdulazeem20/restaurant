import { header } from "./components/Header.js";
import { menuSection } from "./components/Menu.js";

$("body").prepend(header("menu"));

menuSection().insertAfter($("#showcase"));
