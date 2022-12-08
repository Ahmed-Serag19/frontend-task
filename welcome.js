const displayContainer = document.querySelector(
  '.display-info-container'
);
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

console.log(userInfo.email);

displayContainer.innerHTML = `
<p>As ${userInfo.username}</p>
<p>Your Email : ${userInfo.email}</p>
`;
