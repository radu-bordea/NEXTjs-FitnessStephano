"use client";

import { uploadVideo } from "@/app/actions/uploadVideo";
import { useTransition, useState, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ← fix this import

export default function AdminVideosPage() {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast.error("File too large — max 100MB");
        e.target.value = "";
        return;
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Upload Video</h1>
      <Link
        href="/admin/videos"
        className="text-sm text-white/50 hover:text-yellow-500 transition-colors mb-6 inline-block"
      >
        ← Back to videos
      </Link>

      <form
        ref={formRef}
        action={(formData) =>
          startTransition(async () => {
            try {
              await uploadVideo(formData);
              toast.success("Video uploaded successfully!");
              formRef.current?.reset();
              setPreview(null);
              router.push("/admin/videos");
              router.refresh();
            } catch (err) {
              toast.error((err as Error).message);
            }
          })
        }
        className="space-y-6"
      >
        <div>
          <label className="block text-white/70 text-sm mb-2">Title</label>
          <input
            name="title"
            required
            placeholder="e.g. Squat Form Guide"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2">Description</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Brief description of the video"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-yellow-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2">Video file</label>
          <input
            name="video"
            type="file"
            accept="video/*"
            required
            onChange={handleFileChange}
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
          />
          <p className="text-white/40 text-xs mt-1">
            Max 100MB. Keep videos under 60 seconds for best performance.
          </p>
        </div>

        {preview && (
          <div className="relative">
            <video
              src={preview}
              controls
              muted
              preload="metadata"
              className="w-full max-h-48 rounded-xl border border-white/10"
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white/70 rounded text-xs hover:text-white"
            >
              Remove
            </button>
          </div>
        )}

        {isPending && (
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-yellow-500 h-1.5 rounded-full animate-pulse w-full" />
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="relative w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">
            {isPending ? "Uploading... please wait" : "Upload Video"}
          </span>
        </button>
        {!isPending && preview && (
          <p className="text-white/40 text-xs mt-1">Preview — not uploaded yet</p>
        )}
      </form>
    </div>
  );
}