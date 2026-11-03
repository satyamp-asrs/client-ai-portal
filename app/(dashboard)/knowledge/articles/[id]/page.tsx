type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getArticle(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/knowledge/articles/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load article"
    );
  }

  return response.json();
}

export default async function ArticlePage({
  params,
}: PageProps) {
  const { id } = await params;

  const article =
    await getArticle(id);

  const meta =
    article?.knowledge_meta || {};

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          {article.title?.rendered}
        </h1>

        <p className="text-gray-500 mt-2">
          Slug: {article.slug}
        </p>
      </div>

      {meta.direct_answer && (
        <section className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Direct Answer
          </h2>

          <div
            dangerouslySetInnerHTML={{
              __html:
                meta.direct_answer,
            }}
          />
        </section>
      )}

      {meta.why && (
        <section className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Why Materials Differ
          </h2>

          <div
            dangerouslySetInnerHTML={{
              __html:
                meta.why,
            }}
          />
        </section>
      )}

      {meta.comparison_rows?.length >
        0 && (
        <section className="bg-white border rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-4">
            Comparison
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse border">

              <thead>
                <tr className="bg-gray-100">

                  <th className="border p-3 text-left">
                    Material
                  </th>

                  <th className="border p-3 text-left">
                    Best For
                  </th>

                  <th className="border p-3 text-left">
                    Consideration
                  </th>

                </tr>
              </thead>

              <tbody>

                {meta.comparison_rows.map(
                  (
                    row: any,
                    index: number
                  ) => (
                    <tr key={index}>

                      <td className="border p-3">
                        {row.material}
                      </td>

                      <td className="border p-3">
                        {row.best_for}
                      </td>

                      <td className="border p-3">
                        {
                          row.consideration
                        }
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </section>
      )}

      {meta.when_rows?.length >
        0 && (
        <section className="bg-white border rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-4">
            When To Consider
          </h2>

          <div className="space-y-4">

            {meta.when_rows.map(
              (
                row: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="border rounded p-4"
                >
                  <h3 className="font-semibold mb-2">
                    {row.material}
                  </h3>

                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        row.detail,
                    }}
                  />
                </div>

              )
            )}

          </div>

        </section>
      )}

      {meta.faqs?.length > 0 && (
        <section className="bg-white border rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            {meta.faqs.map(
              (
                faq: any,
                index: number
              ) => (

                <div key={index}>

                  <h3 className="font-semibold text-lg mb-2">
                    {faq.question}
                  </h3>

                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        faq.answer,
                    }}
                  />

                </div>

              )
            )}

          </div>

        </section>
      )}

      {meta.related_links?.length >
        0 && (
        <section className="bg-white border rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-4">
            Related Links
          </h2>

          <div className="space-y-2">

            {meta.related_links.map(
              (
                link: any,
                index: number
              ) => (

                <a
                  key={index}
                  href={link.url}
                  className="block text-blue-600 hover:underline"
                >
                  {link.label}
                </a>

              )
            )}

          </div>

        </section>
      )}

      {meta.cta_title && (
        <section className="bg-blue-50 border rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-3">
            {meta.cta_title}
          </h2>

          <p className="mb-4">
            {meta.cta_text}
          </p>

          {meta.cta_url && (
            <a
              href={meta.cta_url}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
            >
              {meta.cta_label ||
                "Learn More"}
            </a>
          )}

        </section>
      )}

    </div>
  );
}