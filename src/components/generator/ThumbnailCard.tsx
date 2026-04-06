"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowDownTray, HiCheck } from "react-icons/hi2";
import type { ThumbnailResult } from "@/types";
import toast from "react-hot-toast";

interface ThumbnailCardProps {
  thumbnails: ThumbnailResult[];
}

export default function ThumbnailCard({ thumbnails }: ThumbnailCardProps) {
  const [downloadedIndex, setDownloadedIndex] = useState<number | null>(null);

  const handleDownload = (thumbnail: ThumbnailResult, index: number) => {
    try {
      const link = document.createElement("a");
      link.href = thumbnail.imageData;
      link.download = `thumbnail-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadedIndex(index);
      toast.success("Thumbnail downloaded!");
      setTimeout(() => setDownloadedIndex(null), 2000);
    } catch {
      toast.error("Failed to download thumbnail.");
    }
  };

  if (thumbnails.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-200 dark:border-dark-700 overflow-hidden shadow-sm"
      >
        <div className="px-6 py-4 bg-indigo-100 text-indigo-800 border-b border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-700/50">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span>🖼️</span>
            AI Thumbnails
            <span className="text-sm font-normal opacity-70 ml-auto">
              0 results
            </span>
          </h3>
        </div>
        <div className="p-8 text-center text-dark-500 dark:text-dark-400 text-sm">
          <p>
            Thumbnail generation was unable to complete. Try again or adjust
            your topic.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-200 dark:border-dark-700 overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-black/40 transition-shadow"
    >
      {/* Card header */}
      <div className="px-6 py-4 bg-indigo-100 text-indigo-800 border-b border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-700/50">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <span>🖼️</span>
          AI Thumbnails
          <span className="text-sm font-normal opacity-70 ml-auto">
            {thumbnails.length}{" "}
            {thumbnails.length === 1 ? "thumbnail" : "thumbnails"}
          </span>
        </h3>
      </div>

      {/* Thumbnails grid */}
      <div
        className={`p-4 ${thumbnails.length > 1 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "flex justify-center"}`}
      >
        {thumbnails.map((thumbnail, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative rounded-xl overflow-hidden border border-dark-200 dark:border-dark-700 bg-dark-50 dark:bg-dark-700/60"
          >
            {/* Thumbnail image */}
            <div className="relative aspect-video w-full max-w-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnail.imageData}
                alt={thumbnail.description || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                <button
                  onClick={() => handleDownload(thumbnail, index)}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-200 rounded-lg font-medium text-dark-800 shadow-lg hover:bg-dark-50 dark:hover:bg-dark-100 text-sm"
                >
                  {downloadedIndex === index ? (
                    <>
                      <HiCheck className="w-4 h-4 text-green-500" />
                      Downloaded
                    </>
                  ) : (
                    <>
                      <HiArrowDownTray className="w-4 h-4" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Description */}
            {thumbnail.description && (
              <div className="p-3">
                <p className="text-xs text-dark-500 dark:text-dark-400 line-clamp-2">
                  {thumbnail.description}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-6 py-3 border-t border-dark-100 dark:border-dark-700 bg-dark-50/50 dark:bg-dark-700/30">
        <p className="text-xs text-dark-400 dark:text-dark-500 text-center">
          AI-generated thumbnails. Right-click or tap &quot;Download&quot; to
          save. Edit further in your favorite design tool.
        </p>
      </div>
    </motion.div>
  );
}
