document.addEventListener('DOMContentLoaded', () => {
    const usersWrapper = document.querySelector('.users-wrapper'),
        btnDownload = document.querySelector('.btn-download'),
        btnShowFromFile = document.querySelector('.btn-file'),
        loader = document.querySelector('.loader-wrapper');

    let page = 1;
    let positionInFile = 0;
    let usersPagePage = 5;
    const apiUrl = `https://randomuser.me/api/?page=${page}&results=${usersPagePage}`;

    function loadUsers(url, headers = {}, fromPosition = 0) {
        handleLoadingIndicators();

        fetch(url, {
            headers
        })
            .then(response => response.json())
            .then(data => {
                handleLoadingIndicators();

                createUsersCards(Array.isArray(data) ?
                    data.slice(fromPosition, fromPosition + usersPagePage) :
                    data.results,
                    usersWrapper
                );
            })
            .catch(err => console.log(err));
    }

    function handleLoadingIndicators() {
        loader.classList.toggle('hide');

        btnDownload.toggleAttribute('disabled');
        btnShowFromFile.toggleAttribute('disabled');
    }

    btnDownload.addEventListener('click', () => {
        loadUsers(apiUrl, {
            'Content-Type': 'application/json'
        });
    });

    btnShowFromFile.addEventListener('click', () => {
        loadUsers('users.json', {}, positionInFile);
        positionInFile += usersPagePage;
    });

    function createUsersCards(users, wrapper) {
        users.forEach(user => {
            const { title, first, last } = user.name;
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');

            const userImage = document.createElement('img');
            userImage.classList.add('user-image');
            userImage.setAttribute('src', user.picture.large);
            userImage.setAttribute('alt', `${title} ${first} ${last}`);

            userItem.appendChild(userImage);
            createUserDescription(user, userItem);

            wrapper.appendChild(userItem);
        });
    }

    function createUserDescription(user, userItem) {
        const { title, first, last } = user.name;
        const userDescription = document.createElement('div');
        userDescription.classList.add('user-description');

        const name = document.createElement('p');
        name.textContent = `Name: ${title} ${first} ${last}`;

        const country = document.createElement('p');
        country.textContent = `Country: ${user.location.country}`;

        const postcode = document.createElement('p');
        postcode.textContent = `Postcode: ${user.location.postcode}`;

        const phone = document.createElement('p');
        phone.textContent = `Phone: ${user.phone}`;

        userDescription.appendChild(name);
        userDescription.appendChild(country);
        userDescription.appendChild(postcode);
        userDescription.appendChild(phone);

        userItem.appendChild(userDescription);
    }
});
