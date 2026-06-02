import { useLanguage } from '../i18n/LanguageContext';
import {
  bioContent,
  longBioContent,
  visionManagementContent,
  imagePrintingContent,
  alDewanContent,
  honorsAwards,
  notableAccomplishments,
  coreSkills,
  aboutContentBySlug,
} from '../data/aboutContent';

/** English from rateb.rabie.us / HCEF; other locales from i18n */
export function useAboutContent() {
  const { locale, t } = useLanguage();
  const isEn = locale === 'en';

  return {
    bio: isEn
      ? bioContent
      : {
          title: t('nav.bio'),
          desc: t('about.bioDesc'),
          body: t('about.biographyText'),
        },
    longBio: isEn
      ? longBioContent
      : {
          title: t('aboutSub.longBio.title'),
          desc: t('aboutSub.longBio.desc'),
          body: t('aboutSub.longBio.body'),
        },
    visionManagement: isEn
      ? visionManagementContent
      : {
          title: t('aboutSub.visionManagement.title'),
          desc: t('aboutSub.visionManagement.desc'),
          body: t('aboutSub.visionManagement.body'),
        },
    imagePrinting: isEn
      ? imagePrintingContent
      : {
          title: t('aboutSub.imagePrinting.title'),
          desc: t('aboutSub.imagePrinting.desc'),
          body: t('aboutSub.imagePrinting.body'),
        },
    alDewan: isEn
      ? alDewanContent
      : {
          title: t('aboutSub.alDewan.title'),
          desc: t('aboutSub.alDewan.desc'),
          body: t('aboutSub.alDewan.body'),
        },
    honorsAwards,
    notableAccomplishments,
    skills: coreSkills,
    skillsIntro: isEn ? 'Core competencies from the official Curriculum Vitae:' : t('aboutSub.skills.body'),
    accomplishmentsIntro: isEn
      ? 'Career highlights and achievements from the official Curriculum Vitae and organizational records:'
      : t('aboutSub.accomplishments.body'),
    getSubPage: (slug) => {
      if (isEn && aboutContentBySlug[slug]) return aboutContentBySlug[slug];
      const key = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return {
        title: t(`aboutSub.${key}.title`),
        desc: t(`aboutSub.${key}.desc`),
        body: t(`aboutSub.${key}.body`),
      };
    },
  };
}
