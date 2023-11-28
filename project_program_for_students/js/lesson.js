// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2597]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click',() => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
})

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

const converter = (element, targetElement1, targetElement2, targetType) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open("GET", "../data/converter.json")
        request.setRequestHeader('Content-type', 'application/json')
        request.send()

        request.onload = () => {
            const changes = JSON.parse(request.response)
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
                default:
                    break
            }
            element.value === '' && (targetElement1.value = targetElement2.value = '')
        }
    }
}
converter(somInput, usdInput, eurInput, 'som');
converter(usdInput, somInput, eurInput, 'usd');
converter(eurInput, somInput, usdInput, 'eur');

// CARD SWITCHER

const card = document.querySelector('.card'),
btnPrev = document.querySelector('#btn-prev'),
btnNext = document.querySelector('#btn-next')

let count = 1

function updateCard() {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `
        })
}

function changeCard(direction) {
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
