// Скрипт, отвечающий за появление и сокрытие модального окна на index.html
var offer_form_toggler = document.querySelector(".offer__form-toggler");
var offer_form = document.querySelector(".offer__form");

offer_form.classList.add("offer__form--visible");

offer_form_toggler.addEventListener("click", function(event) {
  event.preventDefault();
  offer_form.classList.toggle("offer__form--visible");
});


// Скрипт, отвечающий за работу счетчиков в модальной форме index.html
var amount_adults = document.querySelector("#amount-of-adults");
var amount_children = document.querySelector("#amount-of-children");
var adult_plus = document.querySelector("#adult-plus");
var adult_minus = document.querySelector("#adult-minus");
var children_plus = document.querySelector("#children-plus");
var children_minus = document.querySelector("#children-minus");
var a = amount_adults.getAttribute("value");
var c = amount_children.getAttribute("value");

amount_adults.onchange = function() {
  a = amount_adults.value;
  amount_adults.setAttribute("value", a);
};

adult_plus.addEventListener("click", function() {
  if (a >= 0) {
    amount_adults.value = ++a;
  };
});

adult_minus.addEventListener("click", function() {
  if (a > 0) {
    amount_adults.value = --a;
  };
});

amount_children.onchange = function() {
  c = amount_children.value;
  amount_children.setAttribute("value", c);
};

children_plus.addEventListener("click", function() {
  if (c >= 0) {
    amount_children.value = ++c;
  };
});

children_minus.addEventListener("click", function() {
  if (c > 0) {
    amount_children.value = --c;
  };
});


// Скрипт, отвечающий за работу интерактивной карты Google Map Api
function initMap() {
  var sedona = {lat: 34.856154, lng: -111.796749};

  var map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 9,
    center: sedona,
    disableDefaultUI: true
  });

  var marker = new google.maps.Marker({
    position: sedona,
    map: map
  });
}
