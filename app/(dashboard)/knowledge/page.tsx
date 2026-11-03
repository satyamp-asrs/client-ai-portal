"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Article = {
  id: number;
  title?: {
    rendered?: string;
  };
};

export default function KnowledgePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [hubs, setHubs] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [
        articlesRes,
        hubsRes,
        materialsRes,
        topicsRes,
      ] = await Promise.all([
        fetch("/api/knowledge/articles"),
        fetch("/api/knowledge/hubs"),
        fetch("/api/knowledge/materials"),
        fetch("/api/knowledge/topics"),
      ]);

      const articlesData = await articlesRes.json();
      const hubsData = await hubsRes.json();
      const materialsData = await materialsRes.json();
      const topicsData = await topicsRes.json();

      setArticles(
        Array.isArray(articlesData)
          ? articlesData
          : []
      );

      setHubs(
        Array.isArray(hubsData)
          ? hubsData
          : []
      );

      setMaterials(
        Array.isArray(materialsData)
          ? materialsData
          : []
      );

      setTopics(
        Array.isArray(topicsData)
          ? topicsData
          : []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading Knowledge Center...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Knowledge Center
        </h1>

        <p className="text-gray-500 mt-2">
          Manage articles, hubs, materials
          and topics.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <Link
          href="/knowledge/articles"
          className="border rounded-lg bg-white p-6 hover:shadow"
        >
          <h2 className="font-semibold">
            Articles
          </h2>

          <p className="text-3xl mt-3">
            {articles.length}
          </p>
        </Link>

        <Link
          href="/knowledge/hubs"
          className="border rounded-lg bg-white p-6 hover:shadow"
        >
          <h2 className="font-semibold">
            Hubs
          </h2>

          <p className="text-3xl mt-3">
            {hubs.length}
          </p>
        </Link>

        <Link
          href="/knowledge/materials"
          className="border rounded-lg bg-white p-6 hover:shadow"
        >
          <h2 className="font-semibold">
            Materials
          </h2>

          <p className="text-3xl mt-3">
            {materials.length}
          </p>
        </Link>

        <Link
          href="/knowledge/topics"
          className="border rounded-lg bg-white p-6 hover:shadow"
        >
          <h2 className="font-semibold">
            Topics
          </h2>

          <p className="text-3xl mt-3">
            {topics.length}
          </p>
        </Link>

      </div>

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Recent Articles
        </h2>

        {articles.length === 0 ? (
          <div className="border rounded-lg p-4 bg-white">
            No articles found.
          </div>
        ) : (
          <div className="space-y-3">

            {articles
              .slice(0, 10)
              .map((article) => (
                <Link
                  href={`/knowledge/articles/${article.id}`}
                  key={article.id}
                  className="block border rounded-lg bg-white p-4 hover:bg-gray-50"
                >
                  <div className="font-medium">
                    {article.title?.rendered ??
                      "Untitled Article"}
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    ID: {article.id}
                  </div>
                </Link>
              ))}

          </div>
        )}

      </div>

    </div>
  );
}