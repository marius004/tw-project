// display the gopher when the user scrolls to the bottom of the page
window.addEventListener('scroll', function() {
    const gopher = document.getElementById("gopher-animation");
    var windowHeight = window.innerHeight;
    var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    var pageHeight = document.documentElement.scrollHeight;

    gopher.style.display = (scrollPosition + windowHeight >= pageHeight - 100) ? "block" : "none";
});