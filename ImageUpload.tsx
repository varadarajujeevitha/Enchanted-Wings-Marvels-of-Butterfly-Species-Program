import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

const butterflySpecies = [
  'ADONIS', 'APOLLO', 'ATLAS MOTH', 'BANDED ORANGE HELICONIAN', 'BLACK HAIRSTREAK',
  'BLUE MORPHO', 'CABBAGE WHITE', 'CAIRNS BIRDWING', 'CHECKERSPOT', 'CLODIUS PARNASSIUS',
  'COMMON BANDED AWL', 'COMMON WOOD-NYMPH', 'COPPER TAIL', 'CRECENT', 'CRIMSON PATCH',
  'DANAID EGGFLY', 'EASTERN COMA', 'EMPEROR', 'GOLDEN BIRDWING', 'GREAT EGGFLY',
  'GREY HAIRSTREAK', 'INDRA SWALLOW', 'ITHOMIA', 'JULIA', 'LARGE MARBLE',
  'MALACHITE', 'MANGROVE SKIPPER', 'METALMARK', 'MONARCH', 'MOURNING CLOAK',
  'ORANGE OAKLEAF', 'ORANGE TIP', 'ORCHARD SWALLOW', 'PAINTED LADY', 'PAPER KITE',
  'PEACOCK', 'PINE WHITE', 'PURPLE HAIRSTREAK', 'QUESTION MARK', 'RED ADMIRAL'
];

interface ImageUploadProps {
  onClassification: (result: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onClassification }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
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
        setUploadedImage(e.target?.result as string);
        simulateClassification();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateClassification = () => {
    setIsClassifying(true);
    // Simulate AI processing time
    setTimeout(() => {
      const randomSpecies = butterflySpecies[Math.floor(Math.random() * butterflySpecies.length)];
      const confidence = (Math.random() * 0.3 + 0.7) * 100; // 70-100% confidence
      
      // Generate top 3 predictions
      const shuffled = [...butterflySpecies].sort(() => 0.5 - Math.random());
      const predictions = [
        { species: randomSpecies, confidence: confidence },
        { species: shuffled[0], confidence: confidence * 0.7 },
        { species: shuffled[1], confidence: confidence * 0.5 }
      ];

      onClassification({
        predictions,
        processingTime: Math.random() * 2 + 1, // 1-3 seconds
      });
      setIsClassifying(false);
    }, 2000);
  };

  const clearImage = () => {
    setUploadedImage(null);
    setIsClassifying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <ImageIcon className="h-5 w-5 mr-2 text-blue-500" />
        Upload Butterfly Image
      </h3>

      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drop your butterfly image here
          </p>
          <p className="text-gray-500 mb-6">or click to browse files</p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Choose File
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded butterfly"
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {isClassifying && (
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Loader2 className="h-6 w-6 text-blue-500 animate-spin mx-auto mb-2" />
              <p className="text-blue-700 font-medium">Analyzing butterfly species...</p>
              <p className="text-blue-600 text-sm mt-1">Using DeiT neural network</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;