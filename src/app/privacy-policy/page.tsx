"use client";

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import useScrollReveal from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export default function PrivacyPolicyPage() {
  const [hRef, hVis] = useScrollReveal({ delay: 0 });
  const [s1Ref, s1Vis] = useScrollReveal({ delay: 100 });
  const [s2Ref, s2Vis] = useScrollReveal({ delay: 200 });
  const [s3Ref, s3Vis] = useScrollReveal({ delay: 300 });
  const [s4Ref, s4Vis] = useScrollReveal({ delay: 400 });
  const [s5Ref, s5Vis] = useScrollReveal({ delay: 500 });
  const [s6Ref, s6Vis] = useScrollReveal({ delay: 600 });
  const [s7Ref, s7Vis] = useScrollReveal({ delay: 700 });
  const [s8Ref, s8Vis] = useScrollReveal({ delay: 800 });
  const [s9Ref, s9Vis] = useScrollReveal({ delay: 900 });
  const [s10Ref, s10Vis] = useScrollReveal({ delay: 1000 });

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
          Privacy Policy
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 select-none">
          FasTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground select-none">Privacy Policy</h2>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider select-none">
            Effective Date: May 2, 2026
          </p>
        </div>
      </section>

      <section ref={s1Ref} className={cn("space-y-4 transition-all", s1Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">1. About Us</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack is a free browser-based intermittent fasting timer created and maintained by an independent web builder known as Pex. This privacy policy is here to give you a clear and honest picture of how FasTrack handles your information when you use the app.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          We take your privacy seriously, not as a legal formality but because we genuinely believe you should know exactly what happens with your data when you use any tool on the internet. If anything in this policy is unclear, feel free to reach out through the Contact Us page.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section ref={s2Ref} className={cn("space-y-4 transition-all", s2Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">2. Information We Collect</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack does not collect, store, or transmit any personal information to any server. Your fasting history, timer settings, and preferences are stored exclusively on your own device using your browser's local storage. This means the data never leaves your device and we have no access to it whatsoever.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          The only exception to this is data that may be collected by Google AdSense, our third-party advertising partner, through cookies and similar technologies. This is described in full detail in Section 4 and Section 5 below.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section ref={s3Ref} className={cn("space-y-4 transition-all", s3Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">3. How We Use Information</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          Because FasTrack does not collect your personal data, there is no user data for us to use, sell, or share. Your fasting records belong entirely to you. You can view them, use them, and delete them at any time through the Log page on the app.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          If you choose to reset your fasting log, that data is permanently removed from your device immediately. We have no copy of it and no way to recover it once deleted.
        </p>
        <Separator className="opacity-20" />
      </section>
     <section ref={s4Ref} className={cn("space-y-4 transition-all", s4Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">4. Google AdSense</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack uses Google AdSense to display advertisements. This is how we keep the app completely free for everyone. Google AdSense is a third-party advertising service operated by Google LLC. When you visit FasTrack, Google AdSense may use cookies and similar tracking technologies to serve ads that are relevant to your interests based on your browsing activity across websites.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          Specifically, Google uses the DoubleClick DART cookie to serve ads to users based on their visit to FasTrack and other sites on the internet. This cookie allows Google and its partners to serve ads tailored to your interests. You may opt out of the use of the DART cookie by visiting Google's Ad and Content Network Privacy Policy at{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
            policies.google.com/technologies/ads
          </a>.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          For more information about how Google collects and uses data when you use our site, please visit{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
            policies.google.com/privacy
          </a>.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section ref={s5Ref} className={cn("space-y-4 transition-all", s5Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">5. Cookies</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack itself does not set or use any cookies for its own functionality. However, Google AdSense, our advertising partner, does use cookies when ads are displayed on this site. These cookies allow Google to recognize your browser and serve you more relevant advertisements based on your interests and browsing history.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          If you would prefer not to receive personalized advertising, you have a few options. You can adjust your ad preferences through Google's Ad Settings at{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
            adssettings.google.com
          </a>{' '}
          or opt out of interest-based advertising through the Network Advertising Initiative at{' '}
          <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
            optout.networkadvertising.org
          </a>.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section ref={s6Ref} className={cn("space-y-4 transition-all", s6Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">6. Local Storage</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack uses your browser's local storage to save your fasting history, timer settings, and preferences between sessions. Local storage is different from cookies in one important way — the data stays on your device only and is never transmitted anywhere. We use it purely to make the app work reliably across browser sessions.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          You can clear your local storage data at any time through your browser settings, or simply use the Reset Log button on the Log page to delete your fasting history. Once cleared, the data is gone permanently and cannot be recovered.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section ref={s7Ref} className={cn("space-y-4 transition-all", s7Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">7. Third Party Links</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack may contain links to third-party websites, including the Google policy pages referenced in this document. Once you leave FasTrack and navigate to an external site, this privacy policy no longer applies. We have no control over the content, privacy practices, or data policies of any third-party website and we are not responsible for them.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          We encourage you to review the privacy policy of any site you visit, especially before sharing any personal information with them.
        </p>
        <Separator className="opacity-20" />
      </section>
     <section ref={s8Ref} className={cn("space-y-4 transition-all", s8Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">8. Security</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          Your fasting data is stored locally on your own device, which means it is as secure as the device itself. Since FasTrack does not transmit your data to any external server, there is no risk of your fasting history being exposed through a server-side data breach on our end.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          That said, no method of electronic storage is completely foolproof. We recommend keeping your device, browser, and operating system up to date as a general best practice for your own security online.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section ref={s9Ref} className={cn("space-y-4 transition-all", s9Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">9. Children's Privacy</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          FasTrack is not directed at children under the age of 13. We do not knowingly collect any personal information from children. Since FasTrack does not collect personal information from any user at all, this applies equally across all age groups.
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          If you are a parent or guardian and you believe your child has somehow provided personal information through this site, please contact us using the details in Section 10 and we will take appropriate steps to address it promptly.
        </p>
        <Separator className="opacity-20" />
      </section>

      <section ref={s10Ref} className={cn("space-y-4 pb-12 transition-all", s10Vis ? "scroll-reveal-visible" : "scroll-reveal-hidden")}>
        <h2 className="text-2xl font-bold text-primary select-none">10. Contact Us</h2>
        <p className="leading-relaxed text-muted-foreground select-none">
          If you have any questions, concerns, or requests related to this privacy policy or how FasTrack handles your data, you are welcome to reach out directly. We read every message and will do our best to respond in a timely and helpful manner.
        </p>
        <p className="font-bold text-foreground text-lg select-none">
          proeditz9803@gmail.com
        </p>
        <p className="leading-relaxed text-muted-foreground select-none">
          This Privacy Policy was last updated on May 2, 2026. We reserve the right to update this policy at any time. Any changes will be reflected on this page with an updated effective date.
        </p>
      </section>

    </div>
  );
}