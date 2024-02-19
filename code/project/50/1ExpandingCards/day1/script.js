// let panels = document.getElementsByClassName('card-item');
const panels = document.querySelectorAll('.card-item');

panels.forEach((panel)=>{
    panel.addEventListener('click', () => {
        removeClass();
        panel.classList.add('active');
    })
});

function removeClass () {
    panels.forEach((panel)=>{
        // panel.classList.removeClass('active');
        panel.classList.remove('active');
    });
}