const divElm = document.getElementById('div');
const buttonElm = document.getElementById('button');

const clickDiv = (event) => {
    // event.stopPropagation();
    console.log('clickDiv', event)
}

const clickButton = (event) => {
    // event.stopPropagation();
    console.log('clickButton', event)
}

/*divElm.addEventListener('click', clickDiv, true);
buttonElm.addEventListener('click', clickButton, true);*/

divElm.addEventListener('click', clickDiv);
buttonElm.addEventListener('click', clickButton);