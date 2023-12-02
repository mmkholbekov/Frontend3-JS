// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2597]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', async () => {
    try {
        if (regExp.test(phoneInput.value)) {
            phoneResult.innerHTML = 'OK'
            phoneResult.style.color = 'green'
        } else {
            phoneResult.innerHTML = 'NOT OK'
            phoneResult.style.color = 'red'
        }
    } catch (error) {
        console.error('Ошибка при проверке номера телефона:', error)
    }
});

// TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let currentTab = 0

const  hideTabsContent = () => {
    tabContent.forEach(tabContent => {
        tabContent.style.display = 'none'
    })
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active')
    })
}
const showTabsContent = (index = 0) => {
    tabContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}

const switchTab = () => {
    hideTabsContent()
    currentTab = (currentTab + 1) % tabs.length
    showTabsContent(currentTab)
}

hideTabsContent()
showTabsContent()
setInterval(switchTab, 3000)

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tabElement, tabIndex) => {
            if (event.target === tabElement) {
                hideTabsContent()
                currentTab = tabIndex
                showTabsContent(currentTab)
            }
        })
    }
}

// CONVERTER

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')

const converter = async (element, targetElement1, targetElement2, targetType) => {
    element.oninput = async () => {
        try {
            const request = await fetch('../data/converter.json')
            const changes = await request.json()

            switch (targetType) {
                case 'som':
                    targetElement1.value = (element.value / changes.usd).toFixed(2)
                    targetElement2.value = (element.value / changes.eur).toFixed(2)
                    break
                case 'usd':
                    targetElement1.value = (element.value * changes.usd).toFixed(2)
                    targetElement2.value = (element.value * changes.usd / changes.eur).toFixed(2)
                    break
                case 'eur':
                    targetElement1.value = (element.value * changes.eur).toFixed(2)
                    targetElement2.value = (element.value * changes.eur / changes.usd).toFixed(2)
                    break
                default:
                    break
            }

            element.value === '' && (targetElement1.value = targetElement2.value = '')
        } catch (error) {
            console.error('Ошибка при конвертации валюты:', error)
        }
    }
}

converter(somInput, usdInput, eurInput, 'som')
converter(usdInput, somInput, eurInput, 'usd')
converter(eurInput, somInput, usdInput, 'eur')

// CARD SWITCHER

const card = document.querySelector('.card'),
btnPrev = document.querySelector('#btn-prev'),
btnNext = document.querySelector('#btn-next')

let count = 1

const updateCard = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        const data = await response.json()
        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
        `
    } catch (error) {
        console.error('Ошибка при обновлении карточки:', error)
    }
}

const changeCard = (direction) => {
    if (direction === 'next') {
        count = (count % 200) + 1
    } else if (direction === 'prev') {
        count = (count - 2 + 200) % 200 + 1
    }

    updateCard()
}

btnNext.onclick = () => {
    changeCard('next')
}

btnPrev.onclick = () => {
    changeCard('prev')
}

updateCard()

// SEARCH WEATHER

const citySearchInput = document.querySelector('.cityName'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')

const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

// Optional changing - .?
citySearchInput.oninput = async (event) => {
    try {
        const response = await fetch(`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
        const data = await response.json()

        city.innerHTML = data?.name ? data?.name : 'Город не найден...'
        temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
    } catch (error) {
        console.error('Ошибка при поиске погоды:', error)
    }
}
