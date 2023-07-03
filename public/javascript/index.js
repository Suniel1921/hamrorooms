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
