function header() {
    const container = document.querySelector('div.container');
    const header = document.createElement('header');
    container.appendChild(header);

    const logo = document.createElement('div');
    logo.classList.add('logo');
    const img = document.createElement('img');
    img.src = '../images/logo.jpg';
    img.alt = 'logo';
    const span = document.createElement('span');
    span.innerText = 'JSON';
    logo.append(img, span);

    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.innerHTML += '<hr>';
    menu.innerHTML += '<hr>';
    menu.innerHTML += '<hr>';

    menu.onclick = function () {
        menu.classList.toggle('active');
        if (window.innerWidth < 500) {
            toggleNavBackground();
        }
        if (nav.style.display === 'flex') {
            nav.classList.add('closed');
            setTimeout(() => {
                nav.style.display = 'none';
                document.body.style.overflow = '';
            }, 1500);

        } else {
            nav.style.display = 'flex';
            nav.classList.remove('closed');
            document.body.style.overflow = 'hidden';
        }
    }

    const nav = document.createElement('nav');
    const home = document.createElement('a');
    home.innerText = 'Home';
    home.href = '../page_1/index.html';
    home.addEventListener('click', active);
    const users = document.createElement('a');
    users.innerText = 'Users';
    users.href = '../page_2/index.html';
    users.addEventListener('click', active);
    const posts = document.createElement('a');
    posts.innerText = 'Posts';
    posts.href = '../page_5/posts.html';
    posts.addEventListener('click', active);
    const about = document.createElement('a');
    about.innerText = 'About';
    about.href = '../page_6/about.html';
    about.addEventListener('click', active);
    nav.append(home, users, posts, about);

    const themeButton = document.createElement('button');
    themeButton.innerText = container.classList.contains('light-theme') ? 'Dark' : 'Light';

    themeButton.addEventListener('click', toggleTheme);

    header.append(logo, menu, nav, themeButton);

    const savedTheme = localStorage.getItem('theme') || 'dark-theme';

    if (savedTheme) {
        container.classList.add(savedTheme);
    }

    if (savedTheme === 'dark-theme') {
        header.classList.add('dark-header');
        themeButton.classList.add('dark-header');
    } else {
        header.classList.add('light-header');
        themeButton.classList.add('light-header');
    }
}

function active(e) {
    document.querySelectorAll('nav a').forEach(function (el) {
        const pathParts = location.pathname.split('/');
        const currentPage = pathParts[pathParts.length - 1];
        const activePage = el.pathname.split('/').pop();
        if (currentPage !== activePage) {
            el.classList.remove('active');
        } else {
            el.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {

    const pathParts = location.pathname.split('/');
    const currentPage = pathParts[pathParts.length - 2];

    document.querySelectorAll('nav a').forEach(function (el) {
        const hrefParts = el.pathname.split('/');
        const linkPage = hrefParts[hrefParts.length - 2];

        if (currentPage === linkPage) {
            el.classList.add('active');
        }
    });
});


function toggleTheme(e) {
    e.preventDefault();

    const container = document.querySelector('div.container');
    container.classList.toggle('light-theme');
    container.classList.toggle('dark-theme');

    const header = document.querySelector('header');
    header.classList.toggle('light-header');
    header.classList.toggle('dark-header');

    const button = document.querySelector('header>button');
    button.classList.toggle('light-header');
    button.classList.toggle('dark-header');

    const currentTheme = container.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
    localStorage.setItem('theme', currentTheme);
    const currentThemeHeader = header.classList.contains('light-header') ? 'light-header' : 'dark-header';
    localStorage.setItem('themeHeader', currentThemeHeader);

    const themeButton = document.querySelector('button');
    themeButton.innerText = container.classList.contains('light-theme') ? 'Dark' : 'Light';
    themeButton.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`

    if (window.innerWidth < 500) {
        toggleNavBackground();
    }
}

function showNav() {
    const nav = document.querySelector('nav');
    nav.style.display = 'flex';
    const menu = document.querySelector('.menu');
    menu.classList.remove('active');
}

function hideNav() {
    const nav = document.querySelector('nav');
    nav.style.display = 'none';
    const menu = document.querySelector('.menu');
    menu.classList.remove('active');
}

window.addEventListener('resize', function () {
    if (window.innerWidth > 500) {
        showNav();
    } else {
        hideNav();
    }
});

function toggleNavBackground() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    if (header.classList.contains('light-header')) {
        nav.classList.remove('light-header');
        nav.classList.add('dark-header');
    } else {
        nav.classList.remove('dark-header');
        nav.classList.add('light-header');
    }
}

header();

