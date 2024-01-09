let menu = document.querySelector('#menu-bar');
let nav = document.querySelector('.nav');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    nav.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .nav a');

window.onscroll = () =>{

    menu.classList.remove('fa-times');
    nav.classList.remove('active');

    section.forEach(sec =>{

        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header .nav a[href*='+id+']').classList.add('active');
            });
        };
    });

}


const fileInput = document.getElementById("file-input");
const customButton = document.getElementById("custom-button");
const imagePreview = document.getElementById("image-preview");

customButton.addEventListener("click", function() {
  fileInput.click();
});


fileInput.addEventListener("change", function() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function() {
    const image = new Image();
    image.src = reader.result;

    image.addEventListener("load", function() {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const maxWidth = 300;
      let width = image.width;
      let height = image.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      context.drawImage(image, 0, 0, width, height);

      imagePreview.src = canvas.toDataURL("image/jpeg");
     });
  });

  reader.readAsDataURL(file);
});