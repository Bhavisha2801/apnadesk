"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";



import {
  customerService,
} from "@/src/services/customerService";

import type {
  Customer,
} from "@/src/types/customer";
import { Badge, Button, ErrorState, LoadingState, TabItem, Tabs } from "@/src/components/ui";

interface CustomerDetailProps {
  customerId: string;
}

export default function CustomerDetail({
  customerId,
}: CustomerDetailProps) {
  const router = useRouter();

  const [customer, setCustomer] =
    useState<Customer | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(
      null
    );

  useEffect(() => {
    const loadCustomer =
      async () => {
        try {
          setLoading(true);
          setError(null);

          const data =
            await customerService.getCustomer(
              customerId
            );

          setCustomer(data);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load customer."
          );
        } finally {
          setLoading(false);
        }
      };

    loadCustomer();
  }, [customerId]);

  if (loading) {
    return (
      <div className="p-6">
        <LoadingState
          message="Loading customer..."
          fullPage
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorState
          title="Unable to load customer"
          message={error}
          action={
            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  "/customers"
                )
              }
            >
              Back to Customers
            </Button>
          }
        />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6">
        <ErrorState
          title="Customer not found"
          message="The customer you are looking for does not exist."
          action={
            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  "/customers"
                )
              }
            >
              Back to Customers
            </Button>
          }
        />
      </div>
    );
  }

  const tabs: TabItem[] = [
    {
      id: "profile",
      label: "Profile",
      content: (
        <ProfileTab
          customer={customer}
        />
      ),
    },

    {
      id: "notes",
      label: "Notes",
      content: (
        <PlaceholderTab
          title="Notes"
          description="Customer notes will appear here."
        />
      ),
    },

    {
      id: "forms",
      label: "Forms",
      content: (
        <PlaceholderTab
          title="Forms"
          description="Submitted forms will appear here."
        />
      ),
    },

    {
      id: "files",
      label: "Files",
      content: (
        <PlaceholderTab
          title="Files"
          description="Customer files will appear here."
        />
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">

      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          router.push(
            "/customers"
          )
        }
      >
        ← Back to Customers
      </Button>

      {/* Customer Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-2xl font-semibold text-gray-900">
              {customer.firstName}{" "}
              {customer.lastName}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {customer.email}
            </p>

          </div>

          <Badge
            variant={
              customer.status ===
              "active"
                ? "success"
                : "neutral"
            }
            size="md"
          >
            {customer.status}
          </Badge>

        </div>

      </div>

      {/* Tabs */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">

        <Tabs
          tabs={tabs}
          defaultTab="profile"
        />

      </div>

    </div>
  );
}

interface ProfileTabProps {
  customer: Customer;
}

function ProfileTab({
  customer,
}: ProfileTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

      <InfoItem
        label="First Name"
        value={customer.firstName}
      />

      <InfoItem
        label="Last Name"
        value={customer.lastName}
      />

      <InfoItem
        label="Email"
        value={customer.email}
      />

      <InfoItem
        label="Phone"
        value={customer.phone}
      />

      <InfoItem
        label="Date of Birth"
        value={customer.dateOfBirth}
      />

      <InfoItem
        label="Status"
        value={customer.status}
      />

      <InfoItem
        label="Address"
        value={customer.address}
      />

      <InfoItem
        label="Created Date"
        value={
          formatDate(
            customer.createdAt
          )
        }
      />

    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}

interface PlaceholderTabProps {
  title: string;
  description: string;
}

function PlaceholderTab({
  title,
  description,
}: PlaceholderTabProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">

      <h3 className="text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

    </div>
  );
}

function formatDate(
  date: string
): string {
  if (!date) {
    return "-";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return date;
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}