const ROTATEX_FACTOR = -0.05
const ROTATEY_FACTOR = 0.09
const Z_INDEX_FACTOR = 0.1
const images = document.querySelectorAll('.image')
const container = document.querySelector('.container')
let mouseenterCounter = 0
let containerLocation = container.getBoundingClientRect()
let containerHeight = container.offsetHeight
let containerWidth = container.offsetWidth
let yCalibration = containerLocation.y + containerHeight/2
let xCalibration = containerLocation.x + containerWidth/2



container.addEventListener('mousemove', (event) => {
    console.log("mousemove")
    images.forEach((image) => {
       image.style.transform = `rotateX(${ROTATEX_FACTOR*(window.getComputedStyle(image).zIndex * Z_INDEX_FACTOR * (event.clientY - yCalibration)/containerHeight)}turn) rotateY(${ROTATEY_FACTOR * window.getComputedStyle(image).zIndex * Z_INDEX_FACTOR * (event.clientX - xCalibration)/containerWidth}turn)`
    })
})

container.addEventListener('mouseleave', () => {
    console.log("mouseleave")
    images.forEach((image) => {
        image.style.transition = "transform 1s ease-out"
    })
    images.forEach((image) => {
        image.style.transform = "none"
    })
    

})

container.addEventListener('mouseenter', () => {
    console.log("mouseenter")
    containerLocation = container.getBoundingClientRect()
    containerHeight = container.offsetHeight
    containerWidth = container.offsetWidth
    yCalibration = containerLocation.y + containerHeight/2
    xCalibration = containerLocation.x + containerWidth/2
    images.forEach((image) => {
        image.style.transition = "transform 0.2s ease-out"
    })

})

alert("This app is best used on a 16:9 screen. Performance may vary based on computer processing power.")