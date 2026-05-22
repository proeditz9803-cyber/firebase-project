import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleById, getRelatedArticles } from '@/lib/guide-articles';

function renderContent(content: string | undefined): React.ReactNode {
  if (!content || content.trim() === '') {
    return (
      <div className="min-h-48 rounded-2xl bg-card border border-border/50 flex items-center justify-center py-16">
        <p className="text-sm text-muted-foreground/40 select-none">Article content coming soon.</p>
      </div>
    );
  }

  const blocks = content.split('\n\n');

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.startsWith('# ')) {
          return (
            <h2
              key={index}
              className="text-2xl font-bold text-foreground select-none mt-8 first:mt-0"
            >
              {block.slice(2)}
            </h2>
          );
        }
        const lines = block.split('\n');
        return (
          <p
            key={index}
            className="text-base text-muted-foreground leading-relaxed select-none"
          >
            {lines.map((line, lineIndex) => (
              <span key={lineIndex}>
                {line}
                {lineIndex < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const article = getArticleById(articleId);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.relatedIds);

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <Link
        href="/guide"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors select-none"
      >
        ← Guide
      </Link>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground select-none">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="select-none">{article.date}</span>
          <span className="select-none">·</span>
          <span className="select-none">{article.readTime}</span>
          <span className="select-none">·</span>
          <span className="select-none">{article.size}</span>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed select-none">
          {article.description}
        </p>
      </div>
      {renderContent(article.content)}
      {relatedArticles.length > 0 && (
        <div className="space-y-4">
          {relatedArticles.map((related) => (
            <Link href={`/guide/${related.id}`} key={related.id} className="block">
              <div className="relative p-6 bg-card rounded-2xl border border-border hover:border-primary/40 transition-colors cursor-pointer">
                <span className="absolute top-4 right-4 text-xs text-muted-foreground select-none">
                  Related articles
                </span>
                <h3 className="text-base font-bold text-foreground mb-2 pr-32 select-none">
                  {related.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 select-none">
                  {related.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="select-none">{related.date}</span>
                  <span className="select-none">·</span>
                  <span className="select-none">{related.readTime}</span>
                  <span className="select-none">·</span>
                  <span className="select-none">{related.size}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}