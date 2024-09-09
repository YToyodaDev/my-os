const LIMIT_TOP = 30;
const LIMIT_SIDE = 30;
const LIMIT_BOTTOM = 30;

let startPosX = 0,
  startPosY = 0;

function handleResizeWindow(e, { minWidth = 100, minHeight = 50 } = {}) {
  e.preventDefault();
  return new Promise((resolve) => {
    const resizer = e.target.closest('.resizer');
    const element = e.target.closest('.resizable');
    const id = element.dataset.id;
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
        case resizer.classList.contains('top'):
          newHeight -= dy;
          newHeight > minHeight &&
            (element.style.top = originalStyles.top + dy + 'px');
          break;
        case resizer.classList.contains('bottom'):
          newHeight += dy;
          break;
        case resizer.classList.contains('left'):
          newWidth -= dx;
          newWidth > minWidth &&
            (element.style.left = originalStyles.left + dx + 'px');
          break;
        case resizer.classList.contains('right'):
          newWidth += dx;
          break;
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
      const lastSize = {
        width: element.style.width.replace('px', ''),
        height: element.style.height.replace('px', ''),
      };

      resolve({ id, lastSize });
    }

    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  });
}

function handleDragWindow(e) {
  e.preventDefault();
  return new Promise((resolve) => {
    console.log('handleDragWindow called');

    // Get initial mouse position
    let startPosX = e.clientX;
    let startPosY = e.clientY;

    // Find the card that was clicked
    let selected = e.target.closest('.movable');
    if (!selected) return;

    // zIndexManager(e);

    // Add mousemove and mouseup event listeners
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    // Mouse move handler
    function mouseMove(e) {
      // Calculate new positions based on movement
      const dx = startPosX - e.clientX;
      const dy = startPosY - e.clientY;

      // Update starting positions for the next move event
      startPosX = e.clientX;
      startPosY = e.clientY;

      // Set the new position of the card
      const newTop = selected.offsetTop - dy;
      selected.style.left = `${selected.offsetLeft - dx}px`;
      newTop > LIMIT_TOP
        ? (selected.style.top = newTop + 'px')
        : (selected.style.top = LIMIT_TOP + 'px');
    }

    // Mouse up handler (end dragging)
    function mouseUp(e) {
      // Store the last position of the card
      const id = selected.dataset.id;
      const lastPosition = {
        x: selected.style.left.replace('px', ''),
        y: selected.style.top.replace('px', ''),
      };
      // addToQueue(id, 'position', lastPosition);

      // Remove the event listeners
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      resolve({ id, lastPosition });
    }
  });
}

export { handleResizeWindow, handleDragWindow };
