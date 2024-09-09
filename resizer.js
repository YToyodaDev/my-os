let lastSize = {};

export function resizeWindow(e, { minWidth = 0, minHeight = 0 } = {}) {
  e.preventDefault();
  return new Promise((resolve) => {
    const resizer = e.target.closest('.resizer');
    const element = e.target.closest('.resizable');
    const id = resizer.dataset.id;
    console.log({ resizer, id });

    const originalStyles = {
      width: parseFloat(getComputedStyle(element).width),
      height: parseFloat(getComputedStyle(element).height),
      left: element.getBoundingClientRect().left,
      top: element.getBoundingClientRect().top,
      mouseX: e.pageX,
      mouseY: e.pageY,
    };

    function resize(e) {
      const dx = e.pageX - originalStyles.mouseX;
      const dy = e.pageY - originalStyles.mouseY;
      let newWidth = originalStyles.width;
      let newHeight = originalStyles.height;

      switch (true) {
        case resizer.classList.contains('bottom-right'):
          newWidth += dx;
          newHeight += dy;
          break;
        case resizer.classList.contains('bottom-left'):
          newWidth -= dx;
          newHeight += dy;
          newWidth > minWidth &&
            (element.style.left = originalStyles.left + dx + 'px');

          break;
        case resizer.classList.contains('top-right'):
          newWidth += dx;
          newHeight -= dy;
          newHeight > minHeight &&
            (element.style.top = originalStyles.top + dy + 'px');

          break;
        case resizer.classList.contains('top-left'):
          newWidth -= dx;
          newHeight -= dy;
          newWidth > minWidth &&
            (element.style.left = originalStyles.left + dx + 'px');

          newHeight > minHeight &&
            (element.style.top = originalStyles.top + dy + 'px');
          break;
        default:
          console.error('Unknown resizer direction');
          break;
      }

      if (newWidth > minWidth) {
        element.style.width = newWidth + 'px';
      }
      if (newHeight > minHeight) {
        element.style.height = newHeight + 'px';
      }
    }

    function stopResize() {
      window.removeEventListener('mousemove', resize);
      lastSize = {
        width: element.style.width.replace('px', ''),
        height: element.style.height.replace('px', ''),
      };

      resolve({ id, lastSize });
    }

    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  });
}
