import { useState, useRef } from 'react';
import { Upload, X, Check } from 'lucide-react';
import { Panel } from '../lib/supabase';

interface UploadPreviewProps {
  selectedPanel: Panel | null;
  onImageUpload: (imageUrl: string) => void;
  previewImage: string | null;
  onClearImage: () => void;
}

export default function UploadPreview({
  selectedPanel,
  onImageUpload,
  previewImage,
  onClearImage,
}: UploadPreviewProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* ===============================
          UPLOAD & PREVIEW HEADER
          (Below van image, above 3D + points)
      ================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-gray-400" />
          </div>

          <p className="text-lg text-gray-600">
            Explore the van in 3D, select a panel, and preview your artwork in real time
          </p>
        </div>
      </section>

      {/* ===============================
          UPLOAD UI (only after panel select)
      ================================ */}
      {selectedPanel && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Upload & Preview
              </h3>
              <p className="text-xl text-gray-600">
                See your artwork on {selectedPanel.name}
              </p>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 border-2 border-sky-200">
              {/* Panel Details */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Selected Panel:</span>
                  <span className="text-sky-600 font-bold">
                    {selectedPanel.name}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Dimensions:</span>
                  <span className="text-gray-700">
                    {selectedPanel.dimensions.width}" ×{' '}
                    {selectedPanel.dimensions.height}"
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Monthly Cost:</span>
                  <span className="text-gray-700">
                    ${selectedPanel.monthly_cost}
                  </span>
                </div>
              </div>

              {/* Upload Area */}
              {!previewImage ? (
                <div
                  className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-sky-500 bg-sky-100'
                      : 'border-gray-300 bg-white hover:border-sky-400 hover:bg-sky-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />

                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-sky-600" />
                  </div>

                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Upload Your Artwork
                  </h4>

                  <p className="text-gray-600 mb-6">
                    Drag and drop your image here, or click to browse
                  </p>

                  <button
                    onClick={openFileDialog}
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Choose File
                  </button>

                  <div className="mt-6 text-sm text-gray-500">
                    Supported formats: PNG, JPG, SVG
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Preview */}
                  <div className="relative bg-white rounded-xl p-4 border-2 border-green-200">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <Check className="w-4 h-4" />
                        Uploaded
                      </div>
                      <button
                        onClick={onClearImage}
                        className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-center p-8">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-w-full max-h-64 rounded-lg shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Guidelines */}
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                    <h5 className="font-semibold text-yellow-900 mb-3">
                      Design Guidelines
                    </h5>
                    <ul className="space-y-2 text-sm text-yellow-800">
                      <li>• High resolution recommended (minimum 300 DPI)</li>
                      <li>
                        • Maintain aspect ratio of{' '}
                        {selectedPanel.dimensions.width}:
                        {selectedPanel.dimensions.height}
                      </li>
                      <li>• Use bold, readable fonts</li>
                      <li>• Keep key elements away from edges</li>
                    </ul>
                  </div>

                  <button
                    onClick={openFileDialog}
                    className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-colors"
                  >
                    Upload Different Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
