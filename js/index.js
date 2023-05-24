let randomZoomInterval = null;

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
        const zoomLock = document.querySelector("#zoom-lock");
        if (zoomLock.checked)
            magnify(modalImage, 2);
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
        form.style.display = getComputedStyle(form).display === "none" ? "block" : "none";
    });

    close.addEventListener("click", () => { 
        form.style.display = "none";
    });

    addFormInputsEventListeners(form);
}

// FROM https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
function magnify(img, zoom) {
    var glass, w, h, bw;

    /* delete previous glass if there's any */
    document.querySelectorAll(".img-magnifier-glass").forEach(glass => glass.remove());
  
    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
  
    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
  
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
  
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.stopPropagation();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
        if (x < w / zoom) {x = w / zoom;}
        if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
        if (y < h / zoom) {y = h / zoom;}
        /* Set the position of the magnifier glass: */
        a = img.getBoundingClientRect();

        glass.style.left = (x + a.left - w) + "px";
        glass.style.top = (y + a.top - h) + "px";
        /* Display what the magnifier glass "sees": */

        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        debugger;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
}

const randomInteger = (max) => {
    return Math.floor(Math.random() * max);
};

const addZoomOptionsEventListeners = () => {
    const zoomValue = document.querySelector("#zoom-value");

    const setGlassDimensions = (zoom) => {
        const glass = document.querySelector(".img-magnifier-glass");
        // set new dimensions for the glass
        glass.style.width = zoom + "px";
        glass.style.height = zoom + "px";
    }

    const getGlassSize = () => {
        const glass = document.querySelector(".img-magnifier-glass");
        const sizeStr = getComputedStyle(glass).width;
        return parseFloat(sizeStr.slice(0, -2));
    };

    zoomValue.addEventListener("input", (e) => {
        setGlassDimensions(e.target.value);
    });

    const zoomLock = document.querySelector("#zoom-lock");
    zoomLock.addEventListener("change", (e) => {
        const value = e.target.checked;
        const modalImage = document.querySelector("img.modal-content");
        if (value) {
            magnify(modalImage, 2);
            setGlassDimensions(zoomValue.value);
        } else {
            document.querySelectorAll(".img-magnifier-glass").forEach(glass => glass.remove());
        }
    });

    const randomZoom = document.querySelector("#random-zoom");
    randomZoom.addEventListener("change", () => {
        const value = randomZoom.checked;
        if (!zoomLock.checked) zoomLock.click();

        if (!value) {
            clearInterval(randomZoomInterval);
            return;
        }

        randomZoomInterval = setInterval(() => {
            const size = getGlassSize();
            const sign = randomInteger(2) == 0 ? -1 : 1;
            const newSize = Math.min(Math.max(100, size + sign * randomInteger(20)), 250);
            zoomValue.value = newSize;
            setGlassDimensions(newSize);
        }, 500);
    });
};

// event listeners
window.addEventListener("scroll", toggleGopher);
window.addEventListener("load", addModalPropertyToImages);
window.addEventListener("load", addModalCloseEvent);
window.addEventListener("load", addFormEventListeners);
window.addEventListener("load", addZoomOptionsEventListeners);