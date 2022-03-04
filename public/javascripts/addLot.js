/// profile/form
const addBtn = document.querySelector('.addBtn')
addBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const responce = await fetch('/profile/info')
  const { ourUser } = await responce.json();
  if (ourUser.userRole === 1) {
    return window.location.replace('/profile/form/ride')
  }
  return window.location.replace('/profile/form/search')
})


const addRide = document.querySelector('.addRide');
addRide.addEventListener('submit', async (e) => {
  const { From, To, passengerCount, startAt, description } = e.target;
  const responce = await fetch('/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: From.value,
      to: To.value,
      passengerCount: passengerCount.value,
      startAt: startAt.value,
      description: description.value,
    }),
  })
})


