// Login-------------------------

const userInput = document.getElementById('username_email-input');
const passwordInput = document.getElementById('password-input');
const loginButton = document.querySelector('button');

loginButton.addEventListener('click', (e)=>{
    e.preventDefault();
    validateAccount();  
});

function validateAccount(){
    const userValue = userInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const message = document.querySelector('.message'); 
          message.style.color = "red";

    if (userValue === "") {
        return message.textContent = "Please enter your username or email.";
    }
    if (passwordValue === "") {
        return message.textContent = "Please enter your password.";
    }
    //  assume datas, real case need to fetch from backend
    const assumeCorrectUsers = [
        {username: 'jen@example.com' , password: 'jen111'},
        {username: 'kris@example.com' , password: 'kris222'},
        {username: 'may@example.com' , password: 'may333'},
        {username: 'nene@example.com' , password: 'nene444'},
        {username: 'weenie' , password: 'wee555'},
        {username: 'alis' , password: 'alis666'},
        {username: 'patty' , password: 'patty666'},
    ]

    const validUser = assumeCorrectUsers.find(user=>
       user.username === userValue && user.password === passwordValue    
    );    //implicit return

    if(validUser){
        message.textContent = "Successful log in!🦉"
        message.style.color = "#FF00FF";
        message.style.fontSize = '1.2rem';
        
        setTimeout(() => {
        window.location.href = "chatpage.html";
        }, 2000);
        return;
    }else{
        return message.textContent = "Invalid user and password. Please enter your account correctly." ;
    }
}
   
// Register---------------------------------------

const usernameInput = document.getElementById('username-input');
const emailInput = document.getElementById('email-input');
const createPasswordInput = document.getElementById('create-password-input');
const repeatPasswordInput = document.getElementById('repeat-password-input');
const registerMessage = document.querySelector('.alert-message'); 
const registerButton = document.querySelector('button');

  registerButton.addEventListener('click',(e)=>{
     e.preventDefault();
     createAccount();
  });
    
function createAccount(){
    const usernameValue = usernameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const createPasswordValue = createPasswordInput.value.trim();
    const repeatPasswordValue = repeatPasswordInput.value.trim();

    const inputFields = [
        { input: usernameValue, message: "Please create your username." },
        { input: emailValue, message: "Please enter your email." },
        { input: createPasswordValue, message: "Please create your password." },
        { input: repeatPasswordValue, message: "Please repeat your password." }
    ];
    
    let blankFields = inputFields.filter(field=>field.input ==="")
    if(blankFields.length === 1){      //  must be 1 blank field then specific error appears
        registerMessage.style.color = "red";           
        return registerMessage.textContent = blankFields[0].message;  // [0] target message for one blank field
    }
    if(blankFields.length > 1){
        registerMessage.style.color = "red";
        return registerMessage.textContent = "Please complete registration";
    }
    if(passwordStrong(createPasswordValue) !== passwordStrong(repeatPasswordValue)){
        registerMessage.style.color = "red";
        return registerMessage.textContent = "Passwords do not match. Please enter matching password."
    }

    if(!passwordStrong(createPasswordValue)){
        registerMessage.style.color = "red";
        registerMessage.textContent = "Your new password must be at least 8 characters long including letters, numbers, and special characters."
        return;
    }
    registerMessage.style.color = "#FF00FF";
    registerMessage.textContent = "Registration successful!";
    
    setTimeout(() => {
    window.location.href = "main.html";
    }, 2000);
 }

 // check Boolean true or false
function passwordStrong (password){
    const letters =  /[A-Za-z]/;
    const numbers =  /[0-9]/;
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    const minLength =  8;
         
    return letters.test(password) &&
           numbers.test(password) &&
           specialCharacters.test(password) &&
           password.length >= minLength;  
} 

 