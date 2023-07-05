const navlinks = document.getElementById('navlinks');
const menubar = document.getElementById('menubar');


menubar.addEventListener('click', ()=>{
    navlinks.classList.toggle('active');

})



// for pop up box 
document.getElementById('ytvdoshow').addEventListener('click', function(){
    document.querySelector('.popup').style.display = 'flex';
})


document.querySelector(".closebtn").addEventListener('click', function(){
    document.querySelector('.popup').style.display = 'none';
})



//  log in or what ever pop up box for 3 sec 

const pop_Up_Container = document.getElementById('pop_Up_Container');
const close = document.getElementById('close')


window.addEventListener('load',()=>{
   setTimeout(() => {
    pop_Up_Container.style.display= "flex";
    
   }, 2000);
})

close.addEventListener('click',()=>{
    pop_Up_Container.style.display = "none";
})