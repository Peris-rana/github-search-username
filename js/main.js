const githubApi = 'https://api.github.com/users/';
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
   e.preventDefault();
   window.location.href = '#for-result';
   const search = document.getElementById('Search');
   const searchValue = search.value;
   if (searchValue == '') {
      console.log('Add a username');
      alert('Add a username');
   } else {
      const searchValueNoSpace = searchValue.split(' ').join('-');
      fetch(githubApi + searchValueNoSpace)
         .then((result) => result.json())
         .then((data) => {
            if (data.message === 'Not Found') {
               alert(`No such user as ${searchValue} please try again.`);
            } else {
               console.table(data);
               const dispName = data.name !== null ? data.name : searchValue;
               const forResult = document.getElementById('for-result');
               forResult.style.display = 'block';
               forResult.innerHTML = `
               <div class="profile-container">
               <div>
                <img src = "${data.avatar_url}"></img>
               <h2>${dispName}</h2>
               <p class="small-name">${searchValueNoSpace}</p>
               </div>
               </div>
          `;
               fetch(`${githubApi}${searchValueNoSpace}/repos`)
                  .then((reposData) => {
                     return reposData.json();
                  })
                  .then((data) => {
                     const reposHtml = data.map(
                        (data) =>
                           `<li> <a href="${data.html_url}">${data.name}</a><span>public</span></li>`
                     );

                     const reposContainer = document.createElement('div');
                     reposContainer.innerHTML = `<div class="repos">${reposHtml.join(
                        ''
                     )}</div>`;
                     forResult
                        .querySelector('.profile-container')
                        .appendChild(reposContainer);
                  });
            }
         })
         .catch((err) => console.log(err.message));
   }
});
