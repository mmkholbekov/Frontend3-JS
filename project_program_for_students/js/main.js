// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}

// SLIDER BLOCK

const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
let index = 0

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.style.opacity = 0
        slide.classList.remove('active_slide')
    })
}
const showSlide = (i = 0) => {
    slides[i].style.opacity = 1
    slides[i].classList.add('active_slide')
}

hideSlide()
showSlide(index)


const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > slides.length - 1) {
            i = 0
        }
        hideSlide()
        showSlide(i)
    }, 10000)
}

next.onclick = () => {
    index < slides.length - 1 ? index++ : index = 0
    hideSlide()
    showSlide(index)
}

prev.onclick = () => {
    index > 0 ? index-- : index = slides.length - 1
    hideSlide()
    showSlide(index)
}

autoSlider(index)


// GET Запрос CARS
const wrapperAutos = document.querySelector('.wrap')

const getCards = () => {
    const request = new XMLHttpRequest()
    request.open('GET', 'data/cars.json')
    request.setRequestHeader('Content-type', 'application/json')
    request.send();

    request.onload = () => {
        const cars = JSON.parse(request.response)

        cars.forEach((auto) => {
            const autoBlock = document.createElement('div')
            autoBlock.classList.add('autoBlock')

            autoBlock.innerHTML = `
                <div class="autoPhoto">
                    <img src="${auto.photo}" alt="${auto.model}">
                </div>
                <p>Model: ${auto.model}</p>
                <p>Generation: ${auto.generation}</p>
                <p>Car body: ${auto.body}</p>
                <p>Price: ${auto.price}</p>
            `

            wrapperAutos.append(autoBlock)
        })
    }
}
getCards();

// XMLHttpRequest запрос на JSON файл
const request = new XMLHttpRequest()
request.open('GET', 'data/data.json')
request.setRequestHeader('Content-type', 'application/json')
request.send()

request.onload = function () {
  if (request.status === 200) {
    const jsonData = JSON.parse(request.responseText)

    console.log(jsonData)
  } else {
    console.error('Ошибка при загрузке данных:', request.statusText)
  }
};
