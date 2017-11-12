// Скрипт, отвечающий за доступность некоторых интерактивных элементов
var logo_area = document.querySelector(".page-header__logo-area");
var logo_img = document.querySelector(".page-header__logo");

logo_area.onfocus = function() {
  logo_img.classList.add("page-header__logo--outline");
};

logo_area.onblur = function() {
  logo_img.classList.remove("page-header__logo--outline");
};
