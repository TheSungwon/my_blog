import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostData, Post } from "@/lib/posts";

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
    <article className="prose prose-neutral mx-auto max-w-3xl p-8 dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
