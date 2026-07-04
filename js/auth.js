// This is just for demonstration purposes.

// LocalStorage Keys
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

/*== Helper Functions ==*/

// Get all registered users
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

// Save users to LocalStorage
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/*== Register User ==*/

function registerUser(firstName, lastName, address, email, password) {

    const users = getUsers();

    // Check if email already exists
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
        alert("Email is already registered.");
        return false;
    }

    const newUser = {
        firstName,
        lastName,
        address,
        email,
        password
    };

    users.push(newUser);

    saveUsers(users);

    alert("Registration Successful!");

    return true;
}

/*== Login User ==*/

function loginUser(email, password) {

    const users = getUsers();

    const user = users.find(user =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
        alert("Incorrect email or password.");
        return false;
    }

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    );

    alert("Login Successful!");

    return true;
}

/*== Logout User ==*/

function logoutUser() {

    localStorage.removeItem(CURRENT_USER_KEY);

    location.reload();

}

/* == Current User == */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(CURRENT_USER_KEY)
    );

}

/*== Login Status == */

function isLoggedIn() {

    return getCurrentUser() !== null;

}