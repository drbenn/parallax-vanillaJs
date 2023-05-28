import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

// Test Fetch and iterating container
let apiData;
fetch('https://fakerapi.it/api/v1/users?_quantity=10')
  .then(response => response.json())
  .then(data => {
    console.log(data.data);
    apiData = data.data;
    generateContainers(apiData);
  })
  .catch(error => {
    console.error(error);
  });

const generateContainers = (apiData) => {
  const container = document.querySelector('#container');
  container.classList.add('flex-container');

  apiData.forEach(user => {
    // Create a new div element
    const div = document.createElement('div');
    div.classList.add('data-container');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container')
    div.appendChild(imgContainer);
    const userImage = document.createElement('img');
    userImage.src = `${user.image}`;
    imgContainer.appendChild(userImage);

    const username = document.createElement('p');
    username.textContent = `User Name: ${user.username}`;
    div.appendChild(username);

    const firstName = document.createElement('p');
    firstName.textContent = `First Name: ${user.firstname}`;
    div.appendChild(firstName);

    const lastName = document.createElement('p');
    lastName.textContent = `Last Name: ${user.lastname}`;
    div.appendChild(lastName);

    const website = document.createElement('p');
    website.textContent = `Website: ${user.website}`;
    div.appendChild(website);

    // Add the div to the container element
    container.appendChild(div);
});

}
