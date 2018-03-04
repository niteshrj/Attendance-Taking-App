function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

const showRegisterBox = function(){
  let popup = document.querySelector('.popup');
  popup.style.display = 'block';
}

const hideRegisterBox = function(){
  let popup = document.querySelector('.popup');
  popup.style.display = 'none';
}

const closePopup = function(id) {
  document.querySelectorAll(`.${id}`)[0].style.visibility = 'hidden';
  let popup = document.querySelector('.popup');
  popup.style.visibility = 'hidden';
};

const setOnClick = function(){
  let registerButton = document.querySelector('#register');
  let close = document.querySelector('.close');
  registerButton.onclick = showRegisterBox;
  close.onclick = hideRegisterBox;
}

window.onload = setOnClick;
