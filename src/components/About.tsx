import { Car, DollarSign, Eye, Shield } from 'lucide-react';

export default function About() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">

      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-50 via-orange-50 to-amber-50 opacity-70"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              About
            </span>{' '}
            <span className="text-gray-900">the Project</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            A fully transparent, zero-profit approach to local mobile advertising
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Card 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-fuchsia-400 blur-2xl opacity-30 rounded-3xl"></div>
            <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8 text-center transition-transform duration-300 group-hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-fuchsia-500 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                One VW ID Buzz
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A single electric Volkswagen ID Buzz van equipped with 15 premium advertising panels
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-amber-300 blur-2xl opacity-30 rounded-3xl"></div>
            <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8 text-center transition-transform duration-300 group-hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                15 Ad Panels
              </h3>
              <p className="text-gray-700 leading-relaxed">
                5 small, 1 medium, and 9 large panels positioned for maximum visibility city-wide
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-30 rounded-3xl"></div>
            <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8 text-center transition-transform duration-300 group-hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Zero Profit Model
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All revenue strictly covers vehicle costs over 48 months with no markup or margin
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-violet-400 blur-2xl opacity-30 rounded-3xl"></div>
            <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8 text-center transition-transform duration-300 group-hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Full Transparency
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All finances, routes, and impression data are publicly visible in real time
              </p>
            </div>
          </div>

        </div>

        {/* Mission Banner */}
        <div className="relative mt-24">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-orange-400 to-amber-400 blur-2xl opacity-40 rounded-3xl"></div>
          <div className="relative bg-gradient-to-r from-fuchsia-500 via-orange-400 to-amber-400 rounded-3xl p-10 md:p-14 shadow-2xl text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Why This Project Exists
           </h3>

<p className="text-lg leading-relaxed text-white/90 max-w-4xl mb-6">
  This is a 48-month proof of concept designed to prove that mobile advertising can be both powerful and completely transparent. This project is not built for profit. Every dollar collected is used solely to cover the cost of the vehicle. By exposing all operational and financial data publicly, the goal is to create maximum trust with local businesses and give them absolute clarity on their investment.
</p>

<p className="text-lg leading-relaxed text-white font-semibold">
  ... Oh and have some fun too.
</p>

</div>
</div>

</div>
</section>
);
}
