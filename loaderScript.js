// window.addEventListener("load", () => {
//     const loader = document.querySelector('.loader');
//     loader.classList.add('loader--hidden');
//     loader.addEventListener('transitionend', () => {
//         document.body.removeChild(loader)
//     })
// })

setTimeout(() => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader--hidden');
    loader.addEventListener('transitionend', () => {
        //document.body.removeChild(loader)
    })
}, 6000)
