var nerd_slide = document.querySelector(".nerd_button");


  nerd_slide.addEventListener("click", () => {
    var tog = document.querySelector(".nerd");
    tog.style.display = tog.style.display === "none" ? "block" : "none";
  });

console.log("hello");