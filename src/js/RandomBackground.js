function randomBackground (min, max) {
    let random = min - 0.5 + Math.random() * (max - min +1);
    random = Math.round(random);
    console
    return random
}

let randomMain = randomBackground(1,4);

$(function() {
    $('.login-main').addClass("main-" + randomMain);
});

let url = new URL(`https://localhost:5050/api/users/auth`)

