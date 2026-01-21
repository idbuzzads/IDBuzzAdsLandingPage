import { useEffect, useState, useRef } from 'react';
import { Panel, supabase } from '../lib/supabase';
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
    { x: 299, y: 301 },
    { x: 454, y: 294 },
    { x: 454, y: 421 },
    { x: 312, y: 421 },
  ]);

  const [isActive, setIsActive] = useState(true);
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

      setTimeout(() => setUploadedImage(null), 60000);
    };
    reader.readAsDataURL(file);
  };

  const startDrag = (index: number) => {
    activeCornerRef.current = index;
    setIsActive(true);
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

  return (
    <section className="py-28 bg-gradient-to-b from-white via-orange-50/40 to-fuchsia-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Drag & Click to Preview Your Logo on the Van
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4">
            Move the corner points or click the + to add new points
          </p>

          {/* Centered Info Icon */}
          <div className="flex justify-center">
            <div
              onMouseEnter={() => setShowHelp(true)}
              onMouseLeave={() => setShowHelp(false)}
              className="relative inline-flex items-center justify-center w-10 h-10 
              rounded-full cursor-pointer bg-white border border-fuchsia-300 shadow 
              hover:shadow-lg transition"
            >
              <Info className="w-5 h-5 text-fuchsia-600" />

              {showHelp && (
                <div className="absolute left-1/2 -translate-x-1/2 top-12 w-72 p-4 text-sm 
                bg-white/90 backdrop-blur rounded-xl shadow-xl border border-fuchsia-300 
                animate-fadeIn z-40">
                  <p className="text-gray-700 leading-relaxed">
                    Drag the <span className="text-fuchsia-500 font-semibold">circle points</span>
                    to match the edges of a panel.  
                    Click the <span className="text-amber-500 font-semibold">+</span> icons to add
                    new points and form custom shapes to contour your logo perfectly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* INTERACTIVE LOGO TOOL */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className="relative w-full max-w-5xl mx-auto bg-white/90 backdrop-blur rounded-2xl p-6 shadow-2xl"
          style={{ userSelect: 'none' }}
        >
          {/* Upload button */}
          <label className="absolute top-6 right-6 z-30 flex flex-col items-center justify-center w-32 h-16 bg-white/70 backdrop-blur rounded-lg border border-amber-300 cursor-pointer hover:border-fuchsia-400 transition">
            <Upload className="w-5 h-5 text-fuchsia-500 mb-1" />
            <span className="text-gray-700 text-xs font-semibold">Upload Image</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Van Image */}
          <img
            src="https://i.ibb.co/fVwGCrMM/ID-Buzz-Yellow-Img.avif"
            className="rounded-xl shadow-xl w-full object-contain pointer-events-none"
          />

          {/* SVG Overlay */}
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
                fill="rgba(125, 200, 255, 0.25)"
              />
            )}
          </svg>

          {/* Corner Drag Handles */}
          {corners.map((corner, i) => (
            <div
              key={i}
              onMouseDown={() => startDrag(i)}
              className="absolute rounded-full border border-white shadow"
              style={{
                width: 14,
                height: 14,
                left: corner.x - 7,
                top: corner.y - 7,
                background: '#f472b6',
                opacity: isActive ? 1 : 0.35,
                cursor: 'grab',
                zIndex: 30,
              }}
            />
          ))}

          {/* Plus Signs */}
          {getMidpoints().map(mid => (
            <div
              key={mid.index}
              onClick={() => addCorner(mid.index, mid.x, mid.y)}
              className="absolute flex items-center justify-center rounded-full border border-white shadow text-xs font-bold"
              style={{
                width: 16,
                height: 16,
                left: mid.x - 8,
                top: mid.y - 8,
                background: '#facc15',
                opacity: isActive ? 1 : 0.35,
                cursor: 'pointer',
                zIndex: 30,
              }}
            >
              +
            </div>
          ))}
        </div>

        {/* COORDINATES */}
        <div className="mt-6 text-gray-700 text-sm grid grid-cols-2 md:grid-cols-4 gap-2">
          {corners.map((c, i) => (
            <div key={i} className="p-2 bg-white rounded-lg shadow text-center">
              <strong>Point {i + 1}:</strong> {Math.round(c.x)}, {Math.round(c.y)}
            </div>
          ))}
        </div>

        {/* ====================================== */}
        {/*     3D MODEL — RESTORED & BELOW TOOL   */}
        {/* ====================================== */}

        <div className="mt-20">
          <h3 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
            Explore the Van in 3D
          </h3>

          <div className="flex justify-center mb-4">
            <button
              onClick={resetRotation}
              className="flex items-center gap-2 px-5 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Reset View
            </button>
          </div>

          <SketchfabVan reloadKey={reloadKey} />
        </div>
      </div>
    </section>
  );
}
