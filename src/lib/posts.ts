import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { mdToHtml } from "./markdown";

const postsDirectory = path.join(process.cwd(), "posts");

// 🧩 Post 데이터 타입 정의
export interface PostMeta {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  slug: string;
  contentHtml: string;
  tocHtml: string;
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
 * 모든 게시물 메타데이터 가져오기
 */
export function getAllPostsMeta(): PostMeta[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"));

  const allPostsMeta = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      description: data.description ?? "",
      tags: (data.tags as string[]) ?? [],
    };
  });

  // 날짜 기준으로 최신순 정렬
  return allPostsMeta.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
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

  const { contentHtml, tocHtml } = await mdToHtml(content);

  return {
    slug,
    contentHtml,
    tocHtml,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    tags: (data.tags as string[]) ?? [],
  };
}
