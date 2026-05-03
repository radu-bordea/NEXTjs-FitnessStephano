import { PricingTable } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 text-white">
      <h1 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h1>

      <div className="max-w-3xl mx-auto">
        <PricingTable />
      </div>

      <p className="text-center text-white/80  mt-6 text-xl">
        👉 To cancel or manage your subscription: go to your profile avatar → Manage account → Billing → Manage
      </p>
    </div>
  );
}
