export default function GuidePage() {
  const protocols = [
    { name: '16:8 Protocol', desc: 'The most popular method. You fast for 16 hours and eat within an 8-hour window. Ideal for beginners.' },
    { name: '18:6 Protocol', desc: 'An intermediate step with a tighter eating window, providing slightly more time in a fasted state.' },
    { name: '20:4 (Warrior Diet)', desc: 'An advanced method involving 20 hours of fasting and a 4-hour eating window, often late in the day.' },
    { name: 'OMAD (23:1)', desc: 'One Meal A Day. You consume all your daily calories in a single 1-hour window.' },
  ];

  const milestones = [
    { time: '4 Hours', effect: 'Your blood sugar begins to normalize and insulin levels drop as the last of your meal is digested.' },
    { time: '8 Hours', effect: 'Glycogen stores in the liver start to deplete. Your body begins preparing to switch to fat for energy.' },
    { time: '12 Hours', effect: 'Fat burning starts in earnest. Growth hormone levels increase to preserve muscle mass.' },
    { time: '16 Hours', effect: 'Autophagy (cellular repair) begins. Your cells start recycling old proteins and damaged components.' },
    { time: '24 Hours', effect: 'Ketosis is typically fully reached. Cellular regeneration and stem cell production increase.' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Intermittent Fasting Guide</h1>
        <p className="text-muted-foreground leading-relaxed">
          Intermittent fasting is an eating pattern that cycles between periods of fasting and eating. 
          Unlike traditional diets, it doesn’t specify which foods you should eat, but rather when 
          you should eat them. It is essentially an "eating pattern" rather than a diet.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Popular Protocols</h2>
        <div className="grid gap-4">
          {protocols.map((p) => (
            <div key={p.name} className="p-6 bg-card rounded-2xl border border-border">
              <h3 className="text-lg font-bold text-primary mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">What Happens to Your Body?</h2>
        <div className="space-y-4">
          {milestones.map((m) => (
            <div key={m.time} className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-bold text-primary">{m.time}</div>
              <div className="text-sm text-muted-foreground border-l border-border pl-4 pb-4">
                {m.effect}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Common Mistakes</h2>
        <ul className="space-y-4 list-disc pl-6 text-muted-foreground text-sm">
          <li>
            <strong className="text-foreground">Diving in too fast:</strong> Starting with 20:4 or OMAD can be stressful for the body. Start with 12:12 or 14:10.
          </li>
          <li>
            <strong className="text-foreground">Dehydration:</strong> Many people forget to drink water. Coffee and tea are okay (without sugar/milk), but water is essential.
          </li>
          <li>
            <strong className="text-foreground">Overeating during the window:</strong> Fasting isn't a license to eat junk food. Focus on nutrient-dense meals.
          </li>
          <li>
            <strong className="text-foreground">Breaking fasts too aggressively:</strong> Large, heavy meals can cause digestive distress. Start with something light.
          </li>
        </ul>
      </section>

      <section className="p-8 bg-primary/10 rounded-2xl border border-primary/20">
        <h2 className="text-xl font-bold mb-4">Pro Tip for Success</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Consistency is more important than perfection. If you have to break your fast early one day, 
          don't worry. Just resume your schedule the following day. Listen to your body—fasting 
          should feel challenging but never painful or dangerous.
        </p>
      </section>
    </div>
  );
}