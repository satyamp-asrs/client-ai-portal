"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Assistant",
    href: "/assistant",
  },
  {
    name: "Content",
    href: "/content",
  },
 
  {
  name: "Knowledge",
  href: "/knowledge",
},
 {
    name: "Settings",
    href: "/settings",
  },

];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white">
      <div className="h-16 flex items-center px-6 border-b">
        <h2 className="text-xl font-bold">
          AI Portal
        </h2>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}