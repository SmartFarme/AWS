/* eslint-disable linebreak-style */
// const loginCheck = sessionStorage.getItem('current');

// document.addEventListener('DOMContentLoaded', function() {
//   if (loginCheck == null) {
//     location.href = 'http://127.0.0.1:5502/src/index.html';
//   } else {
//     console.log('Авторизован');
//   }
// });


const $burger = $('#burger-menu');
const $burgerMenu = $('.burger-nav');
$burger.on('click', function() {
  $burgerMenu.toggleClass('show');
});
const $logout = $('#logout');

const mainInstance = axios.create({
  baseURL: 'https://localhost:5050/api',
});

$logout.on('click', function() {
  // eslint-disable-next-line max-len
  mainInstance.post('auth/logout', {email: sessionStorage.current, logoutDateTime: (new Date).toISOString()}).then((response) => {
    location.href = 'http://127.0.0.1:5502/src/index.html';
    sessionStorage.removeItem('current');
  });
});


const $widgetMenuButton = $('#widget-menu-btn');
const $widgetMenuBar = $('#sidebar');

$widgetMenuButton.on('click', function() {
  hideWidgetBar();
});

$('#grid-stack-instance-1').on('mouseover', function() {
  $widgetMenuButton.removeClass('change');
  $('#sidebar').removeClass('show-widget-bar');
});

const hideWidgetBar = function() {
  $widgetMenuButton.toggleClass('change');
  $('#sidebar').toggleClass('show-widget-bar');
};
// eslint-disable-next-line linebreak-style

$('#animals').click(function() {
  location.href = 'http://127.0.0.1:5502/src/animal.html';
});
