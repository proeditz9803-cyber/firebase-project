export interface GuideArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  size: string;
  relatedIds: string[];
  content?: string;
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
    content: "Most people talking about healthy diets want to know what to eat. Intermittent fasting turns that upside down. The big question here is when you eat, not what ends up on your plate. You won't find strict lists of good or bad foods, or daily calorie minimums and maximums. Instead, you organize your day by shifting between set periods for eating and fasting. This approach has picked up a lot of steam, both for managing weight and for improving markers of metabolic health (Liu L, Jinjiang Hospital of Traditional Chinese Medicine, 2025 — pubmed.ncbi.nlm.nih.gov/40731344/). People have all kinds of reasons for jumping in. For some, it's about losing weight. Others want better energy or more stable blood sugar. Some like that it takes the guesswork out of meals. Often, it's a mix of these reasons. This guide breaks down what intermittent fasting really means, looks at the most common methods, highlights what the latest research shows, and points out who shouldn't try it without a professional's advice.\n\n# What Is Intermittent Fasting?\n\nIntermittent fasting splits your day into two chunks: an eating window, and a fasting window. During the eating window, you have your meals. During the fasting window, you stay away from anything with calories—food and drinks alike. The main difference from traditional diets is this: intermittent fasting changes when you eat, not what you eat, or how much (University of California San Diego, 2022 — pmc.ncbi.nlm.nih.gov/articles/PMC9650338/). With calorie-restriction diets, people obsess over how much they're eating. With intermittent fasting, the only real rule is about the clock.\n\n# What's Happening During the Fast?\n\nAfter you eat, your body uses the energy it just got from food first. As time passes without another meal, those energy reserves run down. Your body then taps into what you've already stored. Fasting essentially nudges your body to switch from burning what you just ate, to burning what you have on reserve (Sukkriang N, Walailak University School of Medicine, 2024 — pmc.ncbi.nlm.nih.gov/articles/PMC11363092/). First, it hunts down stored glucose—glycogen in your liver and muscles. As those stores shrink, it pulls more from fat. Scientists watch this shift in fuel use closely, seeing it as the key mechanism behind fasting's health effects.\n\n# Why Do People Choose Intermittent Fasting?\n\nPeople's reasons for trying intermittent fasting overlap quite a bit. The top reason is usually losing weight. There's also interest in more stable energy, better blood sugar, or just feeling healthier. Many start it for weight loss and metabolism, but a surprising number stick with it because it simplifies life (Various Authors, umbrella review, 2025 — pubmed.ncbi.nlm.nih.gov/39618023/). A simple rule tied to time—rather than agonizing over every snack and meal—removes a lot of mental clutter.\n\n# Common Types of Intermittent Fasting\n\n# The 16:8 Method\n\nWith the 16:8 method, you fast for 16 hours, then eat during an 8-hour window. For most, meals happen between noon and 8 PM, but you can shift that window—whatever suits your routine. It's one of the most popular ways to fast (Sukkriang N, Walailak University School of Medicine, 2024 — pmc.ncbi.nlm.nih.gov/articles/PMC11363092/). Sleeping covers a good chunk of the fasting period, which is why a lot of beginners start here.\n\n# The 18:6 Method\n\nThis version stretches the fast to 18 hours and squeezes meals into just 6. Eat between noon and 6 PM, for example, and you're doing 18:6. That extra two hours in the fasted state pushes your body further, and for many, evenings get tricky. Dinner with friends, family meals—these social events become harder to fit. People notice those last couple fasting hours far more than with 16:8.\n\n# OMAD: One Meal a Day\n\nOMAD is just what it sounds like—all your eating happens at one meal. That means nearly 23 hours of fasting every day. It's a far bigger challenge than 16:8 or 18:6 (Various Authors, 2022 — pmc.ncbi.nlm.nih.gov/articles/PMC8787212/). That one meal must deliver all the protein, fat, carbs, vitamins, and minerals you need. Most folks don't start here. Start here by accident—or without careful planning—and you risk missing out on important nutrients.\n\n# Picking a Method That Fits Your Life\n\nThere's no universal schedule. Success depends on what you can actually stick to (Various Authors, 2021 — pubmed.ncbi.nlm.nih.gov/33916366/). Work, exercise, family, hunger cues, even your social calendar—all these shape what's possible. Many begin at 16:8, see how their body reacts, and then decide if they're up for more.\n\n# Potential Benefits of Intermittent Fasting\n\n# Weight Management and Calorie Intake\n\nNarrowing your eating window shrinks the time you can actually eat. For many, that leads to eating less—without needing to count every calorie. Some folks try to make up for lost meals by eating larger portions, so meal quality still matters, but the time window naturally reins in overeating for a lot of people (Harvard Medical School, 2022 — health.harvard.edu/blog/should-you-try-intermittent-fasting-for-weight-loss-202207282790/).\n\n# Blood Sugar and Metabolic Health\n\nFasting seems to do more than just cut calories. It affects how your body handles sugar and insulin. Some studies find that time-restricted feeding improves insulin sensitivity, lowers blood pressure, and reduces oxidative stress—even when people don't lose weight (Sutton EF, Cell Metabolism, 2018 — pmc.ncbi.nlm.nih.gov/articles/PMC5990470/). There's a growing sense that the clock itself—when you eat—matters for metabolism.\n\n# Simplicity and Eating Habits\n\nHaving to decide what and when to eat, all day, every day, wears people out. A fixed window for eating takes a bunch of choices off your plate. That's one big reason many stick with fasting: less decision fatigue (Sukkriang N, Walailak University School of Medicine, 2024 — pmc.ncbi.nlm.nih.gov/articles/PMC11363092/). Say your rule is, \"I eat between noon and 8,\" and suddenly, you stop wasting brain power on constant food questions.\n\n# Cellular and Physiological Adaptations\n\nScientists have found that fasting does more than change what you see on the scale. It affects what's happening inside your cells. For example, fasting appears to trigger autophagy—a process where cells clean up damaged parts and recycle them. There are hints it supports DNA repair and the function of mitochondria, your cells' powerhouses (Varady KA, University of Illinois, 2017 — pubmed.ncbi.nlm.nih.gov/27810402/). Much of this research is early in humans, but it shows there's more to fasting than just weight.\n\n# What the Research Says\n\n# Evidence for Weight-Loss Outcomes\n\nClinical trials show intermittent fasting can help people lose weight, but usually in a modest way. One study found an average loss of 1.60 kg in lean adults (Templeman I, University of Bath, 2021 — pubmed.ncbi.nlm.nih.gov/34135111/). Heavier participants tend to lose more. In short, it's a proven tool for managing weight, but not a miracle.\n\n# Evidence for Metabolic Health\n\nBeyond just losing pounds, intermittent fasting can improve several markers tied to chronic disease risk: smaller waists, less fat, lower bad cholesterol, higher good cholesterol, lower blood pressure, better fasting insulin (Various Authors, 2024 — pubmed.ncbi.nlm.nih.gov/38500840/). The benefits reach wider than just changes on the scale.\n\n# Current Limitations of the Evidence\n\nThe science on fasting is accelerating, but still has holes. Studies test different schedules, enroll different types of people, and run for variable lengths, so results jump around (Various Authors, BMJ, 2025 — bmj.com/content/389/bmj-2024-082007). Many studies are short. We need more long-term data to really know the risks and rewards. So far, the weight of the evidence leans positive, but there's no universal best approach.\n\n# Who Should Be Cautious\n\n# People with Medical Conditions\n\nIf you have a health condition—especially those requiring regular medication or affecting blood sugar—talk with a healthcare provider before starting. Fasting can impact how your body handles meds, possibly demanding dosage or schedule adjustments (Various Authors, 2023 — pubmed.ncbi.nlm.nih.gov/37313231/). A professional can look at the full picture and help you fast safely, if it's appropriate.\nWe strongly recommend that you consult a professional healthcare provider before incorporating intermittent fasting in your routine.\n\n# Pregnant and Breastfeeding Individuals\n\nPregnancy and breastfeeding both crank up your nutritional needs. During these periods, fasting makes it much harder to eat enough to support your body and your baby. Most professionals say avoid fasting during these times (Mayo Clinic, 2025 — mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/intermittent-fasting/faq-20441303). Remember in a state of pregnancy or breastfeeding it's always recommended to fulfill your nutritional needs without causing harm to your health. Intermittent fasting may not be suitable for individuals who need a strict nutritional diet.\nWe strongly advise you to consult a healthcare professional regarding intermittent fasting during pregnancy or breastfeeding.\n\n# Individuals with a History of Eating Disorders\n\nFasting schedules are rigid by nature. That structure increases the risk of unhealthy thinking or behaviors for anyone with a history of disordered eating. If this applies to you, work with a qualified professional before considering any type of fasting (Various Authors, 2023 — pubmed.ncbi.nlm.nih.gov/37865786/). Considering intermittent fasting without consulting a healthcare professional can lead to various side effects.\n\n# Disclaimer\n\nThis article is for informational purposes—it doesn't constitute medical advice. FasTrack's content is researched and shared to educate. Always consult a qualified healthcare professional before changing how or when you eat. Intermittent fasting won't suit everyone. Your health comes before your goals. Intermittent fasting exists for the betterment of your health. But implementing it on your existing routine without proper healthcare advisory and guidance can lead to side effects and potential health issues.\n\n# Key Takeaways\n\n# Intermittent Fasting Is an Eating Schedule\n\nAt its heart, intermittent fasting is about dividing your day into eating and fasting periods. It's not a prescriptive diet, it's a timing rule (Various Authors, NIH, 2025 — pmc.ncbi.nlm.nih.gov/articles/PMC12738305/). Seeing it this way helps you set realistic expectations and decide if it works for your situation.\n\n# Different Methods Suit Different People\n\nNot every schedule fits every person. The 16:8, 18:6, and OMAD approaches all require different levels of commitment and create different experiences (Sukkriang N, Walailak University School of Medicine, 2024 — pmc.ncbi.nlm.nih.gov/articles/PMC11363092/). Stick with what you can do—nutritionally and practically. Starting with the easier option and then tweaking as you go is a smart play.\n\n# Research Is Promising—But Still Unfolding\n\nThere's real evidence that intermittent fasting can help with weight and metabolic health. We need longer-term studies to fully map the risks and benefits (Mayo Clinic, 2020 — newsnetwork.mayoclinic.org/discussion/mayo-clinic-q-and-a-long-term-benefits-and-risks-of-intermittent-fasting-arent-yet-known/). Take current findings as encouraging, but keep your expectations grounded in what we actually know right now. Realistic expectations make your fasting experience better, and it helps you avoid unnecessary setbacks.",
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
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
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
    content: '',
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