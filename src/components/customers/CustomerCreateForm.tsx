"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  Button,
  Input,
  Select,
} from "../ui";

import { customerService } from "@/src/services/customerService";

import {
  useAppDispatch,
} from "@/src/store/hooks";

import type {
  CreateCustomerInput,
} from "@/src/types/customer";

import {
  addCustomer,
} from "@/src/features/customers/customerSlice";

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

export default function CustomerCreateForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [formData, setFormData] =
    useState<CreateCustomerInput>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      status: "active",
      dateOfBirth: "",
      address: "",
    });

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  /*
   * Handle input changes
   */
  const handleChange = (
    field: keyof CreateCustomerInput,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * Create customer
   */
  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setError(null);

    /*
     * Basic validation
     */
    if (!formData.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone is required.");
      return;
    }

    try {
      setSaving(true);

      const customer =
        await customerService.createCustomer(
          formData
        );

      /*
       * Update Redux customer list
       */
      dispatch(
        addCustomer(customer)
      );

      /*
       * Go to newly created customer
       */
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
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Error */}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Customer Fields */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* First Name */}

        <Input
          label="First Name"
          required
          value={formData.firstName}
          onChange={(event) =>
            handleChange(
              "firstName",
              event.target.value
            )
          }
        />

        {/* Last Name */}

        <Input
          label="Last Name"
          required
          value={formData.lastName}
          onChange={(event) =>
            handleChange(
              "lastName",
              event.target.value
            )
          }
        />

        {/* Email */}

        <Input
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={(event) =>
            handleChange(
              "email",
              event.target.value
            )
          }
        />

        {/* Phone */}

        <Input
          label="Phone"
          required
          value={formData.phone}
          onChange={(event) =>
            handleChange(
              "phone",
              event.target.value
            )
          }
        />

        {/* Date of Birth */}

        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(event) =>
            handleChange(
              "dateOfBirth",
              event.target.value
            )
          }
        />

        {/* Status */}

        <Select
          label="Status"
          value={formData.status}
          onChange={(event) =>
            handleChange(
              "status",
              event.target.value
            )
          }
          options={STATUS_OPTIONS}
        />

      </div>

      {/* Address */}

      <Input
        label="Address"
        value={formData.address}
        onChange={(event) =>
          handleChange(
            "address",
            event.target.value
          )
        }
      />

      {/* Buttons */}

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="secondary"
          disabled={saving}
          onClick={() =>
            router.push("/customers")
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={saving}
        >
          Create Customer
        </Button>

      </div>

    </form>
  );
}