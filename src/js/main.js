let loginCheck = sessionStorage.getItem("current")

document.addEventListener("DOMContentLoaded", function () {
    if (loginCheck == null) {
        location.href = "http://127.0.0.1:5502/src/index.html"
    } else {
        console.log("Авторизован")
    }
})

window.addEventListener("unload", function () {
    mainInstance.post("auth/logout", { email: sessionStorage.current, logoutDateTime: (new Date).toISOString() }).then((response) => {
        sessionStorage.removeItem("current");
    })
});


$(function () { //DOM Ready

    $(".gridster ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [146, 146],
        min_cols: 7,
        resize: {
            enabled: true,
            max_size: [4, 2],
            min_size: [1, 1]
        }
    });

});

let $burger = $("#burger-menu");
let $burgerMenu = $(".burger-nav")
$burger.on("click", function () {
    $burgerMenu.toggleClass("show")
})
let $logout = $("#logout")

const mainInstance = axios.create({
    baseURL: "https://localhost:5050/api"
})

$logout.on("click", function () {
    mainInstance.post("auth/logout", { email: sessionStorage.current, logoutDateTime: (new Date).toISOString() }).then((response) => {
        location.href = "http://127.0.0.1:5502/src/index.html";
        sessionStorage.removeItem("current");
    })

})

window.onbeforeunload = () => {
    mainInstance.post("auth/logout", { email: sessionStorage.current, logoutDateTime: (new Date).toISOString() }).then((response) => {
        sessionStorage.removeItem("current");
        alert("fffff")
    })
}

