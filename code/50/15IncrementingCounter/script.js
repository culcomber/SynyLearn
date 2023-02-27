const counters = document.querySelectorAll('.counter')
counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
        const taeget = +counter.getAttribute('data-target');
        const c = +counter.innerText;
        const increment = taeget / 200;

        if (c < taeget) {
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1)
        } else {
            counter.innerText = target
        }
    }

    updateCounter()
})