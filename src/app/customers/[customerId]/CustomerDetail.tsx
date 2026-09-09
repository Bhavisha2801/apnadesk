"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  Button,
  Badge,
  LoadingState,
  ErrorState,
  EmptyState,
  Tabs,
  ConfirmationDialog,
} from "../../../components/ui";

import { customerService } from "@/src/services/customerService";

import {
  removeCustomer,
} from "../../../features/customers/customerSlice";

import {
  useAppDispatch,
} from "@/src/store/hooks";

import type {
  Customer,
} from "@/src/types/customer";

interface CustomerDetailProps {
  customerId: string;
}

export default function CustomerDetail({
  customerId,
}: CustomerDetailProps) {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    const loadCustomer = async () => {
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

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await customerService.deleteCustomer(
        customerId
      );

      dispatch(
        removeCustomer(customerId)
      );

      setDeleteDialogOpen(false);

      router.push("/customers");
      router.refresh();

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete customer."
      );

    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <LoadingState message="Loading customer..." />
    );
  }

  if (error && !customer) {
    return (
      <ErrorState
        message={error}
        action={
          <Button
            onClick={() =>
              window.location.reload()
            }
          >
            Retry
          </Button>
        }
      />
    );
  }

  if (!customer) {
    return (
      <EmptyState
        title="Customer not found"
        description="The customer you're looking for does not exist."
        action={
          <Button
            onClick={() =>
              router.push("/customers")
            }
          >
            Back to Customers
          </Button>
        }
      />
    );
  }

  const tabs = [
    {
      id: "profile",
      label: "Profile",

      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">
              First Name
            </p>

            <p className="font-medium mt-1">
              {customer.firstName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Last Name
            </p>

            <p className="font-medium mt-1">
              {customer.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-medium mt-1">
              {customer.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-medium mt-1">
              {customer.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Date of Birth
            </p>

            <p className="font-medium mt-1">
              {customer.dateOfBirth
                ? new Date(
                    customer.dateOfBirth
                  ).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <div className="mt-1">
              <Badge
                variant={
                  customer.status ===
                  "active"
                    ? "success"
                    : "neutral"
                }
              >
                {customer.status}
              </Badge>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">
              Address
            </p>

            <p className="font-medium mt-1">
              {customer.address || "-"}
            </p>
          </div>

        </div>
      ),
    },

    {
      id: "notes",
      label: "Notes",

      content: (
        <div className="py-8">
          <p className="text-gray-500">
            Notes module will be implemented next.
          </p>
        </div>
      ),
    },

    {
      id: "forms",
      label: "Forms",

      content: (
        <div className="py-8">
          <p className="text-gray-500">
            Forms module will be implemented next.
          </p>
        </div>
      ),
    },

    {
      id: "files",
      label: "Files",

      content: (
        <div className="py-8">
          <p className="text-gray-500">
            Files module will be implemented next.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <div className="flex items-center gap-3">

            <h1 className="text-2xl font-semibold">
              {customer.firstName}{" "}
              {customer.lastName}
            </h1>

            <Badge
              variant={
                customer.status ===
                "active"
                  ? "success"
                  : "neutral"
              }
            >
              {customer.status}
            </Badge>

          </div>

          <p className="text-sm text-gray-500 mt-1">
            {customer.email}
          </p>

        </div>

        <div className="flex gap-3">

          <Button
            variant="outline"
            onClick={() =>
              router.push(
                `/customers/${customerId}/edit`
              )
            }
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              setDeleteDialogOpen(true)
            }
          >
            Delete
          </Button>

        </div>

      </div>

      {/* Tabs */}

      <Tabs
        tabs={tabs}
        defaultTab="profile"
      />

      {/* Delete confirmation */}

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete customer?"
        message={`Are you sure you want to delete ${customer.firstName} ${customer.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() =>
          setDeleteDialogOpen(false)
        }
      />

    </div>
  );
}