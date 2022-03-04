const card = document.querySelector('.cardFull');

card.addEventListener('click', async (e) => {
  const cardId = e.target.id;
  console.log(cardId);
  const responce = await fetch('/profile', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardId }),
  });

  if (responce.ok) {
    const deletingCard = document.getElementById(`${cardId}`);
    // console.log(deletingCard.id);
    deletingCard.remove();
  }
})
