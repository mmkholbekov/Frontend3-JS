// GMAIL CHECKER

 const gmailInput= document.querySelector('#gmail_input')
 const gmailButton= document.querySelector('#gmail_button')
 const gmailResult= document.querySelector('#gmail_result')

const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/

gmailButton.addEventListener('click', () => {
    const email = gmailInput.value;
    const isValid = isValidGmail(email);

    if (isValid) {
        gmailResult.textContent = 'Правильно';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.textContent = 'Неправильно';
        gmailResult.style.color = 'red';
    }
});

function isValidGmail(email) {
    return gmailRegex.test(email);
}