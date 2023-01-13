let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let slider = document.getElementById('contenedor_pelis')

prev.addEventListener('click', ()=>{
    slider.scrollLeft -= 1000;
})

next.addEventListener('click', () =>{
    slider.scrollLeft += 1000;
})