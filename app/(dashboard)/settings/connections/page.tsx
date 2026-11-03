"use client";

import { useEffect, useState } from "react";

type Website = {
  id: string;
  name: string;
  domain: string;
};

export default function ContentPage() {
  const [websites, setWebsites] =
    useState<Website[]>([]);

  const [selectedWebsite, setSelectedWebsite] =
    useState("");

  async function loadWebsites() {
    try {
      const response = await fetch(
        "/api/content"
      );

      const data =
        await response.json();

      setWebsites(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadWebsites();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold">
        Content
      </h1>

      <p className="mt-2 text-gray-600">
        Select a website to manage content.
      </p>

      <div className="mt-6">

        <select
          value={selectedWebsite}
          onChange={(e) =>
            setSelectedWebsite(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded
            w-full
            max-w-md
          "
        >
          <option value="">
            Select Website
          </option>

          {websites.map(
            (website) => (
              <option
                key={website.id}
                value={website.id}
              >
                {website.name}
              </option>
            )
          )}
        </select>

      </div>

      {selectedWebsite && (
        <div className="mt-8 p-4 border rounded">
          Website Selected ✅
        </div>
      )}

    </div>
  );
}