import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('input[name="email"]'),
    textarea: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', onFormSubmit);
// refs.email.addEventListener('input', throttle(onEmailInput, 800));
refs.textarea.addEventListener('input', throttle(onTextareaInput, 800));

populateTextarea();

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log('form send');
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

// function onEmailInput(evt) {
//     const email = evt.target.value;
//     // console.log(value);
//     localStorage.setItem(STORAGE_KEY, email);
// };

function onTextareaInput(evt) {
    const message = evt.target.value;
    // console.log(value);
    localStorage.setItem(STORAGE_KEY, message);
};

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);

    if (savedMessage) {
        // console.log('savedMessage');
        refs.textarea.value = savedMessage;
    };
};
