"use client";

import {
  useCallback,
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

  const [pageSize, setPageSize] =
    useState(10);

  /*
   * Fetch customers
   *
   * Runs only when the component mounts.
   */
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  /*
   * Filter customers
   *
   * useMemo prevents filtering all customers
   * on every component render.
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
  const totalPages = useMemo(() => {
    return Math.ceil(
      filteredCustomers.length /
        pageSize
    );
  }, [
    filteredCustomers.length,
    pageSize,
  ]);

  /*
   * Get customers for current page
   */
  const paginatedCustomers = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      pageSize;

    return filteredCustomers.slice(
      startIndex,
      startIndex + pageSize
    );
  }, [
    filteredCustomers,
    currentPage,
    pageSize,
  ]);

  /*
   * Search handler
   */
  const handleSearchChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setSearch(event.target.value);
      setCurrentPage(1);
    },
    []
  );

  /*
   * Status handler
   */
  const handleStatusChange = useCallback(
    (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setStatus(
        event.target
          .value as CustomerStatusFilter
      );

      setCurrentPage(1);
    },
    []
  );

  /*
   * Page change handler
   */
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    []
  );

  /*
   * Page size handler
   */
  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize);
      setCurrentPage(1);
    },
    []
  );

  /*
   * Retry fetching customers
   */
  const handleRetry = useCallback(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  /*
   * Add customer
   */
  const handleAddCustomer = useCallback(() => {
    router.push("/customers/new");
  }, [router]);

  /*
   * Customer detail
   */
  const handleCustomerClick = useCallback(
    (customerId: string) => {
      router.push(
        `/customers/${customerId}`
      );
    },
    [router]
  );

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
            onChange={handleSearchChange}
          />

          {/* Status */}

          <Select
            label="Status"
            value={status}
            onChange={handleStatusChange}
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
                  onClick={handleAddCustomer}
                >
                  Add Customer
                </Button>
              ) : undefined
            }
          />
        )}

      {/* Customer Table */}

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

            {/* Pagination */}

            {totalPages > 1 && (
              <Pagination
                currentPage={
                  currentPage
                }
                totalPages={
                  totalPages
                }
                pageSize={
                  pageSize
                }
                onPageChange={
                  handlePageChange
                }
                onPageSizeChange={
                  handlePageSizeChange
                }
              />
            )}

          </div>
        )}

    </div>
  );
}
