document.addEventListener("DOMContentLoaded", function() {
    instance.get("auth/login/list").then((response) => {
        let lastLogin = response.data.slice(-5).reverse()
        for (i in lastLogin) {
            let checkData = new Date().getDate();
            let dateformat = new Date (lastLogin[i].loginDateTime);
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
            let checkData2 =  new Intl.DateTimeFormat("ru", options2).format(dateformat);
            let login_ul = document.getElementById("login-list");
            let login_li = document.createElement("li");
            let loginName = document.createElement("div")
            loginName.classList.add("login-name")
            let loginTime = document.createElement("div")
            loginTime.classList.add("login-time")
            loginName.appendChild(document.createTextNode(lastLogin[i].email))
            if (checkData == checkData2) {
                loginTime.appendChild(document.createTextNode(todayNormalDate))
            }  else {
                loginTime.appendChild(document.createTextNode(notTodayNormalDate + ", " + notTodayNormalDate2))
            }
            login_li.appendChild(loginName);
            login_li.appendChild(loginTime);
            login_ul.appendChild(login_li);
            console.log(lastLogin[i].email + dateformat)
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

const $login_alert = $("#login-alert")
const name_input = document.querySelector(".name-input")
const password_input = document.querySelector(".password-input")
const button = document.querySelector(".test-button");
const instance = axios.create({
    baseURL: 'https://localhost:5050/api',
});
function login() {
    instance.post("auth/login", { email: name_input.value, loginDateTime: (new Date).toISOString(), password: password_input.value }).then((response) => {
        if (response.data.authorized == true) {
            location.href = "http://127.0.0.1:5502/src/pages/main.html";
            console.log(name_input.value);
            sessionStorage.setItem('current', name_input.value);
            function1()
    } else {
            $login_alert.removeClass("hide-login-error")
            $login_alert.text(response.data.message)
            password_input.value = ""
    }
})
}


const debounseLogin = debounce(login, 3000)

password_input.addEventListener('input', debounseLogin)
