import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 px-6">
      {/* Brand Header */}
      <section className="text-center space-y-6">
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          Rules & Guidelines
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Terms and Conditions</h2>
        </div>
      </section>

      {/* 1. Health and Safety Terms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">1. Health and Safety Terms</h2>
        <div className="leading-relaxed text-muted-foreground space-y-4">
          <p>
            We built FasTrack because we genuinely believe in 
            the power of fasting done right. But fasting is not 
            for everyone and we want to be upfront about that.
          </p>
          <p>
            If any of the following apply to you please speak 
            to your doctor before using FasTrack:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are pregnant or currently breastfeeding</li>
            <li>You are under the age of 18</li>
            <li>You have diabetes or any blood sugar related condition</li>
            <li>You have a history of eating disorders</li>
            <li>You are currently taking prescription medication</li>
            <li>You have any existing diagnosed medical condition</li>
          </ul>
          <p>
            Your health always comes first. No fasting goal 
            is worth compromising that.
          </p>
        </div>
        <Separator className="opacity-20" />
      </section>

      {/* 2. Fasting Timer Accuracy Terms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">2. Fasting Timer Accuracy Terms</h2>
        <p className="leading-relaxed text-muted-foreground">
          We have worked hard to make FasTrack's timer as 
          reliable and accurate as possible. However your 
          device and browser can sometimes get in the way. 
          Factors like your phone going to sleep, your browser 
          refreshing or losing internet connection can 
          occasionally affect the timer.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          We always recommend keeping your screen active 
          during a fast for the most accurate tracking 
          experience. While we do our best we cannot 
          guarantee perfect timer performance in every 
          situation on every device.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 3. Nutritional Information Terms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">3. Nutritional Information Terms</h2>
        <p className="leading-relaxed text-muted-foreground">
          We share fasting and nutrition related information 
          on FasTrack because we want to help you get the 
          most out of your fasting journey. However we are 
          not nutritionists or dietitians and nothing we 
          share should be treated as personalized dietary 
          advice.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Think of our content as a helpful starting point 
          not a substitute for professional guidance tailored 
          to your specific health needs.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 4. User Responsibility Terms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">4. User Responsibility Terms</h2>
        <div className="leading-relaxed text-muted-foreground space-y-4">
          <p>
            At the end of the day you know your body better 
            than anyone else. While FasTrack is here to 
            support your FasTrack journey the responsibility 
            for your health and wellbeing during a fast 
            rests with you.
          </p>
          <p>
            We ask that you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pay close attention to how your body feels while fasting</li>
            <li>Stop your fast immediately if you feel unwell dizzy or unusually weak</li>
            <li>Make sure fasting is genuinely suitable for your personal health situation</li>
            <li>Always get professional medical advice before starting a new fasting routine</li>
          </ul>
        </div>
        <Separator className="opacity-20" />
      </section>

      {/* 5. No Guarantee of Results Terms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">5. No Guarantee of Results Terms</h2>
        <p className="leading-relaxed text-muted-foreground">
          We would love to promise you that FasTrack will 
          transform your health overnight but that would 
          not be honest. Fasting affects everyone differently 
          and results depend on many personal factors 
          including your overall diet lifestyle health 
          condition and consistency.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          FasTrack is a tool to help you stay on track. 
          The results are built by you.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 6. Emergency Situations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">6. Emergency Situations</h2>
        <p className="leading-relaxed text-muted-foreground">
          FasTrack is a fasting tracker not a medical 
          service. If at any point during your fast you 
          experience a medical emergency please stop 
          fasting immediately and contact your local 
          emergency services right away.
        </p>
        <p className="leading-relaxed text-muted-foreground font-bold">
          Please do not wait or try to push through a 
          fast if something feels seriously wrong. 
          Your life is more important than any fasting goal.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 7. Fasting Content Terms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">7. Fasting Content Terms</h2>
        <p className="leading-relaxed text-muted-foreground">
          The fasting tips guides and educational content 
          on FasTrack are based on widely practiced fasting 
          methods and general wellness knowledge. We share 
          this content to inform and inspire not to prescribe.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          What works well for one person may not work for 
          another. We encourage you to explore what fasting 
          method feels right for your body and your lifestyle 
          rather than rigidly following any single approach.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 8. Data and Local Storage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">8. Data and Local Storage</h2>
        <p className="leading-relaxed text-muted-foreground">
          Everything you track on FasTrack stays on your 
          device. We do not collect store or have any access 
          to your fasting data. Your privacy matters to us 
          and we have intentionally built FasTrack so that 
          your personal fasting history never leaves your 
          own hands.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Just keep in mind that clearing your browser 
          storage or switching devices will erase your 
          local data so please be mindful of that.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 9. Changes to These Terms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">9. Changes to These Terms</h2>
        <p className="leading-relaxed text-muted-foreground">
          As FasTrack grows and evolves these terms may 
          be updated from time to time. We will always 
          keep this page current so we recommend checking 
          back occasionally. Continuing to use FasTrack 
          after any updates means you are comfortable 
          with the revised terms.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 10. Contact Us */}
      <section className="space-y-4 pb-12">
        <h2 className="text-2xl font-bold text-primary">10. Contact Us</h2>
        <p className="leading-relaxed text-muted-foreground">
          Have a question about these terms or anything 
          else on FasTrack? We are happy to hear from you. 
          Reach out to us anytime at:
        </p>
        <p className="font-bold text-foreground text-lg">
          proeditz9803@gmail.com
        </p>
        <p className="leading-relaxed text-muted-foreground">
          We do our best to respond to every message as quickly as possible.
        </p>
      </section>
    </div>
  );
}
