//import { User } from "../models/user";
export { UserController };

class UserController {
    static users = [];

    static signUp(event) {
        event.preventDefault();
        let signupNameInput = document.getElementById("signupNameInput");
        let signupEmailInput = document.getElementById("signupEmailInput");
        let signupPasswordInput = document.getElementById("signupPasswordInput");

        let user = { 
            name: signupNameInput.value, 
            email: signupEmailInput.value, 
            password: signupPasswordInput.value,
        };

        if 
        (
            signupNameInput.value == "" ||
            signupEmailInput.value == "" ||
            signupPasswordInput.value == ""
        ) 
        {
            alert("Please fill in all fields");
            return;
        }
        
        if 
        (
            this.isValidEmail(signupEmailInput.value) &&
            this.isNewEmail(signupEmailInput.value) &&
            this.isPasswordValid(signupPasswordInput.value)
        ) 
        {
            this.users.push(user);
            localStorage.setItem("users", JSON.stringify(this.users));

            console.log(this.users);
            window.location.href = "login.html";
        } else {
            alert("Invalid email or email already in use or password not valid");
        }
    }

    static async loadUser(){
        if (localStorage.getItem("users") != null) {
            this.users = JSON.parse(localStorage.getItem("users"));
        }
    }

    static isValidEmail(email) {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    static isPasswordValid(password) {
        let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    static isNewEmail(email) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                return false;
            }
        }
        return true;
    }

    static isCorrectEmailAndPassword(email, password) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email && this.users[i].password === password) {
                localStorage.setItem("userName", this.users[i].name);
                localStorage.setItem("userEmail", this.users[i].email);
                return true;
            }
        }
        return false;
    }

    static signIn(event) {
        event.preventDefault();
        let loginEmailInput = document.getElementById("loginEmail");
        let loginPasswordInput = document.getElementById("loginPassword");

        let loginEmail = loginEmailInput.value;
        let loginPassword = loginPasswordInput.value;

        if (loginEmailInput.value === "" || loginPasswordInput.value === "") {
            alert("Please fill in all fields");
            return;
        }

        if (this.isCorrectEmailAndPassword(loginEmail, loginPassword)) {
            window.location.href = "profile.html";
        } else {
            alert("Incorrect email or password");
        }
    }

    static logOut() {
        localStorage.setItem("userName", null);
        localStorage.setItem("userEmail", null);
        window.location.href = "login.html";
    }
}