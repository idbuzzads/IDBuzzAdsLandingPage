import { useEffect, useState, useRef } from 'react';
import { Panel } from '../lib/supabase';
import { RotateCcw, Upload, Info } from 'lucide-react';

interface VanInteractiveProps {
  selectedPanel: Panel | null;
  onPanelSelect?: (panel: Panel) => void;
}

function SketchfabVan({ reloadKey }: { reloadKey: number }) {
  return (
    <iframe
      key={reloadKey}
      title="Volkswagen ID Buzz 3D Model"
      className="w-full h-[600px] rounded-2xl shadow-2xl"
      frameBorder="0"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowFullScreen
      src="https://sketchfab.com/models/65a859a640a5463f9835fd06f684b0bb/embed?autostart=1&ui_controls=1&ui_infos=0"
    />
  );
}

interface Corner {
  x: number;
  y: number;
}

export default function VanInteractive({ selectedPanel }: VanInteractiveProps) {
  const [reloadKey, setReloadKey] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [corners, setCorners] = useState<Corner[]>([
    { x: 318, y: 323 },
    { x: 333, y: 456 },
    { x: 489, y: 450 },
    { x: 484, y: 312 },
  ]);

  const [showHelp, setShowHelp] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeCornerRef = useRef<number | null>(null);

  const resetRotation = () => setReloadKey(k => k + 1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const startDrag = (index: number) => {
    activeCornerRef.current = index;
  };

  const stopDrag = () => {
    activeCornerRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (activeCornerRef.current === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCorners(prev => {
      const next = [...prev];
      next[activeCornerRef.current!] = { x, y };
      return next;
    });
  };

  const addCorner = (index: number, x: number, y: number) => {
    setCorners(prev => {
      const next = [...prev];
      next.splice(index + 1, 0, { x, y });
      return next;
    });
  };

  const getMidpoints = () =>
    corners.map((c, i) => {
      const next = (i + 1) % corners.length;
      return {
        index: i,
        x: (c.x + corners[next].x) / 2,
        y: (c.y + corners[next].y) / 2,
      };
    });

  /* 🔥 Transparency logic */
  const nodeOpacity = uploadedImage ? 0.18 : 1;
  const plusOpacity = uploadedImage ? 0.15 : 1;
  const overlayOpacity = uploadedImage ? 0.05 : 0.25;

  return (
    <section className="py-28 bg-gradient-to-b from-white via-orange-50/40 to-fuchsia-50/60">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Drag & Click to Preview Your Logo on the Van
            </span>
          </h2>

          <div className="flex justify-center">
            <div
              onMouseEnter={() => setShowHelp(true)}
              onMouseLeave={() => setShowHelp(false)}
              className="relative w-10 h-10 rounded-full cursor-pointer bg-white border border-fuchsia-300 shadow"
            >
              <Info className="w-5 h-5 text-fuchsia-600 mx-auto mt-2.5" />

              {showHelp && (
                <div className="absolute left-1/2 -translate-x-1/2 top-12 w-72 p-4 bg-white rounded-xl shadow-xl border">
                  Drag circles or add points to match panel shape.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TOOL */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className="relative w-full max-w-5xl mx-auto bg-white rounded-2xl p-6 shadow-2xl"
          style={{ userSelect: 'none' }}
        >
          <label className="absolute top-6 right-6 z-30 w-32 h-16 bg-white rounded-lg border cursor-pointer flex flex-col items-center justify-center">
            <Upload className="w-5 h-5 text-fuchsia-500 mb-1" />
            <span className="text-xs font-semibold">Upload Image</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>

          <img
            src="https://i.ibb.co/fVwGCrMM/ID-Buzz-Yellow-Img.avif"
            className="rounded-xl w-full object-contain pointer-events-none"
          />

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <defs>
              <clipPath id="polyClip">
                <polygon points={corners.map(c => `${c.x},${c.y}`).join(' ')} />
              </clipPath>
            </defs>

            {uploadedImage ? (
              <image
                href={uploadedImage}
                x={Math.min(...corners.map(c => c.x))}
                y={Math.min(...corners.map(c => c.y))}
                width={Math.max(...corners.map(c => c.x)) - Math.min(...corners.map(c => c.x))}
                height={Math.max(...corners.map(c => c.y)) - Math.min(...corners.map(c => c.y))}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#polyClip)"
              />
            ) : (
              <polygon
                points={corners.map(c => `${c.x},${c.y}`).join(' ')}
                fill={`rgba(125, 200, 255, ${overlayOpacity})`}
              />
            )}
          </svg>

          {/* Corner Nodes */}
          {corners.map((corner, i) => (
            <div
              key={i}
              onMouseDown={() => startDrag(i)}
              className="absolute rounded-full border border-white shadow transition-opacity duration-300"
              style={{
                width: 14,
                height: 14,
                left: corner.x - 7,
                top: corner.y - 7,
                background: '#f472b6',
                opacity: nodeOpacity,
                cursor: 'grab',
                zIndex: 30,
              }}
            />
          ))}

          {/* Plus Nodes */}
          {getMidpoints().map(mid => (
            <div
              key={mid.index}
              onClick={() => addCorner(mid.index, mid.x, mid.y)}
              className="absolute flex items-center justify-center rounded-full border border-white shadow text-xs font-bold transition-opacity duration-300"
              style={{
                width: 16,
                height: 16,
                left: mid.x - 8,
                top: mid.y - 8,
                background: '#facc15',
                opacity: plusOpacity,
                cursor: 'pointer',
                zIndex: 30,
              }}
            >
              +
            </div>
          ))}
        </div>

        {/* 3D MODEL */}
        <div className="mt-20 text-center">
          <button
            onClick={resetRotation}
            className="mb-4 px-5 py-2 bg-gray-800 text-white rounded-lg shadow"
          >
            <RotateCcw className="inline w-4 h-4 mr-2" />
            Reset View
          </button>

          <SketchfabVan reloadKey={reloadKey} />
        </div>
      </div>
    </section>
  );
}
