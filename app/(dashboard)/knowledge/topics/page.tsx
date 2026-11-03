"use client";

import {
  useEffect,
  useState,
} from "react";

type Topic = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export default function TopicsPage() {
  const [topics, setTopics] =
    useState<Topic[]>([]);

  async function loadTopics() {
    const response =
      await fetch(
        "/api/knowledge/topics"
      );

    const data =
      await response.json();

    setTopics(data);
  }

  useEffect(() => {
    loadTopics();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Knowledge Topics
      </h1>

      <div className="space-y-4">

        {topics.map(
          (topic) => (
            <div
              key={topic.id}
              className="
                border
                rounded-lg
                p-4
                bg-white
              "
            >
              <h2 className="font-semibold">
                {topic.name}
              </h2>

              <p className="text-sm text-gray-500">
                {topic.slug}
              </p>

              <p className="text-sm text-gray-500">
                Articles:
                {" "}
                {topic.count}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}