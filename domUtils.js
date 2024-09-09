function getCenterCoordinates(element) {
  const rect = element.getBoundingClientRect();
  const left = rect.left + rect.width / 2;
  const top = rect.top + rect.height / 2;
  return { left, top };
}

export { getCenterCoordinates };
