"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Maximize, Minimize } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { withBasePath } from "@/lib/base-path";

export function VideoDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { content } = useI18n();
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleFullscreen = async () => {
    if (!playerRef.current) return;
    try {
      if (!isFullscreen) {
        await playerRef.current.requestFullscreen?.();
        setIsFullscreen(true);
        // Auto-hide controls on mobile fullscreen
        setShowControls(false);
        if (videoRef.current && !isPlaying) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen?.();
        }
        setIsFullscreen(false);
        // Restore controls when exiting fullscreen
        setShowControls(true);
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isFullscreen && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleTouchMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isFullscreen && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();
      handleVideoToggle();
    } else if (e.key === "f") {
      handleFullscreen();
    } else if (e.key === "Escape" && isFullscreen) {
      handleFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  // Ensure metadata loads and set duration when available
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Try to read duration if already loaded
    if (v.duration && v.duration !== Infinity) {
      setDuration(v.duration);
    }

    // Listen for when metadata becomes available
    const handleLoadedMetadata = () => {
      if (v.duration && v.duration !== Infinity) {
        setDuration(v.duration);
      }
    };

    v.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => v.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  // Debug: attach video event listeners to help diagnose periodic pauses.
  // Retry attaching if videoRef isn't available at first render.
  useEffect(() => {
    let mounted = true;
    let retryId: NodeJS.Timeout | null = null;

    const attach = () => {
      const v = videoRef.current;
      if (!v || !mounted) return false;

      const logEvent = (ev: Event) => {
        // eslint-disable-next-line no-console
        console.log("[video-event]", ev.type, {
          time: Date.now(),
          currentTime: v.currentTime,
          paused: v.paused,
          readyState: v.readyState,
        });
      };

      const onTimeUpdate = () => {
        // eslint-disable-next-line no-console
        console.log("[video-timeupdate]", Math.floor(v.currentTime), {
          currentTime: v.currentTime,
          paused: v.paused,
        });
      };

      const onError = () => {
        // eslint-disable-next-line no-console
        console.error("[video-error]", v.error);
      };

      v.addEventListener("pause", logEvent);
      v.addEventListener("playing", logEvent);
      v.addEventListener("waiting", logEvent);
      v.addEventListener("stalled", logEvent);
      v.addEventListener("seeking", logEvent);
      v.addEventListener("progress", logEvent);
      v.addEventListener("canplay", logEvent);
      v.addEventListener("canplaythrough", logEvent);
      v.addEventListener("loadeddata", logEvent);
      v.addEventListener("timeupdate", onTimeUpdate);
      v.addEventListener("error", onError);

      // keep a ref to remove listeners later
      (v as any).__diagnosticAttached = true;
      return true;
    };

    const tryAttach = () => {
      if (attach()) return;
      retryId = setInterval(() => {
        if (attach()) {
          if (retryId) clearInterval(retryId);
        }
      }, 200);
    };

    tryAttach();

    return () => {
      mounted = false;
      if (retryId) clearInterval(retryId);
      const v = videoRef.current;
      if (v && (v as any).__diagnosticAttached) {
        v.removeEventListener("pause", () => {});
        v.removeEventListener("playing", () => {});
        v.removeEventListener("waiting", () => {});
        v.removeEventListener("stalled", () => {});
        v.removeEventListener("seeking", () => {});
        v.removeEventListener("progress", () => {});
        v.removeEventListener("canplay", () => {});
        v.removeEventListener("canplaythrough", () => {});
        v.removeEventListener("loadeddata", () => {});
        v.removeEventListener("timeupdate", () => {});
        v.removeEventListener("error", () => {});
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative h-screen flex items-center overflow-hidden perspective-1000 ${isFullscreen ? "!fixed !inset-0 !h-screen !w-screen !z-[9999]" : ""}`}
    >
      {/* Animated background grid */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(200,240,74,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* Central glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full bg-primary/20 blur-[150px]"
      />

      {/* Orbiting elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: "linear",
              direction: i % 2 === 0 ? "normal" : "reverse",
            }}
            className="absolute inset-0"
          >
            <div
              className="absolute w-3 h-3 rounded-full bg-primary/40"
              style={{
                top: `${10 + i * 15}%`,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            {content.demo.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            {content.demo.titleLine1}
            <br />
            <span className="text-primary">{content.demo.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Video player - YouTube style */}
        <motion.div style={{ rotateX, scale, y }} className="preserve-3d">
          <motion.div
            initial={{ opacity: 0, rotateY: -15 }}
            animate={
              isInView
                ? { opacity: 1, rotateY: 0 }
                : { opacity: 0, rotateY: -15 }
            }
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-lg overflow-hidden bg-black shadow-2xl"
          >
            {/* Video player container */}
            <div
              ref={playerRef}
              className="relative w-full aspect-video bg-black group"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              {/* Video element */}
              <video
                ref={videoRef}
                className="w-full h-full object-contain bg-black"
                muted
                preload="metadata"
                playsInline
                onClick={handleVideoToggle}
                onTimeUpdate={(e) =>
                  setCurrentTime(e.currentTarget.currentTime)
                }
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onPlay={() => {
                  setIsPlaying(true);
                  setIsBuffering(false);
                }}
                onPause={() => setIsPlaying(false)}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => setIsBuffering(false)}
                loop
              >
                <source src={withBasePath("/video.mp4")} type="video/mp4" />
              </video>

              {/* Buffering spinner */}
              {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              )}
              {/* Play/Pause overlay button (shows when controls visible or when paused) */}
              {(showControls || !isPlaying) && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity"
                  onClick={handleVideoToggle}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-primary-foreground ml-0.5" />
                    ) : (
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    )}
                  </motion.div>
                </div>
              )}

              {/* Controls container */}
              <motion.div
                animate={{
                  opacity: showControls ? 1 : 0,
                  pointerEvents: showControls ? "auto" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4"
              >
                {/* Progress bar */}
                <div
                  ref={progressRef}
                  className="w-full h-1 bg-gray-600 rounded-full cursor-pointer mb-3 group/progress hover:h-2 transition-all"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                  />
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <button
                      onClick={handleVideoToggle}
                      className="p-2 hover:bg-white/10 rounded transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </button>

                    {/* Volume removed (video has no audio) */}

                    {/* Time display */}
                    <span className="text-white text-sm font-medium ml-2">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={handleFullscreen}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-muted-foreground mt-6"
        >
          {content.demo.caption}
        </motion.p>
      </div>

      {/* Fullscreen handled via Fullscreen API on playerRef (no duplicated overlay) */}
    </section>
  );
}
