import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostData, Post } from "@/lib/posts";

// Next.js 15 기준: params는 Promise 형태
export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post: Post | null = await getPostData(slug);
  if (!post) return notFound();

  return (
    <article className="prose mx-auto p-8">
      <h1>{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
