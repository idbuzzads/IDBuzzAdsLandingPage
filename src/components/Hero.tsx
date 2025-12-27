import { useEffect, useState } from 'react';
import { ArrowRight, Map } from 'lucide-react';

interface HeroProps {
  onReserveClick: () => void;
  onViewRoutesClick: () => void;
}

export default function Hero({ onReserveClick, onViewRoutesClick }: HeroProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 400; // controls how fast the zoom happens
      const progress = Math.min(scrollY / maxScroll, 1);
      const newScale = 1 + progress * 0.25; // zoom to 125%
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative pt-24 pb-36 overflow-hidden">

      {/* Hero Background Image with Scroll Zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/dwj8nsp3/7b368217-9c75-4ed2-a2cf-dec6c568d20b.png')",
          transform: `scale(${scale})`,
        }}
      />

      {/* Bright color wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-orange-50/60 to-fuchsia-100/70"></div>

      {/* Vertical glow support gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white"></div>

      {/* Light texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">

          <div className="inline-block mb-6 px-5 py-2 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-semibold shadow">
            Proof of Concept • 48 Months • Full Transparency
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              ID BUZZ
            </span>{' '}
            <span className="text-gray-900">PROJECT</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
            FULLY TRANSPARENT MOBILE ADVERTISING VAN
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={onReserveClick}
              className="group px-9 py-4 bg-gradient-to-r from-fuchsia-500 to-orange-400 hover:to-amber-400 text-white rounded-xl text-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            >
              Reserve a Panel
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewRoutesClick}
              className="group px-9 py-4 bg-white/90 backdrop-blur text-gray-900 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-xl border border-white/60"
            >
              <Map className="w-5 h-5" />
              View Live Routes
            </button>
          </div>

          {/* Stat Widgets with Glow */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">

            <div className="relative group">
              <div className="absolute inset-0 bg-fuchsia-400 blur-2xl opacity-40 rounded-2xl"></div>
              <div className="relative bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 text-center transition-transform duration-300 group-hover:-translate-y-1">
                <div className="text-3xl font-bold text-fuchsia-600 mb-1">15</div>
                <div className="text-sm text-gray-700">Ad Panels</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-amber-300 blur-2xl opacity-40 rounded-2xl"></div>
              <div className="relative bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 text-center transition-transform duration-300 group-hover:-translate-y-1">
                <div className="text-3xl font-bold text-amber-500 mb-1">1</div>
                <div className="text-sm text-gray-700">ID Buzz Van</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-40 rounded-2xl"></div>
              <div className="relative bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 text-center transition-transform duration-300 group-hover:-translate-y-1">
                <div className="text-3xl font-bold text-emerald-600 mb-1">48</div>
                <div className="text-sm text-gray-700">Months</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-violet-400 blur-2xl opacity-40 rounded-2xl"></div>
              <div className="relative bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 text-center transition-transform duration-300 group-hover:-translate-y-1">
                <div className="text-3xl font-bold text-violet-600 mb-1">100%</div>
                <div className="text-sm text-gray-700">Transparent</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
