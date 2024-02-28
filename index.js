const nerd_slide = document.getElementsByClassName("nerd");

  nerd_slide.addEventListener("click", () => {
    // this.classList.toggle("active");
    // var panel = this.nextElementSibling;
    if (nerd_slide.style.display === "block") {
      nerd_slide.style.display = "none";
    } else {
      nerd_slide.style.display = "block";
    }
  });

console.log("hello");