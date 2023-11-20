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
