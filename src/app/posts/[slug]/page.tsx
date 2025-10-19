import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostData, Post } from "@/lib/posts";
import { Metadata } from "next";

// generateMetadata 함수를 수정합니다.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostData(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    icons: {
      icon: "/computer.png",
    },
  };
}

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
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto p-8">
      <article className="flex-grow">
        <h1 className="mb-2 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          작성일: {post.date}
          {post.tags && post.tags.length > 0 && (
            <span className="ml-4">
              태그:
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="ml-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-400/20"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
        </p>
        {post.description && (
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {post.description}
          </p>
        )}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {post.tocHtml && (
        <aside className="w-full md:w-64 flex-shrink-0 mt-8 md:mt-16">
          <div
            className="sticky top-0 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            dangerouslySetInnerHTML={{ __html: post.tocHtml }}
          />
        </aside>
      )}
    </div>
  );
}
