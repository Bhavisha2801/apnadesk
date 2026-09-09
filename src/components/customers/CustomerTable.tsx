"use client";


import type {
  Customer,
} from "@/src/types/customer";
import { Badge, Table, TableColumn } from "../ui";

interface CustomerTableProps {
  customers: Customer[];

  onCustomerClick: (
    customerId: string
  ) => void;
}

export default function CustomerTable({
  customers,
  onCustomerClick,
}: CustomerTableProps) {

  const columns: TableColumn<Customer>[] =
    [
      {
        key: "name",
        header: "Customer",
        render: (customer) => (
          <button
            type="button"
            onClick={() =>
              onCustomerClick(
                customer.id
              )
            }
            className="text-left font-medium text-gray-900 hover:text-blue-600"
          >
            {customer.firstName}{" "}
            {customer.lastName}
          </button>
        ),
      },

      {
        key: "email",
        header: "Email",
        render: (customer) => (
          <span>
            {customer.email}
          </span>
        ),
      },

      {
        key: "phone",
        header: "Phone",
        render: (customer) => (
          <span>
            {customer.phone}
          </span>
        ),
      },

      {
        key: "status",
        header: "Status",
        render: (customer) => (
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
        ),
      },

      {
        key: "createdDate",
        header: "Created",
        render: (customer) => (
          <span>
            {formatDate(
              customer.createdAt
            )}
          </span>
        ),
      },
    ];

  return (
    <Table
      data={customers}
      columns={columns}
      rowKey={(customer) =>
        customer.id
      }
      emptyMessage="No customers found."
    />
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