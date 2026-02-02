import { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { supabase, Panel } from '../lib/supabase';

interface ReservationFormProps {
  selectedPanel: Panel | null;
  previewImage: string | null;
  onClose: () => void;
}

export default function ReservationForm({ selectedPanel, previewImage, onClose }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    panelSize: (selectedPanel?.size || 'large') as 'small' | 'medium' | 'large',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('reservations').insert({
        panel_id: selectedPanel?.id || null,
        business_name: formData.businessName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        panel_size_requested: formData.panelSize,
        artwork_url: previewImage,
        notes: formData.notes,
        status: 'pending',
      });

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit reservation. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <section id="reserve" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Reservation Submitted!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest in the Id Buzz Project. We'll contact you shortly to finalize your panel placement.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onClose}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
          Close Form
        </button>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Reserve Your Panel</h2>
            <p className="text-lg text-gray-600">
              Complete the form below to request a panel reservation
            </p>
          </div>

          {selectedPanel && (
            <div className="bg-sky-50 rounded-xl p-6 mb-8 border-2 border-sky-200">
              <h3 className="font-semibold text-gray-900 mb-3">Selected Panel</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Panel:</span>
                  <span className="ml-2 font-semibold text-gray-900">{selectedPanel.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2 font-semibold text-gray-900 capitalize">{selectedPanel.size}</span>
                </div>
                <div>
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {selectedPanel.dimensions.width}" × {selectedPanel.dimensions.height}"
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Monthly Cost:</span>
                  <span className="ml-2 font-semibold text-sky-600">${selectedPanel.monthly_cost}</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-sm font-semibold text-gray-900 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring focus:ring-sky-200 transition-colors"
                placeholder="Your Business Name"
              />
            </div>

            <div>
              <label htmlFor="contactName" className="block text-sm font-semibold text-gray-900 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                required
                value={formData.contactName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring focus:ring-sky-200 transition-colors"
                placeholder="Your Name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring focus:ring-sky-200 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring focus:ring-sky-200 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="panelSize" className="block text-sm font-semibold text-gray-900 mb-2">
                Panel Size Preference *
              </label>
              <select
                id="panelSize"
                name="panelSize"
                required
                value={formData.panelSize}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring focus:ring-sky-200 transition-colors"
              >
                <option value="small">Small - $120.41/month</option>
                <option value="medium">Medium - $180.62/month</option>
                <option value="large">Large - $240.82/month</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-900 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring focus:ring-sky-200 transition-colors"
                placeholder="Any special requests or questions..."
              ></textarea>
            </div>

            {previewImage && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <CheckCircle className="w-5 h-5" />
                  Artwork Uploaded
                </div>
                <p className="text-sm text-green-600">Your design will be included with this reservation</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              {loading ? 'Submitting...' : 'Request Panel Reservation'}
            </button>

            <p className="text-sm text-gray-500 text-center">
              * By submitting, you agree to be contacted about your panel reservation. No payment required at this time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
