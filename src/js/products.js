const tabs = document.querySelectorAll('[role="tab"]');
const cards = document.querySelectorAll('.product-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');

    const category = tab.textContent;
    cards.forEach(card => {
      card.style.display =
        card.dataset.category === category ? 'block' : 'none';
    });
  });
});
