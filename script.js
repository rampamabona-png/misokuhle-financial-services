
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
if(menuBtn){
  menuBtn.addEventListener('click',()=>{
    nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click',()=>nav && nav.classList.remove('open'));
});
