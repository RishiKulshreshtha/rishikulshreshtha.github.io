export function fadeIn(node) {
  node.classList.add('fade-in');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('fade-in--visible');
        observer.disconnect();
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
