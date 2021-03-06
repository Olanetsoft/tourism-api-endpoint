//import polyfill
import '@babel/polyfill';

//import login.js code
import { login, logout } from './logout-logout';

//import updateSettings
import { updateSettings } from './updateSettings';

//import polyfill
import { displayMap } from './mapbox';

//import bookTour
import { bookTour } from './stripe';

//DOM ELEMENT
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');



//DELEGATION
if (mapBox) {
    //Get the locations from the supplied data on the front end
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
};

//Login
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        //VALUES
        //get the email and password
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
};

//logout
if (logoutBtn) logoutBtn.addEventListener('click', logout);


//submit data
if (userDataForm) userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    //VALUES
    //get the email and name
    const form = new FormData()
    form.append('name', document.getElementById('name').value)
    form.append('email', document.getElementById('email').value)
    form.append('photo', document.getElementById('photo').files[0])
    // const email = document.getElementById('email').value;

    updateSettings(form, 'data');
});


//submit password
if (userPasswordForm) userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();

    //to give the user some feedback when saving
    //1)
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    //VALUES
    //get the passwordCurrent,password and passwordConfirm
    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings({ currentPassword, password, passwordConfirm }, 'password');


    //to give the user some feedback when saving
    //1)
    document.querySelector('.btn--save-password').textContent = 'Save Password';

    //to clear data from frontend after updating
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';

});

if (bookBtn) {
    bookBtn.addEventListener('click', e => {
        e.target.textContent = 'Processing...';

        const { tourId } = e.target.dataset;
        bookTour(tourId);
    })
}