"use client";

import {
  useEffect,
  useState,
} from "react";

type Hub = {
  id: number;

  name: string;

  slug: string;

  count: number;
};

export default function HubsPage() {
  const [hubs, setHubs] =
    useState<Hub[]>([]);

  async function loadHubs() {
    const response =
      await fetch(
        "/api/knowledge/hubs"
      );

    const data =
      await response.json();

    setHubs(data);
  }

  useEffect(() => {
    loadHubs();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Knowledge Hubs
      </h1>

      <div className="space-y-4">

        {hubs.map((hub) => (
          <div
            key={hub.id}
            className="
              border
              rounded-lg
              p-4
              bg-white
            "
          >
            <h2 className="font-semibold">
              {hub.name}
            </h2>

            <p className="text-sm text-gray-500">
              {hub.slug}
            </p>

            <p className="text-sm text-gray-500">
              Articles:
              {" "}
              {hub.count}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}