"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 12l9-9 9 9M5 10v10h14V10"
        />
      </svg>
    ),
  },
  {
    label: "Customers",
    href: "/customers",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
        />
        <circle cx="9" cy="7" r="4" strokeWidth={1.8} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
        />
      </svg>
    ),
  },
  {
    label: "Forms",
    href: "/forms",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect
          x="4"
          y="3"
          width="16"
          height="18"
          rx="2"
          strokeWidth={1.8}
        />
        <path
          strokeLinecap="round"
          strokeWidth={1.8}
          d="M8 8h8M8 12h8M8 16h5"
        />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-gray-100 px-5">
        <Link
          href="/"
          className="flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
        >
          <Image
            src="/apnadesk-logo.png"
            alt="ApnaDesk"
            width={150}
            height={60}
            priority
            className="h-auto w-[145px] object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Main Menu
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-teal-600" />
                )}

                {/* Icon */}
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
                    isActive
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-gray-500 group-hover:bg-white group-hover:text-gray-700"
                  }`}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span>{item.label}</span>

                {/* Arrow */}
                {isActive && (
                  <svg
                    className="ml-auto h-4 w-4 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-100 p-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
              <span className="text-sm font-bold text-teal-600">
                AD
              </span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                ApnaDesk
              </p>

              <p className="truncate text-xs text-gray-400">
                Customer Workspace
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
