"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";


import {
  customerService,
} from "@/src/services/customerService";

import {
  useAppDispatch,
} from "@/src/store/hooks";


import type {
  CreateCustomerInput,
} from "@/src/types/customer";
import { Button, Input, Select, SelectOption } from "../ui";
import { addCustomer } from "@/src/features/customers/customerSlice";
import Textarea from "../ui/Textarea";

const STATUS_OPTIONS: SelectOption[] =
  [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
  ];

const INITIAL_FORM: CreateCustomerInput =
  {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "active",
    dateOfBirth: "",
    address: "",
  };

export default function CustomerForm() {
  const router = useRouter();

  const dispatch =
    useAppDispatch();

  const [form, setForm] =
    useState<CreateCustomerInput>(
      INITIAL_FORM
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(
      null
    );

  const handleChange = (
    field: keyof CreateCustomerInput,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const customer =
        await customerService.createCustomer(
          form
        );

      dispatch(
        addCustomer(customer)
      );

      router.push(
        `/customers/${customer.id}`
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create customer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Personal Information */}
      <div className="rounded-xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 px-6 py-4">

          <h2 className="font-semibold text-gray-900">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the customer's basic
            information.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

          <Input
            label="First Name"
            required
            value={form.firstName}
            onChange={(event) =>
              handleChange(
                "firstName",
                event.target.value
              )
            }
          />

          <Input
            label="Last Name"
            required
            value={form.lastName}
            onChange={(event) =>
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
            value={form.email}
            onChange={(event) =>
              handleChange(
                "email",
                event.target.value
              )
            }
          />

          <Input
            label="Phone"
            type="tel"
            required
            value={form.phone}
            onChange={(event) =>
              handleChange(
                "phone",
                event.target.value
              )
            }
          />

          <Input
            label="Date of Birth"
            type="date"
            value={form.dateOfBirth}
            onChange={(event) =>
              handleChange(
                "dateOfBirth",
                event.target.value
              )
            }
          />

          <Select
            label="Status"
            required
            value={form.status}
            onChange={(event) =>
              handleChange(
                "status",
                event.target.value
              )
            }
            options={
              STATUS_OPTIONS
            }
            placeholder="Select status"
          />

          <Textarea
            id="address"
            label="Address"
            placeholder="Enter customer address"
            rows={4}
            value={form.address}
            onChange={(event) =>
                handleChange("address", event.target.value)
            }
            />

        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() =>
            router.push(
              "/customers"
            )
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
        >
          Create Customer
        </Button>

      </div>

    </form>
  );
}