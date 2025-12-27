import { useState, useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import PanelTiers from './components/PanelTiers';
import VanInteractive from './components/VanInteractive';
import UploadPreview from './components/UploadPreview';
import GPSTracking from './components/GPSTracking';
import Transparency from './components/Transparency';
import DashboardPreview from './components/DashboardPreview';
import FAQ from './components/FAQ';
import ReservationForm from './components/ReservationForm';
import Footer from './components/Footer';
import { Panel } from './lib/supabase';

function App() {
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showReservationForm, setShowReservationForm] = useState(false);

  const vanRef = useRef<HTMLDivElement>(null);
  const gpsRef = useRef<HTMLDivElement>(null);
  const reserveRef = useRef<HTMLDivElement>(null);

  const handleReserveClick = () => {
    setShowReservationForm(true);
    setTimeout(() => {
      reserveRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleViewRoutesClick = () => {
    gpsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePanelSelect = (panel: Panel) => {
    setSelectedPanel(panel);
    setTimeout(() => {
      vanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleSelectPanelBySize = (size: 'small' | 'medium' | 'large') => {
    vanRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageUpload = (imageUrl: string) => {
    setPreviewImage(imageUrl);
  };

  const handleClearImage = () => {
    setPreviewImage(null);
  };

  const handleCloseForm = () => {
    setShowReservationForm(false);
    setSelectedPanel(null);
    setPreviewImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {!showReservationForm ? (
        <>
          <section id="hero">
            <Hero onReserveClick={handleReserveClick} onViewRoutesClick={handleViewRoutesClick} />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="how-it-works">
            <HowItWorks />
          </section>

          <section id="panels">
            <PanelTiers onSelectPanel={handleSelectPanelBySize} />
          </section>

          <section id="van" ref={vanRef}>
            <VanInteractive
              selectedPanel={selectedPanel}
              onPanelSelect={handlePanelSelect}
              previewImage={previewImage}
            />
          </section>

          <section id="upload">
            <UploadPreview
              selectedPanel={selectedPanel}
              onImageUpload={handleImageUpload}
              previewImage={previewImage}
              onClearImage={handleClearImage}
            />
          </section>

          <section id="gps" ref={gpsRef}>
            <GPSTracking />
          </section>

          <section id="transparency">
            <Transparency />
          </section>

          <section id="dashboard">
            <DashboardPreview />
          </section>

          <section id="faq">
            <FAQ />
          </section>

          <section id="reserve" ref={reserveRef} className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Reserve your panel today and start driving local awareness for your business
              </p>
              <button
                onClick={handleReserveClick}
                className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Reserve Your Panel Now
              </button>
            </div>
          </section>

          <Footer />
        </>
      ) : (
        <>
          <ReservationForm
            selectedPanel={selectedPanel}
            previewImage={previewImage}
            onClose={handleCloseForm}
          />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
