// lib/markdown.ts
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export async function mdToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse) // MD 파서
    .use(remarkGfm) // 테이블/체크박스/스트라이크 등 GFM
    .use(remarkHtml, { sanitize: false }) // HTML로 직변환 (rehype 없이)
    .process(markdown);

  return String(file);
}
