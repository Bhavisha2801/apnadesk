import FormsList from "@/src/components/forms/FormsList";

export default function FormsPage() {
  return (
    <main className="ml-64 min-h-screen bg-slate-50 px-6 py-6 md:px-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <FormsList />
      </div>
    </main>
  );
}
