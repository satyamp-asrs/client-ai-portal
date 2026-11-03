import { Website } from "@/types/website";

interface Props {
  website: Website;
}

export default function WebsiteCard({
  website,
}: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold text-lg">
        {website.name}
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        {website.domain}
      </p>
    </div>
  );
}