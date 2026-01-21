import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Panel } from '../lib/supabase';

interface PanelTiersProps {
  onSelectPanel: (size: 'small' | 'medium' | 'large') => void;
}

export default function PanelTiers({ onSelectPanel }: PanelTiersProps) {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPanels();
  }, []);

  const fetchPanels = async () => {
    const { data, error } = await supabase
      .from('panels')
      .select('*')
      .order('monthly_cost', { ascending: true });

    if (!error && data) {
      setPanels(data);
    }
    setLoading(false);
  };

  const tiers = [
    {
      size: 'small' as const,
      name: 'Small Panels',
      count: 3,
      available: 3,
      dimensions: '12" × 18"',
      features: [
        'Front Bumper',
        'Rear 1/4 Panel Glass Driver',
        'Rear 1/4 Panel Glass Passenger',
      ],
      glow: 'bg-fuchsia-400',
      text: 'text-fuchsia-600',
      badge: 'bg-fuchsia-500',
      button: 'bg-fuchsia-500 hover:bg-fuchsia-600',
      price: '$120.41',
    },
    {
      size: 'medium' as const,
      name: 'Medium Panel',
      count: 5,
      available: 5,
      dimensions: '24" × 36"',
      features: [
        'Rear 1/4 Panel Driver',
        'Rear 1/4 Panel Passenger',
        'Rear 1/4 Panel Glass Driver',
        'Rear 1/4 Panel Glass Passenger',
        'Rear Bumper',
      ],
      glow: 'bg-amber-300',
      text: 'text-amber-500',
      badge: 'bg-amber-400',
      button: 'bg-amber-400 hover:bg-amber-500',
      price: '$180.62',
    },
    {
      size: 'large' as const,
      name: 'Large Panels',
      count: 7,
      available: 7,
      dimensions: '36" × 48"',
      features: [
        'Drivers Door',
        'Passenger Door',
        'Rear Drivers Door',
        'Rear Passenger Door',
        'Rear Driver Door Glass',
        'Rear Passenger Door Glass',
        'Trunk Glass',
      ],
      glow: 'bg-violet-400',
      text: 'text-violet-600',
      badge: 'bg-violet-500',
      button: 'bg-violet-500 hover:bg-violet-600',
      highlight: true,
      price: '$240.82',
    },
  ];

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white via-orange-50/40 to-fuchsia-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-fuchsia-50/60">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Panel Tiers
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect size for your advertising needs
          </p>
        </div>

        {/* Tier Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {tiers.map((tier) => (
            <div key={tier.size} className="relative group">

              {/* Glow */}
              <div
                className={`absolute inset-0 ${tier.glow} blur-2xl opacity-30 rounded-2xl`}
              ></div>

              {/* Card */}
              <div
                className={`relative bg-white/90 backdrop-blur rounded-2xl p-9 h-full shadow-xl transition-all duration-300 group-hover:-translate-y-1 ${
                  tier.highlight ? 'ring-2 ring-amber-400/40 scale-105' : ''
                }`}
              >
                {/* Badge */}
                {tier.highlight && (
                  <div
                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${tier.badge} text-white px-5 py-1 rounded-full text-sm font-semibold shadow`}
                  >
                    Most Visible
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>

                  <p className="text-gray-600 mb-4">{tier.dimensions}</p>

                  <div
                    className={`inline-block px-4 py-1 rounded-full text-sm font-semibold bg-white shadow ${tier.text}`}
                  >
                    {tier.available} of {tier.count} Available
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="text-4xl font-extrabold text-gray-900 mb-2">
                    {tier.price}
                  </div>
                  <div className="text-gray-600">per month</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Formula-based pricing
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 ${tier.badge} rounded-full flex items-center justify-center mt-0.5`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => onSelectPanel(tier.size)}
                  disabled={tier.available === 0}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow ${
                    tier.available === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : `${tier.button} text-white hover:shadow-xl`
                  }`}
                >
                  {tier.available === 0 ? 'Sold Out' : 'Select Panel'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 leading-relaxed">
            Pricing shown is an estimated projection based on an assumed vehicle
            value of $70,000 financed over 24 months. Final panel pricing will be
            recalculated and locked in, once the vehicle purchase is completed and
            actual costs are confirmed.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
