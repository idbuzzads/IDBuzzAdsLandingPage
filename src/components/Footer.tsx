import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Id Buzz Project</h3>
            <p className="text-sm leading-relaxed">
              The world's first fully transparent local mobile advertising platform powered by the VW ID Buzz.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="hover:text-sky-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#panels" className="hover:text-sky-400 transition-colors">
                  Panel Tiers
                </a>
              </li>
              <li>
                <a href="#reserve" className="hover:text-sky-400 transition-colors">
                  Reserve Panel
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#van" className="hover:text-sky-400 transition-colors">
                  3D Van Preview
                </a>
              </li>
              <li>
                <a href="#gps" className="hover:text-sky-400 transition-colors">
                  GPS Tracking
                </a>
              </li>
              <li>
                <a href="#transparency" className="hover:text-sky-400 transition-colors">
                  Transparency
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-sky-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>info@idbuzzproject.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5" />
                <span>Local Routes<br />Your City, ST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Id Buzz Project. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Fully Transparent Local Advertising • 48-Month Proof of Concept
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
