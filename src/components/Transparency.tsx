import { DollarSign, TrendingUp, Package, PieChart } from 'lucide-react';

// STATIC METRICS — NO MOCK PANEL DATA
const staticMetrics = {
  vehicle_cost: 59000+,
  monthly_payment: 2950,
  operating_costs: {
    Vinyl: 0,
    charging: 0,
    maintenance: 0,
    software: 0,
  },
};

// PANEL COUNTS
const PANEL_COUNTS = {
  small: 3,
  medium: 5,
  large: 7,
};

export default function Transparency() {
  const metrics = staticMetrics;

  const totalPanels =
    PANEL_COUNTS.small + PANEL_COUNTS.medium + PANEL_COUNTS.large;

  const fundedPanels = 0;
  const totalRevenue = 0;

  const fundingPercentage = 0;

  const monthsRemaining = Math.ceil(
    metrics.vehicle_cost / metrics.monthly_payment
  );

  const operatingCostEntries = Object.entries(metrics.operating_costs);
  const totalOperatingCosts = operatingCostEntries.reduce(
    (sum, [, value]) => sum + value,
    0
  );

  return (
    <section className="py-32 bg-gradient-to-b from-white via-slate-50 to-blue-50 relative overflow-hidden">
      {/* GLOW ORBS */}
      <div className="absolute -top-40 left-10 w-96 h-96 bg-fuchsia-400/20 blur-3xl rounded-full"></div>
      <div className="absolute top-40 right-0 w-[450px] h-[450px] bg-sky-300/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-amber-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">
              Financial Transparency
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Every dollar visible. Every metric open. Your advertising funds only
            the project — no profit, no markup.
          </p>
        </div>

        {/* TOP METRIC CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* VEHICLE COST */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-300 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <span className="text-slate-600 text-sm">
                Vehicle Cost - estimated
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              ${metrics.vehicle_cost.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500 mt-2">Total financed</div>
          </div>

          {/* MONTHLY PAYMENT */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-300 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <span className="text-slate-600 text-sm">Monthly Payment</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              ${metrics.monthly_payment.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500 mt-2">
              Fixed monthly cost
            </div>
          </div>

          {/* FUNDED PANELS */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <span className="text-slate-600 text-sm">Panels Funded</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {fundedPanels} / {totalPanels}
            </div>
            <div className="text-sm text-slate-500 mt-2">0% funded</div>
          </div>

          {/* MONTHLY REVENUE */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-300 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <PieChart className="w-7 h-7 text-white" />
              </div>
              <span className="text-slate-600 text-sm">Monthly Revenue</span>
            </div>

            <div className="text-3xl font-bold text-slate-900">$0</div>
            <div className="text-sm text-slate-500 mt-2">No active panels</div>
          </div>
        </div>

        {/* PROGRESS CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-10 shadow-xl border border-slate-200 mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">
            Funding Progress
          </h3>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Vehicle Cost Coverage</span>
              <span>0%</span>
            </div>

            <div className="h-5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="text-center p-5 bg-sky-50 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-sky-600 mb-1">
                {fundedPanels}
              </div>
              <div className="text-sm text-slate-600">Panels Active</div>
            </div>

            <div className="text-center p-5 bg-green-50 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {totalPanels}
              </div>
              <div className="text-sm text-slate-600">Panels Available</div>
            </div>

            <div className="text-center p-5 bg-blue-50 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {monthsRemaining}
              </div>
              <div className="text-sm text-slate-600">
                Months to Full Funding
              </div>
            </div>
          </div>
        </div>

        {/* OPERATING COSTS */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-10 shadow-xl border border-slate-200">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">
            Operating Costs
          </h3>

          <div className="space-y-5">
            {operatingCostEntries.map(([category, amount]) => (
              <div
                key={category}
                className="flex items-center justify-between"
              >
                <span className="text-slate-700 capitalize">{category}</span>
                <span className="font-bold text-slate-900">
                  ${amount}/month
                </span>
              </div>
            ))}

            <div className="pt-5 border-t border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-900">
                Total Operating Costs
              </span>
              <span className="font-bold text-sky-600 text-xl">
                ${totalOperatingCosts}/month
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
