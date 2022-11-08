window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }


// const button1 = document.querySelector('.button1')
// const button2 = document.querySelector('.button2')
// const button3 = document.querySelector('.button3')
// const button4 = document.querySelector('.button4')
// const button5 = document.querySelector('.button5')
// const button6 = document.querySelector('.button6')
// const button7 = document.querySelector('.button7')
// const button8 = document.querySelector('.button8')
// const button9 = document.querySelector('.button9')

const OrignalPoster = document.querySelector(".OriginalPoster")
// const frame1 = document.querySelector('.frame1')
// const frame2 = document.querySelector('.frame2')
const NewImageURLs = ["Images/New/leaves.png", "Images/New/grass.png", "Images/Orig/logoOrig.png", "Images/New/rapunzel.png" ,"Images/New/tree.png", "Images/New/sidechar.png", "Images/New/tower.png", "Images/New/cliff.png", "Images/New/cliff.png"]

const OrigXMovement = [-2, 5, -20, 0, -15, 20, -30, -30, 15, 30, 0, 0]
const OrigYMovement = [-15, 15, 6, 0, -30, 0, 0, 0, -35, 60, 0, 0]
const OrigZMovement = [5, -2, 2, 0, -1, -3, -8, -8, -9, -10, 0, 0]

const OrigXMovementLeft = OrigXMovement.map(function(x) {return x*2})
const OrigYMovementTop = OrigYMovement.map(function(x) {return x*1.8})


const ROTATEX_FACTOR = -0.05
const ROTATEY_FACTOR = 0.09
const Z_INDEX_FACTOR = 0.1
let images = document.querySelectorAll('.image')
const ImagesWithoutFrames = document.querySelectorAll('.image')
const container = document.querySelector('.container')
let mouseenterCounter = 0
let containerLocation = container.getBoundingClientRect()
let containerHeight = container.offsetHeight
let containerWidth = container.offsetWidth
let yCalibration = containerLocation.y + containerHeight/2
let xCalibration = containerLocation.x + containerWidth/2

let controllerExpansion = new AbortController;
let controllerInPlace = new AbortController;

function OrigExpansion() {
    ImagesWithoutFrames.forEach(function (image, i) {
        
         OrigMoveXY(image, OrigXMovementLeft[i], OrigYMovementTop[i])
         image.style.filter = "drop-shadow(5px 5px 5px #222)"
        
    })
    OrignalPoster.style.opacity = "0"
}

function OrigMoveXY(image, x, y){
    image.style.left = `${x}vw`
    image.style.top = `${y}vh`
}

function OrigMove(image, x, y , z = 0){
    image.style.left = `${x}vw`
    image.style.top = `${y}vh`
    image.style.transform = `translateZ(${z}cm)`
}

function ApplyZMovement(){
    ImagesWithoutFrames.forEach(function (image, i) {
        
        OrigMove(image, OrigXMovementLeft[i], OrigYMovementTop[i], OrigZMovement[i])
        
    })
}

// button1.addEventListener('click', () => {
//     OrigExpansion()
// })

// button2.addEventListener('click', () => {
//     ApplyZMovement()
// })

// button3.addEventListener('click', () => {
//     ApplyRotationExpanded()
// })

// button4.addEventListener('click', () => {
//     OrigExpansionRevert()
// })

// button5.addEventListener('click', () => {
//     OrigExpansion2()
// })

// button6.addEventListener('click', () => {
//     OrigToFinal()
// })

// button7.addEventListener('click', () => {
//     OrigExpansionRevert2()
// })

// button8.addEventListener('click', () => {
//     AddFrame()
// })

// button9.addEventListener('click', () => {
//     AddShadowTextLogo()
// })

function OrigExpansionRevert() {
    ImagesWithoutFrames.forEach(function (image) {
        image.style.transition = "transform 1s ease-out, left 1s ease-out, top 1s ease-out, filter 2s ease-in"
        image.style.filter = "none"
        OrigMoveXY(image, 0, 0)
        removeExpandedEventListeners()
        ApplyRotationNoZ()
    })
}

