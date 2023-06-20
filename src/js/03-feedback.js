import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('input[name="email"]'),
    textarea: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('input', throttle(onInput, 800));
refs.form.addEventListener('submit', throttle(onFormSubmit, 800));

// // отклонено
// refs.form.addEventListener('submit', onFormSubmit);
// refs.email.addEventListener('input', throttle(onInput, 800));
// refs.textarea.addEventListener('input', throttle(onInput, 800));

savedText();

function onInput() {
    const objectToSave = { email: refs.email.value, message: refs.textarea.value };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
}

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log({ email: refs.email.value, message: refs.textarea.value });
    evt.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
};


const load = key => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error('Get state error: ', error.message);
    }
};

function savedText() {
    const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);
    // console.log(savedMessage);
    if (savedMessage) {
        const text = JSON.parse(savedMessage);
        refs.email.value = text.email;
        refs.textarea.value = text.message;
        // console.log(text.email);
    };
};

// // вариант Репеты

// const STORAGE_KEY = 'feedback-msg';

// const refs = {
//     form: document.querySelector('.feedback-form'),
//     textarea: document.querySelector('textarea[name="message"]'),
// };

// refs.form.addEventListener('submit', onFormSubmit);
// refs.textarea.addEventListener('input', throttle(onTextareaInput, 800));

// populateTextarea();

// function onFormSubmit(evt) {
//     evt.preventDefault();
//     console.log('form send');
//     evt.currentTarget.reset();
//     localStorage.removeItem(STORAGE_KEY);
// };


// function onTextareaInput(evt) {
//     const message = evt.target.value;
//     // console.log(value);
//     localStorage.setItem(STORAGE_KEY, message);
// };


// function populateTextarea() {
//     const savedMessage = localStorage.getItem(STORAGE_KEY);

//     if (savedMessage) {
//         console.log('savedMessage');
//         refs.textarea.value = savedMessage;
//     };
// };