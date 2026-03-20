import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12 px-6">
      {/* Brand Header */}
      <section className="text-center space-y-6">
        <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 uppercase tracking-tighter font-bold">
          Get In Touch
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          FasTrack
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Contact Us</h2>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-stretch">
        {/* Left Column: Informational Content */}
        <div className="space-y-8 flex flex-col justify-center">
          <section className="space-y-4">
            <p className="leading-relaxed text-muted-foreground">
              We genuinely value user input and invite you to reach out with any questions, suggestions, or feedback about FasTrack. Whether you have a specific inquiry or just want to share your experience, we are here to listen and will respond as promptly as possible.
            </p>
          </section>

          <Separator className="opacity-20" />

          <section className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              We typically respond to all messages within 24 to 48 hours.
            </p>
          </section>

          <Separator className="opacity-20" />

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-primary">How we can help:</h3>
            <ul className="space-y-3">
              {[
                "General questions about FasTrack",
                "Bug reports or technical issues",
                "Feature requests and suggestions",
                "Privacy or data related concerns",
                "Advertising and partnership enquiries"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground leading-tight">
                  <span className="text-primary font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Vertical Divider for Desktop */}
        <div className="hidden md:block w-px bg-border opacity-20" />

        {/* Right Column: Email Action */}
        <div className="flex items-center justify-center py-8 md:py-0">
          <a 
            href="mailto:proeditz9803@gmail.com"
            className="w-full max-w-sm group flex flex-col items-center justify-center p-12 border-2 border-primary bg-transparent transition-all duration-200 hover:bg-primary text-primary hover:text-background no-underline rounded-none"
          >
            <span className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-2">
              Send Us an Email
            </span>
            <span className="text-sm font-medium opacity-80">
              proeditz9803@gmail.com
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
