import { articles } from "@/data/articles";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ArticlePerformance() {
  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-white60">Article</TableHead>
            <TableHead className="text-white60 text-center">Category</TableHead>
            <TableHead className="text-white60 text-center">Read Time</TableHead>
            <TableHead className="text-white60 text-center">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.slug} className="border-border">
              <TableCell>
                <a
                  href={article.url}
                  className="text-sm font-medium hover:text-primary transition-colors line-clamp-1"
                >
                  {article.title}
                </a>
              </TableCell>
              <TableCell className="text-center">
                <span className="text-xs">
                  {article.categoryEmoji} {article.category}
                </span>
              </TableCell>
              <TableCell className="text-center text-xs text-white60">{article.readTime}</TableCell>
              <TableCell className="text-center text-xs text-white60 whitespace-nowrap">{article.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
