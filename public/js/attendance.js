function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

const showRegisterBox = function(){
  let registerBox = document.querySelector('.registerBox');
  registerBox.style.visibility = 'visible';
  let close = document.querySelector('.close');
  close.onclick = ()=>{
    registerBox.style.visibility = 'hidden';
  }
}

const setRegisterOnclick = function(){
  let registerButton = document.querySelector('#register');
  registerButton.onclick = showRegisterBox;
}

window.onload = setRegisterOnclick;
