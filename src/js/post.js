const button = document.querySelector(".test-button");
button.onclick = function () {
    let xhr = new XMLHttpRequest();
    xhr.open(`POST`, url);
    xhr.send(["Mechapa@gmail.ru", "1234"]);
    if (xhr.status != 200) {
        alert("Ищи ошибки");
    } else {
        alert("Ну привет")
    }
}