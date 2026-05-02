"use client";

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export default function TermsAndConditionsPage() {
  const [hRef, hVis] = useScrollReveal({ delay: 0 });
  const [s1Ref, s1Vis] = useScrollReveal({ delay: 150 });
  const [s2Ref, s2Vis] = useScrollReveal({ delay: 300 });
  const [s3Ref, s3Vis] = useScrollReveal({ delay: 450 });
  const [s4Ref, s4Vis] = useScrollReveal({ delay: 600 });
  const [s5Ref, s5Vis] = useScrollReveal({ delay: 750 });
  const [s6Ref, s6Vis] = useScrollReveal({ delay: 900 });
  const [s7Ref, s7Vis] = useScrollReveal({ delay: 1050 });
  const [s8Ref, s8Vis] = useScrollReveal({ delay: 1200 });
  const [s9Ref, s9Vis] = useScrollReveal({ delay: 1350 });
  const [s10Ref, s10Vis] = useScrollReveal({ delay: 1500 });
  const [s11Ref, s11Vis] = useScrollReveal({ delay: 1650 });
  const [s12Ref, s12Vis] = useScrollReveal({ delay: 1800 });
  const [s13Ref, s13Vis] = useScrollReveal({ delay: 1950 });

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 px-6">

      <section
        ref={hRef}
        className={cn(
          "text-center space-y-6 transition-all",
          hVis ? "scroll-reveal-visible" : "scroll-reveal-hidden"
        )}
      >
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold select-none">
          Rules & Guidelines
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 select-none">
          FasTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground select-none">Terms and Conditions</h2>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider select-none">
            Effective Date: May 2, 2026
          </p>
        </div>
      </section>

      <section
        ref={s1Ref}
        className={cn("space-y-4 transition-all", s1Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">1. Health and Safety Terms</h2>
        <div className="leading-relaxed text-muted-foreground space-y-4">
          <p className="select-none">
            We built FasTrack because we genuinely believe in the power of fasting done right. But fasting is not for everyone and we want to be upfront about that.
          </p>
          <p className="select-none">
            If any of the following apply to you please speak to your doctor before using FasTrack:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="select-none">You are pregnant or currently breastfeeding</li>
            <li className="select-none">You are under the age of 18</li>
            <li className="select-none">You have diabetes or any blood sugar related condition</li>
            <li className="select-none">You have a history of eating disorders</li>
            <li className="select-none">You are currently taking prescription medication</li>
            <li className="select-none">You have any existing diagnosed medical condition</li>
          </ul>
          <p className="select-none">
            Your health always comes first. No fasting goal is worth compromising that.
          </p>
        </div>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s2Ref}
        className={cn("space-y-4 transition-all", s2Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">2. Fasting Timer Accuracy Terms</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          We have worked hard to make FasTrack's timer as reliable and accurate as possible. However your device and browser can sometimes get in the way. Factors like your phone going to sleep, your browser refreshing, or losing internet connection can occasionally affect the timer.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          We always recommend keeping your screen active during a fast for the most accurate tracking experience. While we do our best we cannot guarantee perfect timer performance in every situation on every device.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s3Ref}
        className={cn("space-y-4 transition-all", s3Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">3. Nutritional Information Terms</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          We share fasting and nutrition related information on FasTrack because we want to help you get the most out of your fasting journey. However we are not nutritionists or dietitians and nothing we share should be treated as personalized dietary advice.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          Think of our content as a helpful starting point, not a substitute for professional guidance tailored to your specific health needs. Always consult a qualified healthcare professional before making significant changes to your diet or eating schedule.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s4Ref}
        className={cn("space-y-4 transition-all", s4Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">4. User Responsibility Terms</h2>
        <div className="leading-relaxed text-muted-foreground space-y-4">
          <p className="select-none">
            At the end of the day you know your body better than anyone else. While FasTrack is here to support your fasting journey, the responsibility for your health and wellbeing during a fast rests with you.
          </p>
          <p className="select-none">
            We ask that you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="select-none">Pay close attention to how your body feels while fasting</li>
            <li className="select-none">Stop your fast immediately if you feel unwell, dizzy, or unusually weak</li>
            <li className="select-none">Make sure fasting is genuinely suitable for your personal health situation</li>
            <li className="select-none">Always get professional medical advice before starting a new fasting routine</li>
          </ul>
        </div>
        <Separator className="opacity-20" />
      </section>
     <section
        ref={s5Ref}
        className={cn("space-y-4 transition-all", s5Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">5. No Guarantee of Results Terms</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          We would love to promise you that FasTrack will transform your health overnight but that would not be honest. Fasting affects everyone differently and results depend on many personal factors including your overall diet, lifestyle, health condition, and consistency.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack is a tool to help you stay on track. The results are built by you.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s6Ref}
        className={cn("space-y-4 transition-all", s6Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">6. Limitation of Liability</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack is provided as-is and entirely free of charge. To the fullest extent permitted by applicable law, the creator of FasTrack shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use the app or its content.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          This includes but is not limited to any health outcomes, data loss, timer inaccuracies, or interruptions in service. By using FasTrack you acknowledge that you are doing so at your own discretion and that the full responsibility for your wellbeing during any fasting period rests with you.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s7Ref}
        className={cn("space-y-4 transition-all", s7Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">7. Emergency Situations</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack is a fasting tracker not a medical service. If at any point during your fast you experience a medical emergency please stop fasting immediately and contact your local emergency services right away.
        </p>
        <p className="leading-relaxed text-muted-foreground font-bold select-none">
          Please do not wait or try to push through a fast if something feels seriously wrong. Your life is more important than any fasting goal.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s8Ref}
        className={cn("space-y-4 transition-all", s8Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">8. Fasting Content Terms</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          The fasting tips, guides, and educational content on FasTrack are based on widely practiced fasting methods and general wellness knowledge. We share this content to inform and inspire, not to prescribe.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          What works well for one person may not work for another. We encourage you to explore what fasting method feels right for your body and your lifestyle rather than rigidly following any single approach.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s9Ref}
        className={cn("space-y-4 transition-all", s9Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">9. Advertising</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack displays advertisements provided by Google AdSense in order to keep the app completely free for all users. By using FasTrack you acknowledge and accept that third-party advertisements may be displayed during your visit.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          These advertisements are served by Google and are subject to Google's own terms of service and privacy policies. FasTrack does not control which specific ads are displayed, and the appearance of any advertisement on this site does not constitute an endorsement by FasTrack of the advertised product or service.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          For full details on how Google handles advertising data please refer to the Google AdSense section of our Privacy Policy.
        </p>
        <Separator className="opacity-20" />
      </section>
     <section
        ref={s10Ref}
        className={cn("space-y-4 transition-all", s10Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">10. Intellectual Property</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack including its design, code, written content, and visual identity is the original work of its creator, Pex. All rights are reserved. You are welcome to use FasTrack freely as a personal fasting tool, but you may not copy, reproduce, redistribute, or create derivative works based on FasTrack's design or content without explicit written permission.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          If you have a collaboration idea or want to discuss any use of FasTrack's content, feel free to reach out through the Contact Us page. We are always open to a conversation.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s11Ref}
        className={cn("space-y-4 transition-all", s11Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">11. Data and Local Storage</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          Everything you track on FasTrack stays on your device. We do not collect, store, or have any access to your fasting data. Your privacy matters to us and we have intentionally built FasTrack so that your personal fasting history never leaves your own hands.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          Just keep in mind that clearing your browser storage or switching devices will erase your local data so please be mindful of that. For a full explanation of how your data is handled please read our Privacy Policy.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s12Ref}
        className={cn("space-y-4 transition-all", s12Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">12. Changes to These Terms</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          As FasTrack grows and evolves these terms may be updated from time to time. We will always keep this page current with the latest effective date so we recommend checking back occasionally. Continuing to use FasTrack after any updates are posted means you are comfortable with the revised terms.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          These Terms and Conditions were last updated on May 2, 2026.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section
        ref={s13Ref}
        className={cn("space-y-4 pb-12 transition-all", s13Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}
      >
        <h2 className="text-2xl font-bold text-primary select-none">13. Contact Us</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          Have a question about these terms or anything else on FasTrack? We are happy to hear from you. Whether it is a concern, a suggestion, or just a general question, feel free to reach out to us anytime at:
        </p>
        <p className="font-bold text-foreground text-lg select-none">
          proeditz9803@gmail.com
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          We do our best to respond to every message as quickly as possible.
        </p>
      </section>

    </div>
  );
}