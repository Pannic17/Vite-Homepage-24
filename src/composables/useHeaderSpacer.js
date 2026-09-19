import { onMounted, onUnmounted } from 'vue';

// Temporary bridge for existing fixed headers, until the phase 2 layout change.
export function useHeaderSpacer() {
  let header, spacer, observer;
  function update() {
    if (header && spacer) spacer.style.height = Math.max(0, header.clientHeight - window.innerHeight * 0.02) + 'px';
  }
  onMounted(() => {
    header = document.getElementById('f-top');
    spacer = document.getElementById('block');
    if (!header || !spacer) return;
    observer = new ResizeObserver(update);
    observer.observe(header);
    window.addEventListener('resize', update);
    update();
  });
  onUnmounted(() => {
    observer?.disconnect();
    window.removeEventListener('resize', update);
    header = spacer = null;
  });
}
