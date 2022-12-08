// Variables & Links & Regex

const url = 'https://goldblv.com/api/hiring/tasks/register';
const createAccountBtn = document.querySelector(
  '#create-account-btn'
);
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirmation = document.querySelector(
  '#password-confirmation'
);
const usernameError = document.querySelector('#username-error');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const passwordConfirmationError = document.querySelector(
  '#password-confirmation-error'
);

const usernameRegex = /^[A-Za-z0-9]{5,15}$/;
const onlyLettersRegex = /[A-Za-z]/;
const emailRegex = /^\S+@\S+\.\S+$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$/;

// Functions and Validations

const postDataHandler = () => {
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        return console.log(res.errors);
      } else {
        location.href = '/welcome.html';
        localStorage.setItem('userInfo', JSON.stringify(res));
        return console.log(res);
      }
    });
};

const usernameLetterValidation = () => {
  const usernameArray = username.value.split('');
  if (
    onlyLettersRegex.test(usernameArray[0]) &&
    onlyLettersRegex.test(usernameArray[usernameArray.length - 1])
  ) {
    return true;
  } else {
    return false;
  }
};

const nameCheckHandler = () => {
  if (
    username.value.match(usernameRegex) &&
    usernameLetterValidation() === true
  ) {
    console.log('Username Passed');
    usernameError.classList.add('d-none');
    return true;
  } else {
    usernameError.classList.remove('d-none');
  }
};

const emailCheckHandler = () => {
  if (String(email.value).toLowerCase().match(emailRegex)) {
    console.log('Email Passed');
    emailError.classList.add('d-none');
    return true;
  } else {
    emailError.classList.remove('d-none');
  }
};

const passwordCheckHandler = () => {
  if (password.value.match(passwordRegex)) {
    console.log('Password Passed');
    passwordError.classList.add('d-none');
    return true;
  } else {
    console.log('Wrong Password Format ');
    passwordError.classList.remove('d-none');
  }
};

const passwordConfirmationCheckHandler = () => {
  if (password.value === passwordConfirmation.value) {
    console.log('Password Confirmation Passed');
    passwordConfirmationError.classList.add('d-none');
    return true;
  } else {
    console.log('Passwords do not match!');
    passwordConfirmationError.classList.remove('d-none');
  }
};

const clearInputsHandler = () => {
  username.value = null;
  email.value = null;
  password.value = null;
  passwordConfirmation.value = null;
};

// Form on Submit

const formSubmitHandler = (e) => {
  e.preventDefault();
  if (
    nameCheckHandler() &&
    emailCheckHandler() &&
    passwordCheckHandler() &&
    passwordConfirmationCheckHandler()
  ) {
    postDataHandler();
    username.disabled = true;
    email.disabled = true;
    password.disabled = true;
    passwordConfirmation.disabled = true;
    username.setAttribute('placeholder', '');
    email.setAttribute('placeholder', '');
    password.setAttribute('placeholder', '');
    passwordConfirmation.setAttribute('placeholder', '');
  }

  clearInputsHandler();
  console.log('Hello World');
};

// Eventlisteners

createAccountBtn.addEventListener('click', formSubmitHandler);

username.addEventListener('focus', function () {
  username.setAttribute('placeholder', '');
});

username.addEventListener('blur', function () {
  username.setAttribute('placeholder', 'Username');
});

email.addEventListener('focus', function () {
  email.setAttribute('placeholder', '');
});

email.addEventListener('blur', function () {
  email.setAttribute('placeholder', 'Email');
});

password.addEventListener('focus', function () {
  password.setAttribute('placeholder', '');
});

password.addEventListener('blur', function () {
  password.setAttribute('placeholder', 'Password');
});

passwordConfirmation.addEventListener('focus', function () {
  passwordConfirmation.setAttribute('placeholder', '');
});

passwordConfirmation.addEventListener('blur', function () {
  passwordConfirmation.setAttribute(
    'placeholder',
    'Password Confirmation'
  );
});
