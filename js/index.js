// gopher
const toggleGopher = () => {
    const gopher = document.getElementById("gopher-animation");
    var windowHeight = window.innerHeight;
    var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    var pageHeight = document.documentElement.scrollHeight;

    gopher.style.display = (scrollPosition + windowHeight >= pageHeight - 100) ? "block" : "none";
};

// modal 
const addModalPropertyToImages = () => {
    const imgs = document.querySelectorAll("img.toggle-fullscreen-modal");
    imgs?.forEach(img => addModalPropertyToImage(img));
};

const addModalPropertyToImage = (img) => {
    const modal = document.querySelector("#image-modal");
    const modalImage = modal.querySelector("img.modal-content");
    const modalClose = modal.querySelector(".close");
    const modalCaption = modal.querySelector("#caption");

    img.onclick = () => {
        modal.style.display = "block";
        modalImage.src = img.src;
        modalCaption.innerHTML = img.alt || "";
    };
};

const addModalCloseEvent = () => {
    const modal = document.querySelector("#image-modal");
    const modalClose = modal.querySelector(".close");
    
    modalClose.onclick = () => {
        modal.style.display = "none";
    };
};

window.addEventListener("scroll", toggleGopher);
window.onload = () => {
    addModalPropertyToImages();
    addModalCloseEvent();
}