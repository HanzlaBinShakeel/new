import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { fadeUp, stagger } from '../utils/motion';

export default function AnimatedSection({ children, className = '', id }) {
  const [ref, inView] = useInView();

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
}

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div className={className} variants={fadeUp} custom={delay}>
      {children}
    </motion.div>
  );
}
