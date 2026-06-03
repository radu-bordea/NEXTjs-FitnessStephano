"use client";

import { Video } from "@/types";

const VideoCard = ({
  video,
  premium = false,
}: {
  video: Video;
  premium?: boolean;
}) => {
  return (
    <div
      className={`rounded-xl border transition-colors overflow-hidden ${
        premium
          ? "border-yellow-500/20 hover:border-yellow-500/50"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      <div
        style={{
          width: "100%",
          height: "200px",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <video
          src={video.url}
          controls
          preload="none"
          playsInline
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="p-3 bg-black/40">
        <p className="text-white font-semibold text-sm mb-1">{video.title}</p>
        {video.description && (
          <p className="text-white/50 text-xs">{video.description}</p>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
