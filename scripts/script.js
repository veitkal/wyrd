let infoButton = document.getElementById("info_button");
let infoDiv = document.getElementById("info_div");
let toggleState = false;

//click on text to dismiss
infoDiv.addEventListener("click", function() {
  infoDiv.style.opacity = "0";
    info_button.style.border = "none";
})


//toggles info text + styling
infoButton.addEventListener("click", function() {
  toggleState = !toggleState;
  if (toggleState) {
    infoDiv.style.zIndex = "1";
    infoDiv.style.opacity = "1";
    info_button.style.opacity = "1";
    info_button.style.borderStyle = "none solid none solid";
  } else {
    infoDiv.style.zIndex = "-1";
    infoDiv.style.opacity = "0";
    info_button.style.opacity = "0.7";
    info_button.style.border = "none";
  }
});



