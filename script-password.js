// Email Account
const validEmailAccounts = [
        {username: 'jen@example.com' },
        {username: 'kris@example.com' },
        {username: 'may@example.com' },
        {username: 'nene@example.com' },
        {username: 'weenie@example.com' },
        {username: 'alis@example.com' },
        {username: 'patty@example.com' },
    ]

const nextButton = document.getElementById('next');

nextButton.addEventListener('click', ()=>{
    const emailInput = document.getElementById('email-input').value.trim();
    const messageAlert = document.querySelector('.alert-message');
    const emailExist = validEmailAccounts.some(account=>account.username.toLowerCase() === emailInput.toLowerCase()
    ) // check case sensitive
    if(emailExist){
       document.getElementById('email-section').style.display = 'none';
       document.getElementById('password-section').style.display = 'block';      
    }else{
       messageAlert.textContent = "Email not found! Please enter a valid email."
       messageAlert.style.color = "#f90909";  
    }
    console.log(emailExist);
})

// Reset Password
const confirmButton =document.getElementById('confirm');

confirmButton.addEventListener('click', createNewPassword);

function createNewPassword (){
    const newPasswordInput = document.getElementById('new-password').value.trim();
   
    const letters =  /[A-Za-z]/;
    const numbers =  /[0-9]/;
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    const minLength =  8;

    const hasLetters = letters.test(newPasswordInput);
    const hasNumbers = numbers.test(newPasswordInput);
    const hasSpecialCharacters = specialCharacters.test(newPasswordInput);
    const meetMinLength = newPasswordInput.length >= minLength;

    const messageAlert = document.querySelector('.pass-alert-message');

   if(hasLetters && hasNumbers && hasSpecialCharacters && meetMinLength){
       messageAlert.textContent = "Your new password is complete."
       messageAlert.style.color = "#FF00FF";

        setTimeout(() => {
        window.location.href = "index.html";
        }, 2000);
        return;
   }else{
        messageAlert.textContent = "Your new password must be at least 8 characters long including letters, numbers, and special characters."
        messageAlert.style.color = "#f90909";
        return;
   }
}