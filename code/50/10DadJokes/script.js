const jokeEl = document.getElementById('joke')
const jokeBtn = document.getElementById('jokeBtn')

jokeBtn.addEventListener('click', generateJoke);

generateJoke();

// then
// function generateJoke() {
//     const config = {
//         headers: {
//             Accept: 'application/json',
//         }
//     }
//     fetch('https://icanhazdadjoke.com', config)
//       .then((response) => response.json())
//       .then((data) => {
//         jokeEl.innerHTML = data.joke;
//       })
// }

// async/await 
async function generateJoke() {
    const config = {
        headers: {
            Accept: 'application/json',
        }
    }

    // todo fetch json
    const res = await fetch('https://icanhazdadjoke.com', config);
    const data = await res.json();
    jokeEl.innerText = data.joke;
}