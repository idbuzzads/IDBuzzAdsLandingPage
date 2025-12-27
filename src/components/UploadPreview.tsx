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
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (!selectedPanel) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upload & Preview Your Artwork
            </h2>
            <p className="text-lg text-gray-600">
              Select a panel above to upload and preview your design
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upload & Preview
          </h2>
          <p className="text-xl text-gray-600">
            See your artwork on {selectedPanel.name}
          </p>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 border-2 border-sky-200">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Selected Panel:</span>
              <span className="text-sky-600 font-bold">{selectedPanel.name}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Dimensions:</span>
              <span className="text-gray-700">
                {selectedPanel.dimensions.width}" × {selectedPanel.dimensions.height}"
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Monthly Cost:</span>
              <span className="text-gray-700">${selectedPanel.monthly_cost}</span>
            </div>
          </div>

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

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Your Artwork
              </h3>
              <p className="text-gray-600 mb-6">
                Drag and drop your image here, or click to browse
              </p>

              <button
                onClick={openFileDialog}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Choose File
              </button>

              <div className="mt-6 text-sm text-gray-500">
                Supported formats: PNG, JPG, SVG
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative bg-white rounded-xl p-4 border-2 border-green-200">
                <div className="absolute top-2 right-2 flex gap-2">
                  <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    <Check className="w-4 h-4" />
                    Uploaded
                  </div>
                  <button
                    onClick={onClearImage}
                    className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
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

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <h4 className="font-semibold text-yellow-900 mb-3">Design Guidelines</h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• High resolution recommended (minimum 300 DPI)</li>
                  <li>• Maintain aspect ratio of {selectedPanel.dimensions.width}:{selectedPanel.dimensions.height}</li>
                  <li>• Use bold, readable fonts for maximum visibility</li>
                  <li>• Keep important elements away from edges</li>
                  <li>• Detailed guidelines coming soon</li>
                </ul>
              </div>

              <button
                onClick={openFileDialog}
                className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold transition-colors duration-300"
              >
                Upload Different Image
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
