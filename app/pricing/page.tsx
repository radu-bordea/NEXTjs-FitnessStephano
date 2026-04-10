import { PricingTable } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 text-white">
      <h1 className="text-3xl font-bold text-center mb-10">
        Choose Your Plan
      </h1>

      <PricingTable
        afterCheckoutUrl="/plan"
        afterSignInUrl="/plan"
        afterSignUpUrl="/plan"
      />

      <p className="text-center text-white/50 mt-6 text-sm">
        Cancel anytime. No hidden fees.
      </p>
    </div>
  );
}