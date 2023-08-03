import { runUtils } from "./src/utils.js"; // import from file
import { runPage1 } from "./src/page1.js";
import { runPage2 } from "./src/page2.js";

const page = document.querySelector("[data-route]").dataset.route;

if (page === "home") {
  runUtils(); // run imported functions
  runPage1();
} else {
  runUtils(); // run imported functions
  runPage2();
}

console.log("build beta");
