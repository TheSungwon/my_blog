import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
import { VNode } from "unist";

export async function mdToHtml(
  markdown: string
): Promise<{ contentHtml: string; tocHtml: string }> {
  let tocHtml = "";

  let tocNode: VNode | null = null;

  // unified 파이프라인을 설정합니다.
  const file = await unified()
    .use(remarkParse) // 1. 마크다운 파싱 시작
    .use(remarkGfm) // 2. GFM 확장 기능 적용
    .use(remarkRehype, { allowDangerousHtml: true }) // 3. HTML 트리로 변환 (인라인 HTML 허용)
    // 💡 참고: rehype-highlight는 rehype-stringify 전에 와야 합니다.
    .use(rehypeHighlight) // 4. 코드 하이라이팅 적용
    .use(rehypeSlug) // 5. 제목(h1~h6)에 id 추가
    .use(rehypeAutolinkHeadings, {
      // 6. 제목에 자동 링크 추가 (클릭 가능한 앵커)
      behavior: "wrap",
      properties: {
        className: ["anchor"],
      },
    })
    // 7. 목차 생성. 목차가 TOCNode에 저장됩니다. (본문에 삽입되는 것이 아님)
    .use(rehypeToc, {
      headings: ["h2", "h3"],
      cssClasses: {
        toc: "toc",
        link: "toc-link",
      },
      customizeToc: (toc) => {
        if (toc && toc.children && toc.children.length > 0) {
          tocNode = toc; // TOC 트리를 저장
        }
        return false; // TOC가 본문에 들어가는 것을 막음
      },
    })
    .use(rehypeStringify, {
      // 8. 최종 HTML 문자열로 변환
      allowDangerousCharacters: true,
      allowDangerousHtml: true,
    })
    .process(markdown); // 변환 프로세스 실행

  if (tocNode) {
    tocHtml = String(await unified().use(rehypeStringify).stringify(tocNode));
  }

  return { contentHtml: String(file), tocHtml };
}
