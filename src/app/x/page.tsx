import Link from "next/link";
import { getAllPostSlugs, getPostData, Post } from "@/lib/posts";

export default async function BlogIndex() {
  const slugs = getAllPostSlugs();
  const posts: Post[] = (
    await Promise.all(slugs.map((s) => getPostData(s.slug)))
  ).filter((p): p is Post => !!p);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        💻 TheSungwon’s Dev Journal ✨
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col h-48 p-5">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <div className="mt-auto">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📅 {post.date}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
