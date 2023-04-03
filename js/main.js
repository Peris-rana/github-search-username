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
      fetch('https://api.github.com/users/' + searchValueNoSpace)
         .then((result) => result.json())
         .then((data) => {
            console.table(data);
            const forResult = document.getElementById('for-result');
            forResult.style.display = 'block';
            forResult.innerHTML = `<div>
          <img src = "${data.avatar_url}"></img>
          </div>
          <div>
          <h2>${data.name}</h2>
          </div>
          </div>
          <div class= "api-data">
          <time>${data.created_at}</time>
          </div>
          <div>
          <a href= "${data.html_url}">${data.repos_url}</a>
          </div>
          `;
         });
   }
});
