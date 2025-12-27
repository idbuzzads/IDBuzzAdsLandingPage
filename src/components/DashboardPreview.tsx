import { BarChart3, Map, Eye, DollarSign, Camera } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Advertiser Dashboard
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your ad performance with complete transparency and real-time data
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
            <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Panel Preview</h3>
            <p className="text-gray-300">
              See your artwork displayed on the van in real-time with our 3D visualization
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <Map className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Route History</h3>
            <p className="text-gray-300">
              View detailed maps of where your ad has been displayed each day
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Impression Analytics</h3>
            <p className="text-gray-300">
              Track daily, weekly, and monthly impressions with detailed breakdowns
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Cost Contribution</h3>
            <p className="text-gray-300">
              See exactly how your monthly payment contributes to vehicle costs
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Validation</h3>
            <p className="text-gray-300">
              Future: Real vehicle counts to validate GPS impression estimates
            </p>
            <div className="mt-2 inline-block bg-yellow-500 bg-opacity-20 border border-yellow-500 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold">
              Phase 2 - Coming Soon
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-15 transition-all">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance Reports</h3>
            <p className="text-gray-300">
              Download monthly reports with detailed analytics and insights
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-sky-600 to-blue-600 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Real-Time Access to Everything</h3>
            <p className="text-sky-100 text-lg leading-relaxed mb-8">
              Your advertiser dashboard provides 24/7 access to all performance metrics, route data, and financial
              transparency information. No hidden data—see everything we see, whenever you want.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm text-sky-200">Dashboard Access</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm text-sky-200">Data Transparency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Real-Time</div>
                <div className="text-sm text-sky-200">GPS Tracking</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Daily</div>
                <div className="text-sm text-sky-200">Report Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
