//acnhors jquerry
$('.scrollto a').on('click', function() {

  let href = $(this).attr('href');

  $('html, body').animate({
      scrollTop: $(href).offset().top
  }, {
      duration: 770,   // по умолчанию «400» 
      easing: "linear" // по умолчанию «swing» 
  });

  return false;
});
//accordion

document.querySelectorAll('.item-catalog__btn').forEach((item) =>
  item.addEventListener('click', () => {
    const parent = item.parentNode;

    if (parent.classList.contains('catalog__item--active')) {
        parent.classList.remove('catalog__item--active');
    } else {
        document
          .querySelectorAll('.catalog__item')
          .forEach((child) => child.classList.remove('catalog__item--active'))

          parent.classList.add('catalog__item--active');
    }
  })
)
//form
"use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error===0) {
      // form.classList.add('_sending');
      const btnOpen = document.getElementById('btn-open');
      const btnClose = document.getElementById('btn-close');
      const modal = document.getElementById('wrapper-modal');
      const overlay = document.getElementById('modal-overlay');

      btnOpen.addEventListener('click', () => {
          modal.classList.add('active');
      })

      const closeModal = () => {
          modal.classList.remove('active');
      }

      btnClose.addEventListener('click', closeModal);
      overlay.addEventListener('click', closeModal);

    } else {
      alert('Заполните все обязательные поля!');
    }
  }


  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req')

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if(input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
          if (input.value === '') {
            formAddError(input);
            error++;
          }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  //Функция места email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

//animaton
let animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params) {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if(animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_active');
      } else {
        if(!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
  animOnScroll();
}
//parallax
const scene = document.getElementById('scene');
const parallaxInstance = new Parallax(scene);

//preloader 

let mask = document.querySelector('.mask');

window.addEventListener('load', () => {
  mask.classList.add('hide');
  setTimeout(() => {
    mask.remove();
  }, 3000)
});