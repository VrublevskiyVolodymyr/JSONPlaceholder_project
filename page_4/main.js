const url = new URL(location.href);
const postId = +(url.searchParams.get('id'));
const divContainer = document.querySelector("div.container");
const divPost = document.createElement("div");
divPost.classList.add('post');
divContainer.appendChild(divPost);
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then(posts => {
            const {userId, id, title, body} = posts;
            const h2 = document.createElement('h2');
            h2.innerHTML = `Id: ${id} UserId: ${userId}`;
            const h1Title = document.createElement('h1');
            h1Title.innerText = `${capitalizeFirstLetterText(title)}`;
            const pBody = document.createElement('p');
            pBody.innerHTML = `${capitalizeFirstLetterText(body)}`;
            divPost.append(h2, h1Title, pBody);
        }
    )
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => response.json())
    .then(comments => {
            const divComments = document.createElement("div");
            divComments.classList.add('comments');
            divContainer.appendChild(divComments);

            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('empty-div');
            const button = document.createElement('button');
            button.innerText = 'Back';
            button.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
            button.onclick = function () {
                history.back()
            };
            buttonDiv.appendChild(button);

            for (let i = 0; i < comments.length; i++) {
                const {id, name, email, body} = comments[i];
                const divComment = document.createElement('div');
                divComment.classList.add('comment');
                const hId = document.createElement('h3');
                hId.innerText = `Id: ${id}`;
                const hName = document.createElement('h2');
                hName.innerText = `${capitalizeFirstLetterText(name)}`;
                const hEmail = document.createElement('h3');
                hEmail.innerText = `${email}`;
                const pBody = document.createElement('p');
                pBody.innerText = `${capitalizeFirstLetterText(body)}`;
                divComment.append(hId, hName, hEmail, pBody);

                if (i === 4) {
                    const emptyDiv = document.createElement('div');
                    emptyDiv.classList.add('empty-div');
                    const button = document.createElement('button');
                    button.innerText = 'Back';
                    button.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
                    button.onclick = function () {
                        history.back()
                    };
                    emptyDiv.appendChild(button);
                    divComments.appendChild(emptyDiv);
                }

                divComments.appendChild(divComment);
            }
            divContainer.appendChild(buttonDiv);
        }
    )

function capitalizeFirstLetterText(text) {
    const words = text.split(' ');
    const firstWord = words[0].charAt(0).toUpperCase() + words.shift().substring(1);
    words.unshift(firstWord);
    return words.join(' ');
}