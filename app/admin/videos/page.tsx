import prisma from "@/lib/prisma";
import DeleteVideoButton from "@/components/DeleteVideoButton";
import Link from "next/link";

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Videos</h1>
        <Link
          href="/admin/videos/upload"
          className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition text-sm"
        >
          Upload Video
        </Link>
      </div>

      {videos.length === 0 ? (
        <p className="text-white/50">No videos uploaded yet.</p>
      ) : (
        <div className="grid gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <video
                src={video.url}
                preload="metadata"
                className="w-32 h-20 rounded-lg bg-black shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">{video.title}</p>
                {video.description && (
                  <p className="text-white/50 text-sm truncate">{video.description}</p>
                )}
                <p className="text-white/30 text-xs mt-1">
                  {new Date(video.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <DeleteVideoButton id={video.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}