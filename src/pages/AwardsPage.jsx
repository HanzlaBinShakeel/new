import PageBanner from '../components/PageBanner';
import AnimatedSection from '../components/AnimatedSection';
import { awards } from '../data/content';
import styles from './ContentPage.module.css';
import awardStyles from './AwardsPage.module.css';

export default function AwardsPage() {
  return (
    <>
      <PageBanner
        label="Recognition"
        title="Awards and Recognition"
        description="Honors and distinctions received in service of peace, faith, and community."
      />
      <AnimatedSection className={styles.section}>
        <div className="container">
          <ul className={awardStyles.list}>
            {awards.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </AnimatedSection>
    </>
  );
}
