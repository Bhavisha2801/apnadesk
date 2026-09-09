"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  Button,
  EmptyState,
  ErrorState,
  Input,
  LoadingState,
  Pagination,
  Select,
  SelectOption,
} from "../ui";

import {
  useAppDispatch,
  useAppSelector,
} from "@/src/store/hooks";

import {
  fetchCustomers,
} from "@/src/features/customers/customerThunks";

import CustomerTable from "./CustomerTable";

type CustomerStatusFilter =
  | "all"
  | "active"
  | "inactive";

const STATUS_OPTIONS: SelectOption[] = [
  {
    label: "All Status",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

const ITEMS_PER_PAGE = 10;

export default function CustomerPageClient() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    items: customers,
    loading,
    error,
  } = useAppSelector(
    (state) => state.customers
  );

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<CustomerStatusFilter>("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  /*
   * Fetch customers
   */
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  /*
   * Reset pagination when
   * search or status changes
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  /*
   * Search + Status filtering
   */
  const filteredCustomers = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return customers.filter((customer) => {
      const fullName =
        `${customer.firstName} ${customer.lastName}`
          .toLowerCase();

      const matchesSearch =
        !searchValue ||
        fullName.includes(searchValue) ||
        customer.email
          .toLowerCase()
          .includes(searchValue) ||
        customer.phone
          .toLowerCase()
          .includes(searchValue);

      /*
       * "all" means both active
       * and inactive customers.
       */
      const matchesStatus =
        status === "all" ||
        customer.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    customers,
    search,
    status,
  ]);

  /*
   * Calculate total pages
   */
  const totalPages = Math.ceil(
    filteredCustomers?.length /
      ITEMS_PER_PAGE
  );

  /*
   * Get customers for current page
   */
  const paginatedCustomers = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      ITEMS_PER_PAGE;

    const endIndex =
      startIndex + ITEMS_PER_PAGE;

    return filteredCustomers.slice(
      startIndex,
      endIndex
    );
  }, [
    filteredCustomers,
    currentPage,
  ]);

  /*
   * Retry fetching customers
   */
  const handleRetry = () => {
    dispatch(fetchCustomers());
  };

  /*
   * Add customer
   */
  const handleAddCustomer = () => {
    router.push(
      "/customers/new"
    );
  };

  /*
   * Customer detail
   */
  const handleCustomerClick = (
    customerId: string
  ) => {
    router.push(
      `/customers/${customerId}`
    );
  };

  return (
    <div className="space-y-6 p-6">

      {/* Page Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Customers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your customers and
            their information.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleAddCustomer}
        >
          + Add Customer
        </Button>

      </div>

      {/* Filters */}

      <div className="rounded-xl border border-gray-200 bg-white p-4">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">

          {/* Search */}

          <Input
            label="Search"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

          {/* Status */}

          <Select
            label="Status"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as CustomerStatusFilter
              )
            }
            options={STATUS_OPTIONS}
          />

        </div>

      </div>

      {/* Loading */}

      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white">
          <LoadingState
            message="Loading customers..."
          />
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <ErrorState
          title="Unable to load customers"
          message={error}
          action={
            <Button
              variant="outline"
              onClick={handleRetry}
            >
              Try Again
            </Button>
          }
        />
      )}

      {/* Empty */}

      {!loading &&
        !error &&
        filteredCustomers.length === 0 && (
          <EmptyState
            title={
              customers.length === 0
                ? "No customers yet"
                : "No customers found"
            }
            description={
              customers.length === 0
                ? "Create your first customer to get started."
                : "Try changing your search or status filter."
            }
            action={
              customers.length === 0 ? (
                <Button
                  onClick={
                    handleAddCustomer
                  }
                >
                  Add Customer
                </Button>
              ) : undefined
            }
          />
        )}

      {/* Customer Table + Pagination */}

      {!loading &&
        !error &&
        filteredCustomers.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

            <CustomerTable
              customers={
                paginatedCustomers
              }
              onCustomerClick={
                handleCustomerClick
              }
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={
                setCurrentPage
              }
            />

          </div>
        )}

    </div>
  );
}