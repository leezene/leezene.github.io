fetch("https://api.github.com/users/leezene")
    .then(response => response.json())
    .then(function(data){
        document.getElementById('user-avatar').src = data['avatar_url'];
        document.getElementById('user-githublink').href = data['html_url']
        document.getElementById('user-username').textContent = `@${data['login']}`;
       
        document.getElementById('user-fullname').textContent = data['name'];
        document.getElementById('user-followerCounts').textContent = `${data['followers']} followers`;
    });

const repoCard = document.getElementById('repoContainer');


// //Get User Information
let repoRequest = new XMLHttpRequest();
repoRequest.headers = 'Access-Control-Allow-Origin: *';
repoRequest.open('GET', 'https://api.github.com/users/leezene/repos', true);
repoRequest.onload = function () {
    let data = JSON.parse(this.response);
    if (repoRequest.status >= 200 && repoRequest.status < 400) {
        data.forEach(repo => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card card-background width-container mxy-1');

            const cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body mb-4 shadow-sm');

            const a = document.createElement('a');
            Object.assign(a, {href: repo.html_url, textContent: repo.name});
            a.setAttribute('class', 'repo-link');

            const spanDate = document.createElement('span');
            Object.assign(spanDate, {
                textContent: new Date(repo.created_at).toDateString(),
                className: 'd-block'
            })

            const span = document.createElement('span');
            Object.assign(span, {textContent: repo.description, className: 'd-block mt-2'})

            repoCard.appendChild(card);
            card.appendChild(cardBody);
            cardBody.appendChild(a);
            cardBody.appendChild(spanDate);
            cardBody.appendChild(span);
        })
    }
}

repoRequest.send();