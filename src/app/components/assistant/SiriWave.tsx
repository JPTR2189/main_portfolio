import { useEffect, useRef } from "react";

// Layers of light, like the new Siri's voice: soft hills that rise from a line at the
// bottom, overlap additively (white where they cross), and drift and swell as it talks.
const LAYERS = [
  { color: [40, 110, 255], speed: 0.9, seed: 0 },
  { color: [255, 90, 40], speed: 1.1, seed: 1.7 },
  { color: [255, 70, 150], speed: 0.8, seed: 3.2 },
  { color: [60, 220, 140], speed: 1.3, seed: 4.6 },
];

// Hill height while silent, as a fraction of the canvas: a thin glowing line.
const IDLE_LEVEL = 0.08;
// How fast the level follows `speaking`, per frame.
const LEVEL_EASING = 0.08;

const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 18%, #000 82%, transparent), linear-gradient(to top, #000 65%, transparent)";

const rgba = ([r, g, b]: number[], alpha: number) => `rgba(${r}, ${g}, ${b}, ${alpha})`;

/** Halfway between the color and white, for the bright rim along each hill's top. */
const towardWhite = (color: number[]) => color.map((channel) => Math.round((channel + 255) / 2));

/**
 * The new Siri's voice animation on a canvas, sized by its CSS box. While `speaking` the
 * hills swell and fall like syllables; otherwise they sink into a glowing line.
 */
export function SiriWave({ speaking, className }: { speaking: boolean; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The drawing loop starts once, so it reads the latest prop through a ref.
  const speakingRef = useRef(speaking);
  speakingRef.current = speaking;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }
    let level = IDLE_LEVEL;
    let frameId = 0;

    const frame = (now: number) => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const time = now / 1000;
      // Two sines out of step make the swell rise and fall like syllables.
      const target = speakingRef.current
        ? 0.45 + 0.55 * Math.abs(Math.sin(time * 5.3) * Math.sin(time * 2.1 + 1))
        : IDLE_LEVEL;
      level += (target - level) * LEVEL_EASING;

      const base = height;
      context.globalCompositeOperation = "lighter";

      // Soft beam of light rising from the middle, flattened to fade out before the top edge.
      const beamWidth = width * 0.45;
      context.save();
      context.translate(width / 2, base);
      context.scale(beamWidth / height, 1);
      const beam = context.createRadialGradient(0, 0, 0, 0, 0, height);
      beam.addColorStop(0, `rgba(255, 255, 255, ${0.22 * level})`);
      beam.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = beam;
      context.fillRect(-height, -height, height * 2, height);
      context.restore();

      // The line the hills rise from, fading out at both ends.
      const line = context.createLinearGradient(0, 0, width, 0);
      line.addColorStop(0, "rgba(255, 255, 255, 0)");
      line.addColorStop(0.5, "rgba(255, 255, 255, 0.35)");
      line.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = line;
      context.fillRect(0, base - 1, width, 1);

      for (const layer of LAYERS) {
        const t = time * layer.speed;
        // Hills stay near the middle and wide, drifting a little from side to side.
        const center = width * (0.5 + 0.12 * Math.sin(t * 0.7 + layer.seed) + 0.05 * Math.sin(t * 1.9 + layer.seed * 2));
        const spread = width * (0.2 + 0.06 * Math.sin(t * 0.5 + layer.seed * 3));
        const own = 0.6 + 0.4 * Math.sin(t * 1.3 + layer.seed) ** 2;
        // Peaks stay below the faded top of the canvas.
        const peak = level * own * height * 0.68;

        const hill = new Path2D();
        hill.moveTo(0, base);
        for (let x = 0; x <= width; x += 2) {
          const d = (x - center) / spread;
          hill.lineTo(x, base - peak * Math.exp(-d * d));
        }

        // Saturated color down to the base, brightest along the top.
        const body = context.createLinearGradient(0, base - peak, 0, base);
        body.addColorStop(0, rgba(layer.color, 0.95));
        body.addColorStop(1, rgba(layer.color, 0.45));
        context.fillStyle = body;

        // A blurred copy first, for the bloom around each hill.
        context.save();
        context.filter = "blur(12px)";
        context.fill(hill);
        context.restore();
        context.fill(hill);

        // A soft bright rim instead of a hard outline.
        context.save();
        context.filter = "blur(1.5px)";
        context.shadowBlur = 18;
        context.shadowColor = rgba(layer.color, 1);
        context.strokeStyle = rgba(towardWhite(layer.color), 0.75);
        context.lineWidth = 2.5;
        context.stroke(hill);
        context.restore();
      }

      frameId = requestAnimationFrame(frame);
    };

    frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      // Fades both sides and the top, so the light never ends in a hard edge.
      style={{
        maskImage: EDGE_FADE,
        WebkitMaskImage: EDGE_FADE,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
}
