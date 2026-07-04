/* == Update Navigation Bar == */

function updateNavbar() {

    const loginBtn = document.getElementById("login-btn");

    // Stop if the button doesn't exist
    if (!loginBtn) return;

    const currentUser = getCurrentUser();

    // User is logged in
    if (currentUser) {
        
        loginBtn.innerHTML = `
            <i class="fa-solid fa-user me-2"></i>
            ${currentUser.firstName}
        `;

        loginBtn.classList.remove(
            "bg-amber-500",
            "hover:bg-amber-600",
            "text-stone-950"
        );

        loginBtn.classList.add(
            "bg-stone-800",
            "hover:bg-stone-700",
            "text-white"
        );

        loginBtn.onclick = logoutUser;

        return;
    }

    // User is not logged in
    loginBtn.innerHTML = "Login";

    loginBtn.classList.remove(
        "bg-stone-800",
        "hover:bg-stone-700",
        "text-white"
    );

    loginBtn.classList.add(
        "bg-amber-500",
        "hover:bg-amber-600",
        "text-stone-950"
    );

    loginBtn.onclick = openLoginModal;
}

/* =========================================
   Initialize UI
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateNavbar();

});