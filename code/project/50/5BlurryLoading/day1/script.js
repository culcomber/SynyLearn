const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0;
let int = setInterval(blurring, 30);
function blurring () {
    load++;
    if(load > 99) {
        clearInterval(int);
    }
    loadText.innerHTML = `${load}`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
    blurring.style.filters = `blur(${scale(load, 0, 30, 0)})`
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }