const navlinks = document.getElementById('navlinks');
const menubar = document.getElementById('menubar');


menubar.addEventListener('click', ()=>{
    navlinks.classList.toggle('active');

})