function ApplyRotationExpanded() {
    ImagesWithoutFrames.forEach((image) => {
        image.style.transition = "transform 0.2s ease-out, left 2s ease-in, top 2s ease-in, filter 2s ease-in"
    })
    container.addEventListener('mousemove', (event) => {
        ImagesWithoutFrames.forEach((image, i) => {
            
            image.style.transform = `translateZ(${OrigZMovement[i]}cm) rotateX(${ROTATEX_FACTOR*(window.getComputedStyle(image).zIndex * Z_INDEX_FACTOR * (event.clientY - yCalibration)/containerHeight)}turn) rotateY(${ROTATEY_FACTOR * window.getComputedStyle(image).zIndex * Z_INDEX_FACTOR * (event.clientX - xCalibration)/containerWidth}turn)`
        })
    }, { signal: controllerExpansion.signal })
    
    container.addEventListener('mouseleave', () => {
        ImagesWithoutFrames.forEach((image) => {
            image.style.transition = "transform 1s ease-out, left 2s ease-in, top 2s ease-in, filter 2s ease-in"
        })
        ImagesWithoutFrames.forEach((image, i) => {
            image.style.transform = `translateZ(${OrigZMovement[i]}cm)`
        })
        
    }, { signal: controllerExpansion.signal })
    
    container.addEventListener('mouseenter', () => {
        containerLocation = container.getBoundingClientRect()
        containerHeight = container.offsetHeight
        containerWidth = container.offsetWidth
        yCalibration = containerLocation.y + containerHeight/2
        xCalibration = containerLocation.x + containerWidth/2
        ImagesWithoutFrames.forEach((image) => {
            image.style.transition = "transform 0.2s ease-out, left 2s ease-in, top 2s ease-in, filter 2s ease-in"
        })
    
    }, { signal: controllerExpansion.signal })

}

function ApplyRotationNoZ() {
    images.forEach((image) => {
        image.style.transition = "transform 0.2s ease-out, left 2s ease-in, top 2s ease-in, width 2s ease-in, height 2s ease-in, filter 2s ease-in"
    })
    container.addEventListener('mousemove', (event) => {
        images.forEach((image, i) => {
           image.style.transform = `rotateX(${ROTATEX_FACTOR*(window.getComputedStyle(image).zIndex * Z_INDEX_FACTOR * (event.clientY - yCalibration)/containerHeight)}turn) rotateY(${ROTATEY_FACTOR * window.getComputedStyle(image).zIndex * Z_INDEX_FACTOR * (event.clientX - xCalibration)/containerWidth}turn)`
        })
    }, { signal: controllerInPlace.signal })
    
    container.addEventListener('mouseleave', () => {
        images.forEach((image) => {
            image.style.transition = "transform 1s ease-out, left 2s ease-in, top 2s ease-in, width 2s ease-in, height 2s ease-in, filter 2s ease-in"
            image.style.transform = ""
        })
        
    
    }, { signal: controllerInPlace.signal })
    
    container.addEventListener('mouseenter', () => {
        containerLocation = container.getBoundingClientRect()
        containerHeight = container.offsetHeight
        containerWidth = container.offsetWidth
        yCalibration = containerLocation.y + containerHeight/2
        xCalibration = containerLocation.x + containerWidth/2
        images.forEach((image) => {
            image.style.transition = "transform 0.2s ease-out, left 2s ease-in, top 2s ease-in, width 2s ease-in, height 2s ease-in, filter 2s ease-in"
        })
    
    }, { signal: controllerInPlace.signal })

}

function OrigExpansion2() {
    removeInPlaceEventListeners()
    
    ImagesWithoutFrames.forEach(function (image, i) {
        image.style.transform = ""
        OrigMoveXY(image, OrigXMovement[i], OrigYMovement[i])
    })
    ApplyZMovement()
    OrigExpansion()
}

