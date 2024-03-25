function header() {
    const container = document.querySelector('div.container');
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';

    if (savedTheme) {
        container.classList.add(savedTheme);
    }

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

    const nav = document.createElement('nav');
    const home = document.createElement('a');
    home.innerText = 'Home';
    home.href = '../page_1/home_page.html';
    home.addEventListener('click',active);
    const users = document.createElement('a');
    users.innerText = 'Users';
    users.href = '../page_2/index.html';
    users.addEventListener('click',active);
    const posts = document.createElement('a');
    posts.innerText = 'Posts';
    posts.href = '#';
    posts.addEventListener('click',active);
    const comments = document.createElement('a');
    comments.innerText = 'Comments';
    comments.href = '#';
    comments.addEventListener('click',active);
    nav.append(home, users, posts, comments);

    const themeButton = document.createElement('button');
    themeButton.innerText = container.classList.contains('light-theme') ? 'Dark' : 'Light';

    themeButton.addEventListener('click', toggleTheme);

    header.append(logo, nav, themeButton);
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

document.addEventListener('DOMContentLoaded', function() {
    const pathParts = location.pathname.split('/');
    const currentPage = pathParts[pathParts.length - 1];

    document.querySelectorAll('nav a').forEach(function(el) {
        const hrefParts = el.pathname.split('/');
        const linkPage = hrefParts[hrefParts.length - 1];

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

    const currentTheme = container.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
    localStorage.setItem('theme', currentTheme);

    const themeButton = document.querySelector('button');
    themeButton.innerText = container.classList.contains('light-theme') ? 'Dark' : 'Light';
    themeButton.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
}

header();