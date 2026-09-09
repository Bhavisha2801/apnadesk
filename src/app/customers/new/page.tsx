import CustomerForm from "@/src/components/customers/CustomerForm";

export default function NewCustomerPage() {
  return (
    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Add Customer
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create a new customer.
        </p>
      </div>

      <CustomerForm />

    </div>
  );
}