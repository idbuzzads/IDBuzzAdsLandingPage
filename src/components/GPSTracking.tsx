import { useEffect, useState } from 'react';
import { MapPin, TrendingUp, Calendar } from 'lucide-react';
import { supabase, RoutePoint } from '../lib/supabase';

export default function GPSTracking() {
  const [routes, setRoutes] = useState<RoutePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalImpressions, setTotalImpressions] = useState(0);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const { data } = await supabase
      .from('routes')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);

    if (data) {
      setRoutes(data);
      const total = data.reduce((sum, r) => sum + r.estimated_impressions, 0);
      setTotalImpressions(total);
    }
    setLoading(false);
  };

  const currentLocation = routes[0];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-blue-900 to-sky-900 relative overflow-hidden">

      {/* --- BACKGROUND GLOW ACCENTS --- */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-400 via-orange-300 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
              Live GPS Tracking
            </span>
          </h2>

          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Real-time location, movement patterns, and impression data — tracked in a transparent way.
          </p>
        </div>

        {/* --- TOP METRICS CARDS --- */}
        <div className="grid lg:grid-cols-3 gap-8 mb-14">

          {/* CARD 1 */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg shadow-black/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-md shadow-sky-500/40">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-blue-200">Current Location</div>
                <div className="font-bold text-lg text-white">
                  {currentLocation ? 'Active Route' : 'Loading...'}
                </div>
              </div>
            </div>
            {currentLocation && (
              <div className="text-sm text-blue-200">
                Lat: {currentLocation.latitude.toFixed(4)} | Lng: {currentLocation.longitude.toFixed(4)}
              </div>
            )}
          </div>

          {/* CARD 2 */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg shadow-black/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md shadow-green-400/40">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-blue-200">Total Impressions</div>
                <div className="font-bold text-lg text-white">
                  {totalImpressions.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="text-sm text-blue-200">Traffic-based visibility estimate</div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg shadow-black/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md shadow-amber-400/40">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-blue-200">Data Points</div>
                <div className="font-bold text-lg text-white">{routes.length}</div>
              </div>
            </div>
            <div className="text-sm text-blue-200">Last 24 hours</div>
          </div>
        </div>

        {/* --- MAP AREA (COMING SOON) --- */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl shadow-black/30 mb-12">
          <div className="aspect-video bg-gradient-to-br from-sky-800 to-blue-900 rounded-xl relative overflow-hidden flex items-center justify-center">

            {/* GRID OVERLAY */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              ></div>
            </div>

            {/* MAP CONTENT */}
            <div className="relative z-10 text-center px-6">
              <MapPin className="w-16 h-16 text-sky-400 mx-auto mb-4 animate-pulse drop-shadow-lg" />
              <h3 className="text-2xl font-bold text-white mb-2">Interactive Map View</h3>
              <p className="text-blue-200 mb-4">Coming Soon: Live route visualization</p>

              {currentLocation && (
                <div className="inline-block bg-sky-600/80 px-5 py-2 rounded-full text-sm shadow-md shadow-sky-600/40 text-white">
                  Demo Mode: Simulated Routes Active
                </div>
              )}
            </div>

            {/* FLOATING DOT ANIMATIONS */}
            {routes.slice(0, 10).map((r, i) => (
              <div
                key={r.id}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: `${20 + i * 6}%`,
                  top: `${30 + (i % 3) * 15}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>

          <div className="mt-6 text-blue-200 text-center text-sm">
            GPS tracking uses Google Traffic data for impression estimates.  
            AI camera verification launches in <span className="text-amber-300 font-semibold">Phase 2</span>.
          </div>
        </div>

        {/* --- GPS TRACKING SYSTEM COMING SOON (NEW DUPLICATED CARD) --- */}
        <div className="bg-amber-500/20 border-2 border-amber-400 rounded-2xl p-6 shadow-lg shadow-blue-500/20 mb-10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md shadow-blue-500/40">
              <span className="text-2xl">📡</span>
            </div>

            <div>
              <h3 className="font-bold text-xl text-white mb-2">GPS Tracking System — Coming Soon</h3>
              <p className="text-blue-100 leading-relaxed">
                A next-generation GPS system will provide ultra-precise movement tracking,
                route reconstruction, and real-time motion analytics using enhanced sensor fusion.
              </p>
            </div>
          </div>
        </div>

        {/* --- AI CAMERA FEATURE CARD (ORIGINAL) --- */}
        <div className="bg-amber-500/20 border-2 border-amber-400 rounded-2xl p-6 shadow-lg shadow-amber-500/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-md shadow-amber-500/40">
              <span className="text-2xl">🎥</span>
            </div>

            <div>
              <h3 className="font-bold text-xl text-white mb-2">AI Camera — Coming Soon</h3>
              <p className="text-blue-100 leading-relaxed">
                A vehicle-mounted sensor will count nearby cars to validate impression estimates in real-time.
                No video is stored and no personal data is collected — only object counts for accuracy.
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center mt-10">
            <div className="inline-block animate-spin rounded-full h-14 w-14 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </section>
  );
}
