/*== MOBILE MENU ==*/

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

/*== MODALS ==*/

const bookingModal = document.getElementById("booking-modal");
const detailsModal = document.getElementById("vehicle-modal");
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");

const vehicleSelect = document.getElementById("modal-vehicle-select");

/*== GLOBAL VARIABLES ==*/

// Stores selected vehicle if login is required
let pendingBookingCar = "";

// Stores currently viewed vehicle
let currentOpenCar = "";

/*== MODAL ANIMATION HELPERS ==*/

function showModal(modal) {

    if (!modal) return;

    modal.classList.remove("hidden");

    setTimeout(() => {

        modal.classList.remove("opacity-0");

        modal.firstElementChild.classList.remove("scale-95");

    }, 10);

}

function hideModal(modal) {

    if (!modal) return;

    modal.classList.add("opacity-0");

    modal.firstElementChild.classList.add("scale-95");

    setTimeout(() => {

        modal.classList.add("hidden");

    }, 300);

}

/*== HERO BOOK NOW BUTTON ==*/

function handleBookNow() {
    openBookingModal();
}

/*== BOOKING MODAL ==*/

function openBookingModal(defaultVehicle = "") {

    if (!isLoggedIn()) {

        pendingBookingCar = defaultVehicle;

        alert("Please login first before booking.");

        openLoginModal();

        return;

    }

    mobileMenu?.classList.add("hidden");

    if (defaultVehicle) {

        vehicleSelect.value = defaultVehicle;

    }

    showModal(bookingModal);

}

function closeBookingModal() {

    hideModal(bookingModal);

}

/*== LOGIN MODAL ==*/

function openLoginModal() {

    mobileMenu?.classList.add("hidden");

    closeRegisterModal();

    const form = document.getElementById("login-form");

    if (form) form.reset();

    showModal(loginModal);

}

function closeLoginModal() {

    hideModal(loginModal);

}

/*== REGISTER MODAL ==*/

function openRegisterModal() {

    closeLoginModal();

    const form = document.getElementById("register-form");

    if (form) form.reset();

    showModal(registerModal);

}

function closeRegisterModal() {

    hideModal(registerModal);

}

/*== VEHICLE DATA ==*/

const carData = {

    sedan: {

        title: "Subcompact Sedan",
        tag: "Toyota Vios or similar",
        price: "₱1,800 / day",

        desc: "The perfect choice for city driving, business trips, and everyday travel. Fuel-efficient, comfortable, and easy to drive.",

        specs: [
            "5 Seats",
            "Automatic / Manual",
            "Bluetooth Audio",
            "Dual Airbags",
            "Cold Air Conditioning",
            "Fuel Efficient"
        ],

        images: [
            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80"
        ]

    },

    suv: {

        title: "Mid-Size SUV",
        tag: "Toyota Fortuner or similar",
        price: "₱3,500 / day",

        desc: "Designed for long-distance travel with superior comfort, powerful performance, and extra luggage capacity.",

        specs: [
            "7 Seats",
            "Automatic",
            "Touchscreen Display",
            "Reverse Camera",
            "High Ground Clearance",
            "Eco / Power Mode"
        ],

        images: [
            "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
        ]

    },

    van: {

        title: "Passenger Van",
        tag: "Toyota Hiace Grandia or similar",
        price: "₱4,500 / day",

        desc: "Ideal for family vacations, company outings, airport transfers, and group adventures.",

        specs: [
            "12 Seats",
            "Rear Air Conditioning",
            "Large Luggage Space",
            "Powerful Diesel Engine",
            "Comfortable Interior",
            "Manual / Automatic"
        ],

        images: [
            "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80"
        ]

    }

};


/*== VEHICLE DETAILS MODAL ==*/

function openDetailsModal(vehicleKey) {

    currentOpenCar = vehicleKey;

    const vehicle = carData[vehicleKey];

    if (!vehicle) return;

    document.getElementById("modal-title").textContent = vehicle.title;
    document.getElementById("modal-tag").textContent = vehicle.tag;
    document.getElementById("modal-price").textContent = vehicle.price;
    document.getElementById("modal-desc").textContent = vehicle.desc;

    // Main Image
    document.getElementById("modal-main-img").src = vehicle.images[0];

    // Gallery
    document.getElementById("thumb-1").src = vehicle.images[0];
    document.getElementById("thumb-2").src = vehicle.images[1];
    document.getElementById("thumb-3").src = vehicle.images[2];

    // Specifications
    const specsContainer = document.getElementById("modal-specs");

    specsContainer.innerHTML = "";

    vehicle.specs.forEach(spec => {

        specsContainer.innerHTML += `
            <li class="flex items-center gap-2">
                <i class="fa-solid fa-circle-check text-amber-500"></i>
                ${spec}
            </li>
        `;

    });

    showModal(detailsModal);

}


/*== CLOSE VEHICLE DETAILS ==*/

function closeDetailsModal() {

    hideModal(detailsModal);

}


/*== IMAGE GALLERY ==*/

function swapImage(image) {

    document.getElementById("modal-main-img").src = image;

}


/*== BOOK FROM VEHICLE DETAILS ==*/

function handleBookFromDetails() {

    closeDetailsModal();

    openBookingModal(currentOpenCar);

}

/*== LOGIN ==*/

function handleLogin(event) {

    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const success = loginUser(email, password);

    if (!success) return;

    closeLoginModal();

    updateNavbar();

    // Continue pending booking
    if (pendingBookingCar !== "") {

        const vehicle = pendingBookingCar;

        pendingBookingCar = "";

        openBookingModal(vehicle);

    }

}


/*== REGISTER ==*/

function handleRegister(event) {

    event.preventDefault();

    const firstName = document.getElementById("reg-fname").value.trim();
    const lastName = document.getElementById("reg-lname").value.trim();
    const address = document.getElementById("reg-address").value.trim();
    const email = document.getElementById("reg-email").value.trim();

    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    // Password Strength Validation
    const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPassword.test(password)) {
        alert(
            "Password must be at least 8 characters and contain:\n\n" +
            "• One uppercase letter\n" +
            "• One lowercase letter\n" +
            "• One number\n" +
            "• One special character"
        );
        return;
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const success = registerUser(
        firstName,
        lastName,
        address,
        email,
        password
    );

    if (!success) return;

    alert("Registration successful! Please login.");

    closeRegisterModal();
    openLoginModal();
}


/*== CLOSE MODALS WHEN CLICKING OUTSIDE ==*/

window.addEventListener("click", (event) => {

    if (event.target === bookingModal)
        closeBookingModal();

    if (event.target === detailsModal)
        closeDetailsModal();

    if (event.target === loginModal)
        closeLoginModal();

    if (event.target === registerModal)
        closeRegisterModal();

});


/*== INITIALIZE PAGE ==*/

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    closeBookingModal();
    closeDetailsModal();
    closeLoginModal();
    closeRegisterModal();

});


/*== INITIALIZE PAGE ==*/

document.addEventListener("DOMContentLoaded", () => {

    updateNavbar();

});