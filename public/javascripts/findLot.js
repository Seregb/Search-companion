/// profile/form
const findRide = document.forms.itemsForm;
console.log(findRide);
findRide.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { From, To } = e.target;
  // const path = window.location.pathname
  const response = await fetch('/profile/form/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ From: From.value, To: To.value })
  })
  // console.log(response);
  const data = await response.json();
  // console.log(data);
})
