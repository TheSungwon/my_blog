import Link from "next/link";
import { getAllPostSlugs, getPostData, Post } from "@/lib/posts";

export default async function BlogIndex() {
  const slugs = getAllPostSlugs();
  const posts: Post[] = (
    await Promise.all(slugs.map((s) => getPostData(s.slug)))
  ).filter((p): p is Post => !!p);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">블로그</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
