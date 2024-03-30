const url = new URL('https://jsonplaceholder.typicode.com/posts');

const divContainer = document.querySelector("div.container");
const h1 = document.createElement('h1');
h1.innerText = 'User posts';
const hr = document.createElement('hr');
const divPosts = document.createElement("div");
divPosts.classList.add('posts');
divContainer.append(h1,hr, divPosts);

function gerPosts() {
    fetch(url)
        .then((response) => response.json())
        .then(posts => {
                pagination(posts, 10);
            }
        )
}

function pagination(arr, pageSize) {
    const divContainer = document.querySelector('div.container');
    const divButtons = document.createElement('div');

    const buttonPrev = document.createElement('button');
    buttonPrev.classList.add('button');
    buttonPrev.innerText = 'PREV';
    buttonPrev.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`

    const buttonNext = document.createElement('button');
    buttonNext.classList.add('button');
    buttonNext.innerText = 'NEXT';
    buttonNext.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`

    const buttonBack = document.createElement('button');
    buttonBack.innerText = 'BACK';
    buttonBack.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
    buttonBack.onclick = function () {
        history.back()
    };

    divButtons.append(buttonPrev, buttonNext);
    const divAllButtons = document.createElement('div');
    divAllButtons.classList.add('allButtons');
    divAllButtons.append(divButtons, buttonBack);
    divContainer.appendChild(divAllButtons);
    const totalCount = arr.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    let currentPage = 1;

    renderPage(arr);

    buttonPrev.onclick = function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            buttonPrev.removeAttribute('disabled');
            currentPage -= 1;
            renderPage(arr);
        }
        if (currentPage === 1) {
            buttonPrev.disabled = true;
        }
    }

    buttonNext.onclick = function (e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            buttonNext.removeAttribute('disabled');
            currentPage += 1;
            renderPage(arr);
        }
        if (currentPage === totalPages) {
            buttonNext.disabled = true;
        }
    }


    function renderPage(arr) {
        if (currentPage < totalPages) {
            buttonNext.removeAttribute('disabled');
        } else {
            buttonNext.disabled = true;
        }

        if (currentPage > 1) {
            buttonPrev.removeAttribute('disabled');
        } else {
            buttonPrev.disabled = true;
        }

        const divPosts = document.querySelector('div.posts');

        divPosts.innerHTML = '';
        const paginationArr = arr.slice(((currentPage - 1) * pageSize), currentPage * pageSize);

        paginationArr.forEach(post => {
            const divPost = document.createElement('div');
            divPost.classList.add('post');
            const {userId, id, title, body} = post;
            const h3 = document.createElement('h3');
            h3.innerHTML = `Id: ${id} UserId: ${userId}`;
            const hr = document.createElement('hr')
            const h2Title = document.createElement('h2');
            h2Title.innerText = `${capitalizeFirstLetterText(title)}`;
            const pBody = document.createElement('p');
            pBody.innerHTML = `${capitalizeFirstLetterText(body)}`;
            divPost.append(h3, hr, h2Title, pBody);
            divPosts.append(divPost);
        })
    }
}

gerPosts();

// fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
//     .then((response) => response.json())
//     .then(comments => {
//             const divComments = document.createElement("div");
//             divComments.classList.add('comments');
//             divContainer.appendChild(divComments);
//
//             const buttonDiv = document.createElement('div');
//             buttonDiv.classList.add('empty-div');
//             const button = document.createElement('button');
//             button.innerText = 'Back';
//             button.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
//             button.onclick = function () {
//                 history.back()
//             };
//             buttonDiv.appendChild(button);
//
//             for (let i = 0; i < comments.length; i++) {
//                 const {id, name, email, body} = comments[i];
//                 const divComment = document.createElement('div');
//                 divComment.classList.add('comment');
//                 const hId = document.createElement('h3');
//                 hId.innerText = `Id: ${id}`;
//                 const hName = document.createElement('h2');
//                 hName.innerText = `${capitalizeFirstLetterText(name)}`;
//                 const hEmail = document.createElement('h3');
//                 hEmail.innerText = `${email}`;
//                 const pBody = document.createElement('p');
//                 pBody.innerText = `${capitalizeFirstLetterText(body)}`;
//                 divComment.append(hId, hName, hEmail, pBody);
//
//                 if (i === 4) {
//                     const emptyDiv = document.createElement('div');
//                     emptyDiv.classList.add('empty-div');
//                     const button = document.createElement('button');
//                     button.innerText = 'Back';
//                     button.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
//                     button.onclick = function () {
//                         history.back()
//                     };
//                     emptyDiv.appendChild(button);
//                     divComments.appendChild(emptyDiv);
//                 }
//
//                 divComments.appendChild(divComment);
//             }
//             divContainer.appendChild(buttonDiv);
//         }
//     )

function capitalizeFirstLetterText(text) {
    const words = text.split(' ');
    const firstWord = words[0].charAt(0).toUpperCase() + words.shift().substring(1);
    words.unshift(firstWord);
    return words.join(' ');
}