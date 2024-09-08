function attachResizers(element, id) {
  const resizers = document.querySelectorAll(`.resizer[data-id="${id}"]`);
  console.log({ element, id, resizers });
  // const resizers = document.querySelectorAll(`.resizer`);
  const minimum_size = 100;
  let original_offSetWidth = 0; // the element width
  let original_offSetHeight = 0; // the element height
  let original_offSetLeft = 0; // the element position from left
  let original_offSetTop = 0; // the element position from top
  let original_mouse_x = 0; // the mouse position from left
  let original_mouse_y = 0; // the mouse position from top
  resizers.forEach((resizer) => {
    resizer.addEventListener('mousedown', function (e) {
      e.preventDefault();
      original_offSetWidth = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue('width')
          .replace('px', '')
      );
      original_offSetHeight = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue('height')
          .replace('px', '')
      );
      original_offSetLeft = element.getBoundingClientRect().left;
      original_offSetTop = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
    function resize(e) {
      if (resizer.classList.contains('bottom-right')) {
        const width = original_offSetWidth + (e.pageX - original_mouse_x);
        const height = original_offSetHeight + (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
        }
      } else if (resizer.classList.contains('bottom-left')) {
        const height = original_offSetHeight + (e.pageY - original_mouse_y);
        const width = original_offSetWidth - (e.pageX - original_mouse_x);
        if (height > minimum_size) {
          element.style.height = height + 'px';
        }
        if (width > minimum_size) {
          element.style.width = width + 'px';
          element.style.left =
            original_offSetLeft + (e.pageX - original_mouse_x) + 'px';
        }
      } else if (resizer.classList.contains('top-right')) {
        const width = original_offSetWidth + (e.pageX - original_mouse_x);
        const height = original_offSetHeight - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
          element.style.top =
            original_offSetTop + (e.pageY - original_mouse_y) + 'px';
        }
      } else {
        const width = original_offSetWidth - (e.pageX - original_mouse_x);
        const height = original_offSetHeight - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
          element.style.left =
            original_offSetLeft + (e.pageX - original_mouse_x) + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
          element.style.top =
            original_offSetTop + (e.pageY - original_mouse_y) + 'px';
        }
      }
      const lastSize = {
        width: element.style.width.replace('px', ''),
        height: element.style.height.replace('px', ''),
      };
      addToQueue(id, 'size', lastSize);
    }

    function stopResize() {
      console.log('stopresize called');

      window.removeEventListener('mousemove', resize);
    }
  });
}

export { attachResizers };
