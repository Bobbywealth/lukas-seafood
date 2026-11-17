const picker = document.querySelector('.hero-picker');
const image = document.querySelector('.hero-photo img');
const buttons = Array.from(picker.querySelectorAll('button'));
const photos = [
  [image.getAttribute('src'), image.srcset, image.alt],
  ['assets/table-752.webp', 'assets/table-400.webp 400w, assets/table-752.webp 752w', 'Guests and plated food at a table inside Lukas’'],
  ['assets/bar-evening.webp', '', 'Edited photo of guests enjoying drinks at Lukas’ bar'],
];

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const [source, sourceSet, description] = photos[index];
    if (sourceSet) image.srcset = sourceSet;
    else image.removeAttribute('srcset');
    image.src = source;
    image.alt = description;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    image.getAnimations?.().forEach(animation => {
      animation.currentTime = 0;
      animation.play();
    });
  });
});
picker.hidden = false;
