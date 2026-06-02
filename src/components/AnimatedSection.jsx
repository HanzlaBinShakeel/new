import { Section, Reveal } from './Motion';

/** @deprecated Prefer Section + Reveal from ./Motion — kept for existing imports */
export default function AnimatedSection({ children, className = '', id }) {
  return (
    <Section id={id} className={className}>
      {children}
    </Section>
  );
}

export { Reveal };
