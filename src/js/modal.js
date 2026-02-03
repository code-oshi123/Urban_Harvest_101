const modal = document.getElementById('modal');
const openBtns = document.querySelectorAll('.open-modal');
const closeBtn = document.getElementById('close-modal');

openBtns.forEach(btn => {
  btn.addEventListener('click', () => modal.classList.remove('hidden'));
});

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
