"use client";

import {
  useEffect,
  useState,
} from "react";

type Material = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export default function MaterialsPage() {
  const [materials, setMaterials] =
    useState<Material[]>([]);

  async function loadMaterials() {
    const response =
      await fetch(
        "/api/knowledge/materials"
      );

    const data =
      await response.json();

    setMaterials(data);
  }

  useEffect(() => {
    loadMaterials();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Knowledge Materials
      </h1>

      <div className="space-y-4">

        {materials.map(
          (material) => (
            <div
              key={material.id}
              className="
                border
                rounded-lg
                p-4
                bg-white
              "
            >
              <h2 className="font-semibold">
                {material.name}
              </h2>

              <p className="text-sm text-gray-500">
                {material.slug}
              </p>

              <p className="text-sm text-gray-500">
                Articles:
                {" "}
                {material.count}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}