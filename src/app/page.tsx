import Link from "next/link";

const stats = [
  {
    label: "Total Customers",
    value: "128",
    description: "All customers",
  },
  {
    label: "Active Customers",
    value: "112",
    description: "Currently active",
  },
  {
    label: "Forms",
    value: "12",
    description: "Created forms",
  },
  {
    label: "Recent Activity",
    value: "24",
    description: "This month",
  },
];

const quickActions = [
  {
    title: "Add Customer",
    description: "Create a new customer profile",
    href: "/customers",
    icon: "+",
  },
  {
    title: "Create Form",
    description: "Build a custom customer form",
    href: "/forms",
    icon: "✦",
  },
  {
    title: "View Customers",
    description: "Manage your customer records",
    href: "/customers",
    icon: "→",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-2 text-sm font-medium text-teal-600">
              APNADESK DASHBOARD
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back 👋
            </h1>

            <p className="mt-3 text-base leading-7 text-gray-500">
              Manage your customers, forms and business information
              from one simple workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/customers"
                className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                View Customers
              </Link>

              <Link
                href="/forms"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Explore Forms
              </Link>
            </div>
          </div>

          {/* Decorative background */}
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-teal-50" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-cyan-50" />

          <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-teal-100 bg-teal-50">
              <div className="text-center">
                <div className="text-4xl">✦</div>
                <p className="mt-1 text-xs font-semibold text-teal-700">
                  ApnaDesk
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-medium text-gray-500">
                {stat.label}
              </p>

              <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>

              <p className="mt-1 text-xs text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Get things done faster.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-xl font-semibold text-teal-600 transition group-hover:bg-teal-100">
                    {action.icon}
                  </div>

                  <span className="text-gray-300 transition group-hover:text-teal-500">
                    →
                  </span>
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-teal-600">
                GETTING STARTED
              </p>

              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                Organize your customer workspace
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Start by adding customers and creating forms to
                collect and manage information efficiently.
              </p>
            </div>

            <Link
              href="/customers"
              className="whitespace-nowrap rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Get Started →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
