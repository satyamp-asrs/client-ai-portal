"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetch(
          "/api/knowledge/articles"
        );

        const data = await response.json();

        console.log(data);

        setArticles(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadArticles();
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Knowledge Articles
      </h1>

      <div className="text-sm text-gray-500">
        Total Articles:
        {" "}
        {articles.length}
      </div>

      <div className="space-y-4">

        {articles.map((article) => (
          <Link
  href={`/knowledge/articles/${article.id}`}
  key={article.id}
  className="
    block
    border
    rounded-lg
    p-4
    bg-white
  "
>
            <h2 className="font-semibold text-lg">
              {
                article?.title
                  ?.rendered ??
                "Untitled"
              }
            </h2>

            <p className="text-sm text-gray-500">
              {article.slug}
            </p>

            <p className="text-xs text-gray-400">
              ID:
              {" "}
              {article.id}
            </p>
          </Link>
        ))}

      </div>

    </div>
  );
}