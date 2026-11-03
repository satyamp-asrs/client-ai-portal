"use client";

import {
  useEffect,
  useState,
} from "react";

export default function ArticlePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const [article, setArticle] =
    useState<any>(null);

  useEffect(() => {

    params.then(
      async ({ id }) => {

        const response =
          await fetch(
            `/api/knowledge/article/${id}`
          );

        const data =
          await response.json();

        setArticle(data);
      }
    );

  }, [params]);

  if (!article) {
    return (
      <div>
        Loading Article...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold">
        {
          article.title
            ?.rendered
        }
      </h1>

      <div className="text-sm text-gray-500">
        Slug:
        {" "}
        {article.slug}
      </div>

      <div className="text-sm text-gray-500">
        Status:
        {" "}
        {article.status}
      </div>

      <div className="text-sm text-gray-500">
        Modified:
        {" "}
        {article.modified}
      </div>

      <div
        className="
          prose
          max-w-none
          bg-white
          p-6
          rounded-lg
          border
        "
        dangerouslySetInnerHTML={{
          __html:
            article.content
              ?.rendered,
        }}
      />

    </div>
  );
}