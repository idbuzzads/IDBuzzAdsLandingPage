import { Upload, MousePointer, TrendingUp, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: MousePointer,
      title: 'Select Your Panel',
      description: 'Choose from small, medium, or large panels on our interactive 3D van model',
      glow: 'bg-fuchsia-400',
      text: 'text-fuchsia-600',
      badge: 'bg-fuchsia-500',
    },
    {
      number: 2,
      icon: Upload,
      title: 'Upload Your Design',
      description: 'Submit your artwork and see it previewed on the van in real-time',
      glow: 'bg-amber-300',
      text: 'text-amber-500',
      badge: 'bg-amber-400',
    },
    {
      number: 3,
      icon: TrendingUp,
      title: 'Daily Exposure',
      description: 'Your business drives through high-traffic areas every day',
      glow: 'bg-emerald-400',
      text: 'text-emerald-600',
      badge: 'bg-emerald-500',
    },
    {
      number: 4,
      icon: BarChart3,
      title: 'Track Impressions',
      description: 'Monitor your ad performance with public GPS tracking and impression data',
      glow: 'bg-violet-400',
      text: 'text-violet-600',
      badge: 'bg-violet-500',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-fuchsia-50/60">

      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Get your business live on the road in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative group">

                <div className={`absolute inset-0 ${step.glow} blur-2xl opacity-30 rounded-2xl`}></div>

                <div className="relative bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 h-full transition-all duration-300 group-hover:-translate-y-1">

                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-white shadow ${step.text}`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div
                    className={`inline-flex items-center justify-center w-9 h-9 ${step.badge} text-white rounded-full text-sm font-bold mb-5 shadow`}
                  >
                    {step.number}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>

                </div>

                {step.number < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <div className={`w-12 h-1 rounded-full ${step.badge} opacity-40`}></div>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>

    </section>
  );
}
