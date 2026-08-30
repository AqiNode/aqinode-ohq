/**
 * VideoBackground — Decorative background layer for hero sections.
 *
 * This is NOT a hero. It renders behind hero content as an absolute-positioned
 * layer with a dark fallback and a scrim overlay (defined in globals.css).
 *
 * Performance strategy:
 * - Optimized source: 426KB @ 720p / 686 kbps (H.264 CRF 28, faststart, audio stripped)
 *   vs 3.4MB original at 5.3 Mbps — ~87% savings
 * - First-frame poster: 41KB JPG / 7KB WebP shown while video loads
 * - `preload="metadata"` + poster prevents eager download until play
 * - IntersectionObserver pauses video when hero is off-screen (saves CPU/battery)
 * - Respects `prefers-reduced-motion` and `navigator.connection.saveData` — falls back to
 *   static poster image with no video download
 * - Playback slightly slowed (0.75x) for smooth, cinematic hero feel
 */

"use client";

import { useEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type VideoBackgroundProps = {
  /** Video source — defaults to optimized 720p MP4 */
  src?: string;

  /** Poster image — first frame, used for fallback and while loading */
  poster?: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function VideoBackground({
  src = "/vid/hero-720.mp4",
  poster = "/vid/hero-poster.jpg",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only autoplay after we confirm reduced-motion and saveData allow it.
  // Server and initial client both render the static poster, then effect upgrades
  // to video — avoids hydration mismatch.
  const [canAutoplay, setCanAutoplay] = useState(false);

  // ---------------------------------------------------------------------------
  // Check a11y / data-saver preferences
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // `navigator.connection` is experimental — safe to ignore TS error
    // @ts-expect-error — experimental API
    const saveData = navigator.connection?.saveData === true;

    if (prefersReducedMotion || saveData) {
      return;
    }

    // Defer autoplay until JS confirms it's allowed — avoids wasted download
    setCanAutoplay(true);
  }, []);

  // ---------------------------------------------------------------------------
  // Pause when hero is off-screen or tab is hidden
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!canAutoplay) {
      return;
    }

    const videoEl = videoRef.current;

    if (!videoEl) {
      return;
    }

    // Slight slow (25% slower) — 0.75x for smooth, non-laggy hero motion (24fps → ~18fps).
    // Set immediately and re-apply on play (some browsers reset rate on play).
    videoEl.playbackRate = 0.75;
    videoEl.defaultPlaybackRate = 0.75;

    const handleRate = () => {
      if (videoEl.playbackRate !== 0.75) {
        videoEl.playbackRate = 0.75;
      }
    };

    videoEl.addEventListener("play", handleRate);

    // IntersectionObserver — pause when hero scrolls out of view, resume at 0.75x
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoEl) {
          return;
        }

        if (entry.isIntersecting) {
          videoEl.playbackRate = 0.75;
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(videoEl);

    // Visibility API — pause when tab is backgrounded, resume at 0.75x
    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoEl.pause();
      } else {
        videoEl.playbackRate = 0.75;
        videoEl.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      videoEl.removeEventListener("play", handleRate);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [canAutoplay]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      className="video-bg"
      aria-hidden="true"
      // Inline poster as CSS background ensures a visible fallback even before
      // the <video> or <img> element loads. The scrim overlay is handled by
      // `.video-bg::after` in globals.css.
      style={
        poster
          ? {
              backgroundImage: `url(${poster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {canAutoplay ? (
        // Video path — only mounted when autoplay is allowed
        <video
          ref={videoRef}
          className="video-bg-el"
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          // `fetchPriority` is not yet in React's TS types for <video>
          // @ts-expect-error — fetchPriority is valid HTML
          fetchPriority="low"
        >
          <source
            src={src}
            type="video/mp4"
          />
        </video>
      ) : (
        // Fallback — static poster for reduced-motion / saveData.
        // Uses the same `.video-bg-el` class so filters/scrim still apply.
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="video-bg-el"
          style={{
            opacity: 1,
            transform: "none",
            display: "block",
          }}
          loading="eager"
          decoding="async"
        />
      )}
    </div>
  );
}
