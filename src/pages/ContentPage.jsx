import PageBanner from '../components/PageBanner';
import AnimatedSection from '../components/AnimatedSection';
import styles from './ContentPage.module.css';

export default function ContentPage({ label, title, description, body, children }) {
  return (
    <>
      <PageBanner label={label} title={title} description={description} />
      <AnimatedSection className={styles.section}>
        <div className="container">
          {body && (
            <div className={styles.prose}>
              {body.split('\n\n').map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          )}
          {children}
        </div>
      </AnimatedSection>
    </>
  );
}
