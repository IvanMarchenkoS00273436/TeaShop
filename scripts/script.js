import { Tea } from './models/tea.js';
import { TeaController } from './controllers/teaController.js';
import { UserController } from './controllers/userController.js';

console.clear();

await TeaController.loadTeasFromJSON();
await UserController.loadUser();
console.log(UserController.users);

TeaController.updateCartCount();

let path = window.location.pathname;
let page = path.split("/").pop();

let loginbtn = document.getElementById('login-btn');
console.log(localStorage.getItem("userName")); // "null"
if(localStorage.getItem("userName") !== null && localStorage.getItem("userName") !== "null") {
    loginbtn.textContent = localStorage.getItem("userName");
    loginbtn.href = "profile.html";
} else {
    loginbtn.textContent = "Login";
    loginbtn.href = "login.html";
}


if (page == 'index.html' || page == '') {
    TeaController.renderThreeTeas(document.getElementById('main-page-container-for-teas'));
} else if (page == 'store.html') {
    TeaController.renderTeas(document.getElementById('container-for-teas'));
    TeaController.renderNamesForFilter();
    document.getElementById('filter-btn').addEventListener('click', () => {
        TeaController.renderTeas(document.getElementById('container-for-teas'));
    });
} else if (page == 'cart.html') {
    TeaController.renderTeasInBasket(document.getElementById('cart-container'));
} else if (page == 'login.html') {
    document.getElementById("login-form").addEventListener("submit", (event) => {
        UserController.signIn(event);
    });
} else if(page == 'register.html') {
    document.getElementById("register-form").addEventListener("submit", (event) => {
        UserController.signUp(event);
    });
} else if(page == 'profile.html') {
    if(localStorage.getItem("userName") == null){
        window.location.href = "login.html";
    }
    document.getElementById('welcomeProfile').textContent = 'Welcome ' + localStorage.getItem("userName");
    document.getElementById('emailProfile').textContent = 'Your email: ' + localStorage.getItem("userEmail");

    document.getElementById('log-out-btn').addEventListener('click', () => {
        UserController.logOut();
    });
}

document.querySelectorAll('.add-to-basket-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const teaId = parseInt(event.target.getAttribute('data-tea-id'));
            const tea = TeaController.getTeaById(teaId);
            TeaController.addTeaToBasket(tea);   
            TeaController.updateCartCount();
        });
    }
);