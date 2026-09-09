import CustomerEditForm from "@/src/components/customers/CustomerEditForm";

interface EditCustomerPageProps {
  params: Promise<{
    customerId: string;
  }>;
}

export default async function EditCustomerPage({
  params,
}: EditCustomerPageProps) {
  const { customerId } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <CustomerEditForm customerId={customerId} />
    </div>
  );
}