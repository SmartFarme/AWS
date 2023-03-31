
//Вывод списка последних авторизованных пользователей, с указанием времени если вход был сегодня, и даты и времени если ранее
document.addEventListener("DOMContentLoaded", function () {
    instance.get("auth/login/list").then((response) => {
        let lastLogin = response.data.slice(-5).reverse()
        for (i in lastLogin) {
            let checkData = new Date().getDate();
            let dateformat = new Date(lastLogin[i].loginDateTime);
            options = {
                month: 'long', day: 'numeric',
                hour12: false
            };
            options2 = {
                day: 'numeric',
            };
            options3 = {
                hour: 'numeric', minute: 'numeric',
                hour12: false
            }
            let notTodayNormalDate = new Intl.DateTimeFormat("ru", options).format(dateformat);
            let notTodayNormalDate2 = new Intl.DateTimeFormat("ru", options3).format(dateformat);
            let todayNormalDate = new Intl.DateTimeFormat("ru", options3).format(dateformat);
            let checkData2 = new Intl.DateTimeFormat("ru", options2).format(dateformat);
            let loginUl = document.getElementById("login-list");
            let loginLi = document.createElement("li");
            let loginName = document.createElement("div")
            loginName.classList.add("login-name")
            let loginTime = document.createElement("div")
            loginTime.classList.add("login-time")
            loginName.appendChild(document.createTextNode(lastLogin[i].email))
            if (checkData == checkData2) {
                loginTime.appendChild(document.createTextNode(todayNormalDate))
            } else {
                loginTime.appendChild(document.createTextNode(notTodayNormalDate + ", " + notTodayNormalDate2))
            }
            loginLi.appendChild(loginName);
            loginLi.appendChild(loginTime);
            loginUl.appendChild(loginLi);
            console.log(lastLogin[i].email + dateformat)
            loginName.onclick = function () {
                let nameInput = document.querySelector(".name-input")
                nameInput.value = loginName.innerText
            }
        }
    })

})


function debounce(callee, timeoutMs) {
    return function perform(...args) {
        let previousCall = this.lastCall
        this.lastCall = Date.now()
        if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer)
        }
        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)


    }
}

const $loginAlert = $("#login-alert")
let nameInput = document.querySelector(".name-input")
const passwordInput = document.querySelector(".password-input")
const button = document.querySelector(".test-button");



//Авторизация и вывод подсказки в случае неудачной авторизации
const instance = axios.create({
    baseURL: 'https://localhost:5050/api',
});
function login() {
    instance.post("auth/login", { email: nameInput.value, loginDateTime: (new Date).toISOString(), password: passwordInput.value }).then((response) => {
        if (response.data.authorized == true) {
            location.href = "http://127.0.0.1:5502/src/main.html";
            console.log(nameInput.value);
            sessionStorage.setItem('current', nameInput.value);
            function1()
        } else {
            $loginAlert.removeClass("hide-login-error")
            $loginAlert.text(response.data.message)
            passwordInput.value = ""
        }
    })
}



const debounseLogin = debounce(login, 3000)

passwordInput.addEventListener('input', debounseLogin)