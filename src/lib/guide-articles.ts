export interface GuideArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  size: string;
  relatedIds: string[];
}

export const guideArticles: GuideArticle[] = [
  {
    id: 'a-simple-guide-about-intermittent-fasting',
    title: 'A simple guide about intermittent fasting',
    description: 'A beginner-friendly overview of what intermittent fasting is, how it works, and how to get started safely.',
    date: 'May 10, 2026',
    readTime: '6 min read',
    size: 'Medium',
    relatedIds: [
      'common-mistakes-beginners-make-frequently',
      'what-is-best-for-beginners',
      'what-is-16-8-18-6-and-omad-fasting-method',
    ],
  },
  {
    id: 'common-mistakes-beginners-make-frequently',
    title: 'Common mistakes beginners make frequently',
    description: 'An honest breakdown of the most common pitfalls new fasters encounter and how to avoid them from day one.',
    date: 'May 11, 2026',
    readTime: '5 min read',
    size: 'Short',
    relatedIds: [
      'a-simple-guide-about-intermittent-fasting',
      'risks-of-fasting-too-aggressively',
    ],
  },
  {
    id: 'what-is-best-for-beginners',
    title: 'What is best for beginners between 16:8, 18:6 and OMAD',
    description: 'A direct comparison of the three most popular fasting protocols to help beginners choose the right starting point.',
    date: 'May 12, 2026',
    readTime: '7 min read',
    size: 'Medium',
    relatedIds: [
      'a-simple-guide-about-intermittent-fasting',
      'what-is-16-8-18-6-and-omad-fasting-method',
      'what-is-different-between-16-8-18-6-and-omad',
    ],
  },
  {
    id: 'what-is-16-8-18-6-and-omad-fasting-method',
    title: 'What is 16:8, 18:6 and OMAD fasting method',
    description: 'A clear explanation of each of the three major fasting protocols, how they work, and who they are designed for.',
    date: 'May 12, 2026',
    readTime: '6 min read',
    size: 'Medium',
    relatedIds: [
      'what-is-best-for-beginners',
      'what-is-different-between-16-8-18-6-and-omad',
    ],
  },
  {
    id: 'what-is-different-between-16-8-18-6-and-omad',
    title: 'What is different between 16:8, 18:6 and OMAD',
    description: 'A side-by-side breakdown of the key differences in structure, difficulty, and outcomes between the three core methods.',
    date: 'May 13, 2026',
    readTime: '5 min read',
    size: 'Short',
    relatedIds: [
      'what-is-best-for-beginners',
      'what-is-16-8-18-6-and-omad-fasting-method',
    ],
  },
  {
    id: 'risks-of-fasting-too-aggressively',
    title: 'Risks of fasting too aggressively',
    description: 'Understanding the physical and mental risks of pushing fasting too hard, too fast, and how to fast safely.',
    date: 'May 14, 2026',
    readTime: '6 min read',
    size: 'Medium',
    relatedIds: [
      'a-simple-guide-about-intermittent-fasting',
      'common-mistakes-beginners-make-frequently',
    ],
  },
];

export function getArticleById(id: string): GuideArticle | undefined {
  return guideArticles.find((article) => article.id === id);
}

export function getRelatedArticles(relatedIds: string[]): GuideArticle[] {
  return relatedIds
    .map((id) => getArticleById(id))
    .filter((article): article is GuideArticle => article !== undefined);
}