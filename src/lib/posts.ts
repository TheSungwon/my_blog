import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// 🧩 Post 데이터 타입 정의
export interface PostMeta {
  title: string;
  date: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  slug: string;
  contentHtml: string;
}

/**
 * posts 폴더의 모든 슬러그 가져오기
 */
export function getAllPostSlugs(): { slug: string }[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"));
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
}

/**
 * 특정 슬러그의 markdown 파일을 읽고 파싱
 */
export async function getPostData(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    title: data.title ?? slug,
    date: data.date ?? "",
    tags: data.tags ?? [],
  };
}
