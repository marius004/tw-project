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
    imgs.forEach(img => addModalPropertyToImage(img));
};

const addModalPropertyToImage = (img) => {
    const modal = document.querySelector("#image-modal");
    const modalImage = modal.querySelector("img.modal-content");
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

// form
const isValidName = (value) => {
    return /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(value);
};

const isValidEmail = (value) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
};

const validateForm = () => {
    const form = document.querySelector("#Contact_me");
    const firstName = form.querySelector("#first-name");
    const lastName = form.querySelector("#last-name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    if (!isValidName(firstName.value))
        return {message: "First name is invalid", isValid: false};
    if (!isValidName(lastName.value))
        return {message: "Last name is invalid", isValid: false};
    if (!isValidEmail(email.value))
        return {message: "Email is invalid", isValid: false};
    if (message.value.trim() === "")
        return {message: "Message cannot be empty", isValid: false};

    return {message: "", isValid: true};
};

const handleSubmit = (event) => {
    event.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
        alert(validation.message);
        return;
    }

    alert("Message sent successfully!");
};

const addFormInputsEventListeners = (form) => {
    const firstName = form.querySelector("#first-name");
    const lastName = form.querySelector("#last-name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    firstName.value = localStorage.getItem("first-name") || firstName.value;
    lastName.value = localStorage.getItem("last-name") || lastName.value;
    email.value = localStorage.getItem("email") || email.value;
    message.value = localStorage.getItem("message") || message.value;

    const addOnChangeEvent = (localStorageKey, element) => {
        element.addEventListener("input", () => {
            localStorage.setItem(localStorageKey, element.value);
        });
    };

    addOnChangeEvent("first-name", firstName);
    addOnChangeEvent("last-name", lastName);
    addOnChangeEvent("email", email);
    addOnChangeEvent("message", message);
};

const addFormEventListeners = () => {
    const dispatcher = document.querySelector("#contact-me-dispatcher");
    const form = document.querySelector("#Contact_me");
    const close = form.querySelector("#close-form");

    dispatcher.addEventListener("click", () => {
        form.style.display = form.style.display === "none" ? "block" : "none";
    });

    close.addEventListener("click", () => { 
        form.style.display = "none";
    });

    addFormInputsEventListeners(form);
}

// event listeners
window.addEventListener("scroll", toggleGopher);
window.addEventListener("load", addModalPropertyToImages);
window.addEventListener("load", addModalCloseEvent);
window.addEventListener("load", addFormEventListeners);