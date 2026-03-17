import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function PrivacyPolicyPage() {
  const effectiveDate = "October 27, 2023";

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 px-6">
      {/* Brand Header - Identical styling to About page */}
      <section className="text-center space-y-6">
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          Privacy & Legal
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FastTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h2>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Effective Date: {effectiveDate}
          </p>
        </div>
      </section>

      {/* 1. Introduction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">1. Introduction</h2>
        <p className="leading-relaxed text-muted-foreground">
          Welcome to FastTrack. This Privacy Policy describes how FastTrack ("we," "our," or "the site") handles user data and privacy. We are committed to protecting your privacy and ensuring you have a safe experience while using our intermittent fasting timer and tracking tools.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 2. Information We Collect */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">2. Information We Collect</h2>
        <p className="leading-relaxed text-muted-foreground">
          FastTrack does not collect any personal information. We do not ask for your name, email address, phone number, or any other identifying data. All fasting records, timer settings, and progress data entered by you are stored locally on your own device through browser local storage. This information is never transmitted to any server and is never accessed by us.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 3. How We Use Information */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">3. How We Use Information</h2>
        <p className="leading-relaxed text-muted-foreground">
          Since no personal data is collected, no user data is used, sold, shared, or transmitted by FastTrack in any way. Your data remains strictly under your control on your own hardware.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 4. Google AdSense and Third Party Advertising */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">4. Google AdSense and Third Party Advertising</h2>
        <div className="space-y-4 leading-relaxed text-muted-foreground">
          <p>
            FastTrack uses Google AdSense to display advertisements. Google AdSense is a third-party service that may use cookies to serve personalized ads based on your browsing activity on this and other websites.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>These cookies are set by Google LLC, not by FastTrack.</li>
            <li>Google uses advertising cookies to enable it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
          </ul>
          <p>
            For more information on how Google uses data when you use our site, please visit <a href="https://policies.google.com/privacy" className="text-primary hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Google's Privacy & Terms</a>.
          </p>
        </div>
        <Separator className="opacity-20" />
      </section>

      {/* 5. Cookies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">5. Cookies</h2>
        <p className="leading-relaxed text-muted-foreground">
          FastTrack itself does not set any cookies. However, Google AdSense, as a third-party service, may set cookies on your device for advertising purposes. Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide reporting information. You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 6. Local Storage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">6. Local Storage</h2>
        <p className="leading-relaxed text-muted-foreground">
          FastTrack uses browser local storage solely to save your fasting timer data, protocol preferences, and history on your own device. This ensures your progress is saved between sessions without the need for an account. This data never leaves your device and is completely inaccessible to us. You can delete this data at any time by clearing your browser storage or site data through your browser's settings.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 7. Third Party Links */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">7. Third Party Links</h2>
        <p className="leading-relaxed text-muted-foreground">
          FastTrack may contain links to third-party websites. Please be aware that we are not responsible for the privacy practices or content of those websites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personal information.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 8. Children's Privacy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">8. Children's Privacy</h2>
        <p className="leading-relaxed text-muted-foreground">
          FastTrack is not directed at children under the age of 13. We do not knowingly collect or maintain any personal data from children. If you are under 13, please do not use this site or provide any information.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 9. Changes to This Policy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">9. Changes to This Policy</h2>
        <p className="leading-relaxed text-muted-foreground">
          This Privacy Policy may be updated periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. Users should check this page regularly for any changes. Your continued use of the site after any modifications constitutes acceptance of the updated policy.
        </p>
        <Separator className="opacity-20" />
      </section>

      {/* 10. Contact Us */}
      <section className="space-y-4 pb-12">
        <h2 className="text-2xl font-bold text-primary">10. Contact Us</h2>
        <p className="leading-relaxed text-muted-foreground">
          For any privacy-related questions or concerns regarding this policy or the practices of this site, you can reach us at:
        </p>
        <p className="font-bold text-foreground text-lg">
          proeditz9803@gmail.com
        </p>
      </section>
    </div>
  );
}
