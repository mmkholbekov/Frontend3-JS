// MODAL

const modal = document.querySelector('.modal')
const modalCloseButton = document.querySelector('.modal_close')
const triggerModal = document.querySelector('#btn-get')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

triggerModal.onclick = () => openModal()
modalCloseButton.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}


//  Вызывать модальное окно по скролу до конца страницы
const scrollHandler = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal()
        window.removeEventListener('scroll', scrollHandler)
    }
}
window.addEventListener('scroll', scrollHandler)

// Вызывать модальное окно через 10 секунд после открытия сайта
setTimeout(() => {
    openModal()
    window.removeEventListener('scroll', scrollHandler)
}, 10000)



// POST DATA FETCH ЗАПРОС
const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: data,
        })

        const responseData = await response.json()
        console.log('Ответ на POST запрос:', responseData)
    } catch (error) {
        console.error('Ошибка при выполнении POST запроса:', error)
    }
}

const bindPostData = (form) => {
    form.onsubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(form)
        const obj = {}
        formData.forEach((item, index) => {
            obj[index] = item
        });
        const json = JSON.stringify(obj)

        postData('server.php', json)
    }
}

const getData = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log('Ответ на GET запрос:', data)
    } catch (error) {
        console.error('Ошибка при выполнении GET запроса:', error)
    }
};

// Вызывать GET запрос
getData('https://jsonplaceholder.typicode.com/posts')



