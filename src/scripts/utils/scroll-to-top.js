function scrollToTop() {
  const topElement = document.getElementById('mainContent');
  if (topElement) {
    topElement.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}

export default scrollToTop;
