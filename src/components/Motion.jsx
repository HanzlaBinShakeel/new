import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  VIEWPORT,
  fadeUp,
  fadeIn,
  scaleIn,
  blurUp,
  staggerContainer,
  staggerItem,
  staggerDelay,
  hoverLift,
  tapScale,
  pageTransition,
  reducedFadeUp,
} from '../utils/motion';

const motionMap = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
  a: motion.a,
};

/**
 * Scroll-reveal block.
 * @param standalone — true when NOT inside `<Section>` (uses its own whileInView)
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  variant = fadeUp,
  standalone = false,
}) {
  const reduced = useReducedMotion();
  const Component = motionMap[as] || motion.div;
  const variants = reduced ? reducedFadeUp : variant;

  if (reduced) {
    const Tag = as === 'section' ? 'section' : as === 'article' ? 'article' : as === 'li' ? 'li' : 'div';
    return <Tag className={className}>{children}</Tag>;
  }

  const shared = {
    className,
    variants,
    custom: staggerDelay(delay),
  };

  if (standalone) {
    return (
      <Component {...shared} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
        {children}
      </Component>
    );
  }

  return <Component {...shared}>{children}</Component>;
}

/** Section wrapper with staggered children */
export function Section({ children, className = '', id, as = 'section' }) {
  const reduced = useReducedMotion();
  const Component = motionMap[as] || motion.section;
  const staticTags = { section: 'section', footer: 'footer', div: 'div' };

  if (reduced) {
    const Tag = staticTags[as] || 'section';
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      id={id}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

/** Grid/list stagger parent */
export function Stagger({ children, className = '', as = 'div' }) {
  const reduced = useReducedMotion();
  const Component = motionMap[as] || motion.div;

  if (reduced) {
    const Tag = as === 'ul' ? 'ul' : 'div';
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className = '', as = 'div' }) {
  const reduced = useReducedMotion();
  const Component = motionMap[as] || motion.div;

  if (reduced) {
    const Tag = as === 'li' ? 'li' : 'div';
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component className={className} variants={staggerItem}>
      {children}
    </Component>
  );
}

/** Cards & links — consistent hover on desktop; subtle on touch */
export function HoverLift({ children, className = '', as = 'div', ...rest }) {
  const reduced = useReducedMotion();
  const Component = motionMap[as] || motion.div;

  if (reduced) {
    const Tag = as === 'a' ? 'a' : 'div';
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Component className={className} whileHover={hoverLift} whileTap={tapScale} {...rest}>
      {children}
    </Component>
  );
}

/** Route change wrapper */
export function PageMotion({ children, className = '' }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export { fadeUp, fadeIn, scaleIn, blurUp, staggerDelay, VIEWPORT };
