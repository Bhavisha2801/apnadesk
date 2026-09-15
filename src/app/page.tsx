import Link from "next/link";

const stats = [
  {
    label: "Total Customers",
    value: "128",
    description: "All customer records",
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
    label: "Active Customers",
    value: "112",
    description: "Currently active",
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
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
  {
    label: "Forms",
    value: "12",
    description: "Created forms",
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
  {
    label: "Recent Activity",
    value: "24",
    description: "Activities this month",
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
          d="M12 8v4l3 2"
        />
        <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
      </svg>
    ),
  },
];

const quickActions = [
  {
    title: "Add Customer",
    description: "Create a new customer profile",
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
          d="M12 5v14M5 12h14"
        />
      </svg>
    ),
  },
  {
    title: "Create Form",
    description: "Build a custom customer form",
    href: "/forms",
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
          d="M12 4v16M4 12h16"
        />
      </svg>
    ),
  },
  {
    title: "View Customers",
    description: "Manage your customer records",
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
          d="M15 12H3m0 0l4-4m-4 4l4 4"
        />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <main className="ml-64 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1400px] px-8 py-8">
        {/* =========================================
            HEADER
        ========================================== */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-teal-600">
            DASHBOARD
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your customers, forms and business information
            from one simple workspace.
          </p>
        </div>

        {/* =========================================
            HERO
        ========================================== */}
        <section className="relative mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative z-10 max-w-2xl px-8 py-8">
            <div className="mb-4 inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              Your workspace is ready
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Everything you need to manage customers.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Keep customer information organized, create custom
              forms and manage your customer workflow from one
              centralized workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/customers"
                className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                View Customers
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-6-6l6 6-6 6"
                  />
                </svg>
              </Link>

              <Link
                href="/forms"
                className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Explore Forms
              </Link>
            </div>
          </div>

          {/* Decorative area */}
          <div className="absolute right-0 top-0 h-full w-[38%] overflow-hidden">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-teal-50" />

            <div className="absolute -bottom-32 right-16 h-72 w-72 rounded-full bg-cyan-50" />

            <div className="absolute right-16 top-1/2 flex h-32 w-32 -translate-y-1/2 items-center justify-center rounded-3xl border border-teal-100 bg-white/80 shadow-sm backdrop-blur">
              <div className="text-center">
                <div className="text-3xl text-teal-600">✦</div>

                <p className="mt-2 text-xs font-semibold text-teal-700">
                  ApnaDesk
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            STATS
        ========================================== */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  {stat.icon}
                </div>

                <span className="text-xs font-medium text-gray-400">
                  Overview
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-gray-500">
                {stat.label}
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        {/* =========================================
            QUICK ACTIONS
        ========================================== */}
        <section className="mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Access your most common tasks quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600 transition group-hover:bg-teal-100">
                    {action.icon}
                  </div>

                  <svg
                    className="h-5 w-5 text-gray-300 transition group-hover:translate-x-1 group-hover:text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14m-6-6l6 6-6 6"
                    />
                  </svg>
                </div>

                <h3 className="mt-5 text-sm font-semibold text-gray-900">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================
            GETTING STARTED
        ========================================== */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-sm text-teal-600">
                  ✓
                </span>

                <p className="text-sm font-semibold text-gray-900">
                  Getting Started
                </p>
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                Build your customer workspace
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Add customers, create forms and keep all your
                customer information organized in one place.
              </p>
            </div>

            <Link
              href="/customers"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Get Started
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14m-6-6l6 6-6 6"
                />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
