import { useInView as useInViewObserver } from 'react-intersection-observer';

export function useInView(options = {}) {
  return useInViewObserver({
    triggerOnce: true,
    threshold: 0.15,
    ...options,
  });
}
