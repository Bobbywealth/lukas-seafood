// Hero photo picker (dining room / table / bar)
const picker = document.querySelector('.hero-picker');
const image = document.querySelector('.hero-photo img');
if (picker && image) {
  const buttons = Array.from(picker.querySelectorAll('button'));
  const photos = [
    [image.getAttribute('src'), image.srcset, image.alt],
    ['assets/img/table-752.webp', '', 'Guests and plated food at a table inside Lukas\u2019'],
    ['assets/img/bar-evening.webp', '', 'Guests enjoying drinks at the bar inside Lukas\u2019'],
  ];

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const [source, sourceSet, description] = photos[index];
      if (sourceSet) image.srcset = sourceSet;
      else image.removeAttribute('srcset');
      image.src = source;
      image.alt = description;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });
  buttons[0].setAttribute('aria-pressed', 'true');
  picker.hidden = false;
}