function OrigToFinal() {
    document.querySelector(".GrassOrig").style.width = "21.2vw"
    document.querySelector(".GrassOrig").style.height = "31.5vw"
    document.querySelector(".TreeOrig").style.width = "20.6vw"
    document.querySelector(".BackCliffOrig").style.width = "21.2vw"
    images.forEach(function (image, i) {
        if(i < 9) {
            image.style.transition = "transform 3s ease-out, background 3s ease-in, left 3s ease-in, top 3s ease-in, filter 2s ease-in"
            image.style.backgroundImage = `url(${NewImageURLs[i]})`
        }
        else if(i == 9) {
            image.style.transition = "transform 3s ease-out, opacity 1.5s ease-in, filter 2s ease-in"
            image.style.opacity = "0"
            setTimeout(function() {
                image.style.background = "linear-gradient(to right, rgb(57, 177, 224), rgb(61, 200, 255), #cbeeff)"
                image.style.opacity = "1"
                image.style.width = "21.6vw"
            }, 1500)
        }
    })
}

function OrigExpansionRevert2() {
    images.forEach(function (image) {
        OrigMoveXY(image, 0, 0)
        image.style.filter = "none"
    })
    ApplyRotationNoZ()
}

function AddFrame() {
    const frame1 = document.createElement("div")
    const frame2 = document.createElement("div")
    frame1.classList.add("frame1")
    frame1.classList.add("Orig")
    frame1.classList.add("image")
    frame2.classList.add("Orig")
    frame2.classList.add("image")
    frame2.classList.add("frame2")

    container.appendChild(frame1)
    container.appendChild(frame2)


    images = document.querySelectorAll(".image")
    removeInPlaceEventListeners()
    ApplyRotationNoZ()

    setTimeout(function() {
        frame1.style.left = "0px"
        frame2.style.left = "0px"
    }, 25)
    
}

function AddShadowTextLogo() {
    const shadow = document.createElement("div")
    const posterText = document.createElement("div")
    shadow.classList.add("shadow")
    shadow.classList.add("Orig")
    shadow.classList.add("image")
    posterText.classList.add("posterText")
    posterText.classList.add("image")
    posterText.classList.add("Orig")

    container.appendChild(shadow)
    container.appendChild(posterText)

    images = document.querySelectorAll(".image")
    removeInPlaceEventListeners()
    ApplyRotationNoZ()

    document.querySelector(".LogoOrig").style.top = "-25vw"
    document.querySelector(".LogoOrig").style.width = "42vw"
    document.querySelector(".LogoOrig").style.height = "63vw"
    shadow.style.width = "24vw"
    shadow.style.height = "36vw"
    setTimeout(function() {
        shadow.style.left = "0px"
        posterText.style.left = "0px"
    }, 25)
}

function removeExpandedEventListeners() {
    controllerExpansion.abort()
    controllerExpansion = new AbortController;
}

function removeInPlaceEventListeners() {
    controllerInPlace.abort()
    controllerInPlace = new AbortController;
}


const markers = document.querySelectorAll(".marker")
const markerFunctions = [OrigExpansion, ApplyZMovement, ApplyRotationExpanded, OrigExpansionRevert, OrigExpansion2, OrigToFinal, OrigExpansionRevert2, AddFrame, AddShadowTextLogo]

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(function (entry) {
            if(entry.isIntersecting) {
                markerFunctions[`${entry.target.innerHTML}`]()
                observer.unobserve(entry.target)
            }
        })
    }
)

markers.forEach(marker => {
    observer.observe(marker)
})

const texts = document.querySelectorAll(".text")
const Textobserver = new IntersectionObserver(
    entries => {
        entries.forEach(function (entry) {
                entry.target.classList.toggle("show", entry.isIntersecting)
                if(entry.isIntersecting) Textobserver.unobserve(entry.target)
        })
    }, {threshold: 0.6}
)

texts.forEach(text => {
    Textobserver.observe(text)
})