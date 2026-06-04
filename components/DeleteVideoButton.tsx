"use client";

import { deleteVideo } from "@/app/actions/uploadVideo";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteVideoButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    startTransition(async () => {
      try {
        await deleteVideo(id);
        toast.success("Video deleted!");
      } catch (err) {
        toast.error((err as Error).message);
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold hover:bg-red-500/40 transition disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}