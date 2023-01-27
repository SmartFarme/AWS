// Аргументами функции будут:
// - функция, которую надо «откладывать»;
// - интервал времени, спустя которое функцию следует вызывать.
function debounce(callee, timeoutMs) {
    // Как результат возвращаем другую функцию.
    // Это нужно, чтобы мы могли не менять другие части кода,
    // чуть позже мы увидим, как это помогает.
    return function perform(...args) {
        // В переменной previousCall мы будем хранить
        // временную метку предыдущего вызова...
        let previousCall = this.lastCall

        // ...а в переменной текущего вызова —
        // временную метку нынешнего момента.
        this.lastCall = Date.now()

        // Нам это будет нужно, чтобы потом сравнить,
        // когда была функция вызвана в этот раз и в предыдущий.
        // Если разница между вызовами меньше, чем указанный интервал,
        // то мы очищаем таймаут...
        if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer)
        }

        // ...который отвечает за непосредственно вызов функции-аргумента.
        // Обратите внимание, что мы передаём все аргументы ...args,
        // который получаем в функции perform —
        // это тоже нужно, чтобы нам не приходилось менять другие части кода.
        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)

        // Если таймаут был очищен, вызова не произойдёт
        // если он очищен не был, то callee вызовется.
        // Таким образом мы как бы «отодвигаем» вызов callee
        // до тех пор, пока «снаружи всё не подуспокоится».
    }
}

const login_alert = document.querySelector(".login-alert")
const name_input = document.querySelector(".name-input")
const password_input = document.querySelector(".password-input")
const button = document.querySelector(".test-button");
const instance = axios.create({
    baseURL: 'https://localhost:5050/api/users',
});
function login() {
    instance.post("auth", { email: name_input.value, password: password_input.value }).then(() => {
        alert('Все введено верно!');
        console.log(name_input.value)

        function1()
    })
        .catch((error) => {
            login_alert.classList.remove("hide-login-error")
            password_input.value = ""
            console.log(error);
        });
}

const debounseLogin = debounce(login, 3000)

password_input.addEventListener('input', debounseLogin)

function function1() {
    function zero_first_format(value) {
        if (value < 10) {
            value = '0' + value;
        }
        return value;
    }

    /* функция получения текущей даты и времени */
    function date_time() {
        var current_datetime = new Date();
        var day = zero_first_format(current_datetime.getDate());
        var month = zero_first_format(current_datetime.getMonth() + 1);
        var year = current_datetime.getFullYear();
        var hours = zero_first_format(current_datetime.getHours());
        var minutes = zero_first_format(current_datetime.getMinutes());
        let time = day + "." + month + "." + year + " " + hours + ":" + minutes;
        login_li.appendChild(document.createTextNode(`${time}` + "  " + `${name_input.value}`));
        login_li.setAttribute("id", "login-item"); // added line
        login_ul.appendChild(login_li);
    }
    let login_ul = document.getElementById("login-list");
    let login_li = document.createElement("li");
    date_time()

}