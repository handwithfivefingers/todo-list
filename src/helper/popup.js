export const PopupHover = (params) => {
      const elmt = document.querySelector(`.${params}`);
      elmt.addEventListener('onMouseEnter', () => {
            elmt.classList.add('popup-active');
      })
}