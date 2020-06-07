const app = document.getElementById('app');

const userProfileContainer = document.createElement('div');
userProfileContainer.setAttribute('class', 'jumbotron text-center')
app.appendChild(userProfileContainer);

const repoContainer = document.createElement('div');
repoContainer.setAttribute('class', 'container bg-light')

const repoRow = document.createElement('div');
repoRow.setAttribute('class', 'row')

app.appendChild(repoContainer);
repoContainer.appendChild(repoRow);

//Get User Information
let userRequest = new XMLHttpRequest();
userRequest.headers = 'Access-Control-Allow-Origin: *';
userRequest.open('GET', 'https://api.github.com/users/leezene', true);
userRequest.onload = function () {
    let data = JSON.parse(this.response);
    if (userRequest.status >= 200 && userRequest.status < 400) {

        const img = document.createElement('img');
        img.setAttribute('class', 'rounded-circle avatar-lg')
        img.src = data.avatar_url;

        const p = document.createElement('p');
        p.textContent = `@${data.login}`;

        const h3 = document.createElement('h3');
        h3.textContent = data.name;


        userProfileContainer.appendChild(img);
        userProfileContainer.appendChild(p);
        userProfileContainer.appendChild(h3);
    }
}

//Get User Information
let repoRequest = new XMLHttpRequest();
repoRequest.headers = 'Access-Control-Allow-Origin: *';
repoRequest.open('GET', 'https://api.github.com/users/leezene/repos', true);
repoRequest.onload = function () {
    let data = JSON.parse(this.response);
    if (repoRequest.status >= 200 && repoRequest.status < 400) {
        data.forEach(repo => {
            const grid = document.createElement('div');
            grid.setAttribute('class', 'col-md-4 mt-3');

            const card = document.createElement('div');
            card.setAttribute('class', 'card mb-4 shadow-sm');

            const cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');

            const a = document.createElement('a');
            Object.assign(a, {href: repo.html_url, textContent: repo.name})

            const spanDate = document.createElement('span');
            Object.assign(spanDate, {
                textContent: new Date(repo.created_at).toDateString(),
                className: 'd-block'
            })

            const span = document.createElement('span');
            Object.assign(span, {textContent: repo.description, className: 'd-block mt-2'})

            repoRow.appendChild(grid);
            grid.appendChild(card);
            card.appendChild(cardBody);
            cardBody.appendChild(a);
            cardBody.appendChild(spanDate);
            cardBody.appendChild(span);
        })
    }
}

userRequest.send();
repoRequest.send();