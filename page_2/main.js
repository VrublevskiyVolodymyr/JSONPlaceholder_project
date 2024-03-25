function showUsers() {
    const url = new URL('https://jsonplaceholder.typicode.com/users');

    fetch(url)
        .then(res => res.json())
        .then(users => {
                console.log(users)
                const container = document.querySelector('div.container');
                const usersDiv = document.createElement('main');
                usersDiv.classList.add('users');
                container.appendChild(usersDiv);

                users.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('user');

                    const h2 = document.createElement('h2');
                    h2.innerText = `${user.id}. ${user.name}`

                    const button = document.createElement('button');
                    button.innerText = `${user.name} details`;
                    button.innerHTML += ` <span></span>  <span></span>  <span></span>  <span></span>`
                    button.onclick = function () {
                        const data = JSON.stringify(user);
                        location.href = `../page_3/user-details.html?data=${data}`;
                    }

                    userDiv.append(h2, button);
                    usersDiv.appendChild(userDiv);
                });
            }
        )
}

showUsers()