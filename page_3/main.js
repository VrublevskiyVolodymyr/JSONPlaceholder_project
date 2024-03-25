function showUserDetails() {
    const currentUrl = new URL(location.href);
    const user = JSON.parse(currentUrl.searchParams.get('data'));

    const container = document.querySelector('div.container');
    const userInfo = document.createElement('section');
    userInfo.classList.add('user-info');

    const h1 = document.createElement('h1');
    h1.innerHTML = `<u><strong>Username:</strong> ${user.username}</u>`;

    const div = document.createElement('div');
    div.innerHTML += '<h2>Contacts</h2>';
    div.innerHTML += '<hr>';
    userInfo.appendChild(div);

    for (const key in user) {
        if ((key !== 'username') && (typeof user[key] !== 'object')) {
            div.innerHTML += `<p><strong>${capitalizeFirstLetter(key)}:</strong> ${user[key]}</p>`;
        } else if (typeof user[key] === 'object' && key === 'address') {
            const addressDiv = document.createElement('div');
            addressDiv.innerHTML = '<h2>Address</h2>';
            addressDiv.innerHTML += '<hr>';

            for (const addressKey in user[key]) {
                if (addressKey !== 'geo') {
                    addressDiv.innerHTML += `<p><strong>${capitalizeFirstLetter(addressKey)}:</strong> ${user[key][addressKey]}</p>`;
                } else {
                    const geoDiv = document.createElement('div');
                    geoDiv.innerHTML = '<strong>Geo:</strong>';

                    for (const geoKey in user[key][addressKey]) {
                        const li = document.createElement('li');
                        li.innerHTML += `<strong>${capitalizeFirstLetter(geoKey)}:</strong> ${user[key][addressKey][geoKey]}`;
                        geoDiv.appendChild(li);
                    }

                    addressDiv.appendChild(geoDiv);
                }
            }
            userInfo.appendChild(addressDiv);
        } else if (typeof user[key] === 'object' && key === 'company') {
            const companyDiv = document.createElement('div');
            companyDiv.innerHTML = '<h2>Company</h2>';
            companyDiv.innerHTML += '<hr>';

            for (const companyKey in user[key]) {
                companyDiv.innerHTML += `<p><strong>${capitalizeFirstLetter(companyKey)}:</strong> ${user[key][companyKey]}</p>`;
            }
            userInfo.appendChild(companyDiv);
        }
    }
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-div');

    const button = document.createElement('button');
    button.innerText = `Post of ${user.name}`;
    button.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
    button.onclick = function () {
        showPosts(user);
        const buttonDiv = document.querySelector('div.button-div');
        buttonDiv.style.display = 'none';
        button.disabled = true;
    }

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div');

    const buttonBack = document.createElement('button');
    buttonBack.innerText = 'Back'
    buttonBack.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
    buttonBack.onclick = function (){
        history.back()
    };
    buttonDiv.appendChild(buttonBack);

    userDiv.append(userInfo, button);
    container.append(h1, userDiv, buttonDiv);
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}
function capitalizeFirstLetterText(text) {
    const words = text.split(' ');
   const firstWord  = words[0].charAt(0).toUpperCase() + words.shift().substring(1);
    words.unshift(firstWord);
    return words.join(' ');
}
function showPosts(user) {
    const container = document.querySelector('div.container');
    const divContTitle = document.createElement('div');
    divContTitle.classList.add('contTitle');
    container.append(divContTitle);
    const url = new URL(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)

    fetch(url)
        .then((response) => response.json())
        .then(posts => {

            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('div-button');

            const buttonBack = document.createElement('button');
            buttonBack.innerText = 'Back'
            buttonBack.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
            buttonBack.onclick = function (){
                history.back()}
            buttonDiv.appendChild(buttonBack);

            for (const post of posts) {
                const div = document.createElement("div");
                div.classList.add('title');
                const p = document.createElement('p');
                p.innerText = `${capitalizeFirstLetterText(post.title)}`;
                const button = document.createElement('button');
                button.innerText = 'Post details';
                button.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
                button.onclick = function (){
                    location.href = `../page_4/post-details.html?id=${post.id}&userId=${post.userId}`;
                };
                div.append(p, button);
                divContTitle.appendChild(div);
            }
            container.appendChild(buttonDiv);
        });
}

showUserDetails();

