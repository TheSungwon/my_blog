/* eslint-disable @typescript-eslint/ban-ts-comment */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
import { Node } from "unist";
import { Element, Root } from "hast";

let tocNode: Element | undefined;

export async function mdToHtml(
  markdown: string
): Promise<{ contentHtml: string; tocHtml: string }> {
  let tocHtml = "";

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor"],
      },
    })
    // @ts-expect-error
    .use(rehypeToc, {
      headings: ["h2", "h3"],
      cssClasses: {
        toc: "toc",
        link: "toc-link",
      },
      customizeToc: (toc: Element) => {
        if (toc && toc.children && toc.children.length > 0) {
          tocNode = toc;
        }
        return false;
      },
    })
    .use(rehypeStringify, {
      allowDangerousCharacters: true,
      allowDangerousHtml: true,
    })
    .process(markdown);

  if (tocNode) {
    const tocRoot: Root = {
      type: "root",
      children: [tocNode],
    };

    tocHtml = String(await unified().use(rehypeStringify).stringify(tocRoot));
  }

  return { contentHtml: String(file), tocHtml };
}
