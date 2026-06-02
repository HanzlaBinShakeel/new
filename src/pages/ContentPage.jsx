import PageBanner from '../components/PageBanner';
import AnimatedSection, { Reveal } from '../components/AnimatedSection';
import { Stagger, StaggerItem } from '../components/Motion';
import styles from './ContentPage.module.css';

export default function ContentPage({ label, title, description, body, children }) {
  const paragraphs = body ? body.split('\n\n') : [];

  return (
    <>
      <PageBanner label={label} title={title} description={description} />
      <AnimatedSection className={styles.section}>
        <div className="container">
          {paragraphs.length > 0 && (
            <Stagger className={styles.prose}>
              {paragraphs.map((para) => (
                <StaggerItem key={para.slice(0, 40)}>
                  <p>{para}</p>
                </StaggerItem>
              ))}
            </Stagger>
          )}
          {children && <Reveal delay={1}>{children}</Reveal>}
        </div>
      </AnimatedSection>
    </>
  );
}
