import { UserProfile } from "@clerk/nextjs";

export default function UserPage() {
  return (
    <div className="max-w-4xl mx-auto py-20">
      <UserProfile />
    </div>
  );
}