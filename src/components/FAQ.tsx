import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long is the commitment?',
      answer:
        'The agreement term is a full 24 months. Advertisers may choose from three flexible payment options: 100% upfront payment for the full term — estimated at $6,500, or, 50% upfront payment — estimated at $3,250, with the balance spread over the term, or, Month-to-month billing — estimated at $250 per month. Final pricing may vary slightly based on panel size and placement, but all options cover the complete 24-month advertising term.',
    },
    {
      question: 'How are traffic impressions estimated?',
      answer:
        'We use GPS tracking combined with Google Maps Traffic Density API to estimate the number of vehicles (impressions) that see your ad each day. In Phase 2, we\'ll add an AI camera system to validate these estimates with real vehicle counts. All data is publicly accessible.',
    },
    {
      question: 'Can I buy multiple panels?',
      answer:
        'Yes! Local businesses can reserve multiple panels to increase visibility. Mix and match sizes based on your budget and messaging needs. Contact us to discuss multi-panel packages.',
    },
    {
      question: 'When does the van operate?',
      answer:
        'The van operates daily during peak traffic hours (typically 7am-7pm on weekdays, with modified weekend schedules). Routes are planned to maximize exposure through high-traffic commercial and residential areas.',
    },
    {
      question: 'How is financial transparency handled?',
      answer:
        'Every financial metric is publicly visible on this website: vehicle cost, monthly payments, panel revenue, operating costs, and funding progress. We don\'t take any profit—100% of revenue covers vehicle and operating costs only.',
    },
    {
      question: 'What happens if all panels aren\'t funded?',
      answer:
        'The project continues with partial funding. We\'ve designed the pricing to ensure sustainability even without full panel sales, though reaching 100% funding means the vehicle cost is completely covered by advertisers.',
    },
    {
      question: 'What about the AI camera in Phase 2?',
      answer:
        'The AI camera will count vehicles only—no video recording, no personal data collection. It validates our GPS impression estimates by providing real traffic counts. Privacy and transparency are our top priorities.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about the Id Buzz Project
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-sky-300 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-sky-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="text-sky-100 mb-6">
            We're here to help! Reach out and we'll get back to you promptly.
          </p>
          <a
            href="#reserve"
            className="inline-block px-8 py-3 bg-white text-sky-600 rounded-lg font-semibold hover:bg-sky-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
