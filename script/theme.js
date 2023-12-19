let a = document.createElement("link");
let button = document.getElementById("button")
a.rel = "stylesheet";
button.addEventListener("click", () => {
    a.hrew = "../css/dark.css"
});