"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  Button,
  Input,
  Select,
  LoadingState,
} from "../ui";

import { customerService } from "@/src/services/customerService";

import {
  useAppDispatch,
} from "@/src/store/hooks";

import type {
  CreateCustomerInput,
} from "@/src/types/customer";
import { updateCustomer } from "@/src/features/customers/customerSlice";

interface CustomerEditFormProps {
  customerId: string;
}

const STATUS_OPTIONS = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

export default function CustomerEditForm({
  customerId,
}: CustomerEditFormProps) {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] =
    useState<CreateCustomerInput | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        setLoading(true);
        setError(null);

        const customer =
          await customerService.getCustomer(
            customerId
          );

        setFormData({
          firstName:
            customer.firstName,

          lastName:
            customer.lastName,

          email:
            customer.email,

          phone:
            customer.phone,

          status:
            customer.status,

          dateOfBirth:
            customer.dateOfBirth,

          address:
            customer.address,
        });

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

  const handleChange = (
    field: keyof CreateCustomerInput,
    value: string
  ) => {
    setFormData(previous =>
      previous
        ? {
            ...previous,
            [field]: value,
          }
        : previous
    );
  };

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (!formData) {
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const customer =
        await customerService.updateCustomer(
          customerId,
          formData
        );

      dispatch(
        updateCustomer(customer)
      );

      router.push(
        `/customers/${customerId}`
      );

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update customer."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <LoadingState message="Loading customer..." />
    );
  }

  if (!formData) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">
          {error ||
            "Customer could not be found."}
        </p>

        <div className="mt-4">
          <Button
            onClick={() =>
              router.push("/customers")
            }
          >
            Back to Customers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>
        <h1 className="text-2xl font-semibold">
          Edit Customer
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Update customer information.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          label="First Name"
          required
          value={formData.firstName}
          onChange={event =>
            handleChange(
              "firstName",
              event.target.value
            )
          }
        />

        <Input
          label="Last Name"
          required
          value={formData.lastName}
          onChange={event =>
            handleChange(
              "lastName",
              event.target.value
            )
          }
        />

        <Input
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={event =>
            handleChange(
              "email",
              event.target.value
            )
          }
        />

        <Input
          label="Phone"
          required
          value={formData.phone}
          onChange={event =>
            handleChange(
              "phone",
              event.target.value
            )
          }
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={event =>
            handleChange(
              "dateOfBirth",
              event.target.value
            )
          }
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={event =>
            handleChange(
              "status",
              event.target.value
            )
          }
          options={STATUS_OPTIONS}
        />

      </div>

      <Input
        label="Address"
        value={formData.address}
        onChange={event =>
          handleChange(
            "address",
            event.target.value
          )
        }
      />

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            router.push(
              `/customers/${customerId}`
            )
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={saving}
        >
          Save Changes
        </Button>

      </div>

    </form>
  );
}