document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()

        const cardContainer = document.getElementById('card-container')

        data.forEach(post => {
            const card = document.createElement('div')
            card.classList.add('cards_block')

            const image = document.createElement('img')
            image.src = 'data:image/png;base64,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'

            const title = document.createElement('h2')
            title.textContent = post.title

            const description = document.createElement('p')
            description.textContent = post.body

            card.appendChild(image)
            card.appendChild(title)
            card.appendChild(description)

            cardContainer.appendChild(card)
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }
})
function truncateText(text, maxLength) {
    return text.length > maxLength
        ? text.substring(0, maxLength) + '...'
        : text
}
