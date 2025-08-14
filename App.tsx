import React, { useState } from 'react';
import { Router as Butterfly } from 'lucide-react';
import { AuthProvider, useAuth } from './components/Auth';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ClassificationResult from './components/ClassificationResult';
import SpeciesGallery from './components/SpeciesGallery';
import TrainingMetrics from './components/TrainingMetrics';
import ModelInfo from './components/ModelInfo';
import IdentificationHistory from './components/IdentificationHistory';
import SpeciesFilters from './components/SpeciesFilters';
import SpeciesResults from './components/SpeciesResults';
import SearchForm from './components/SearchForm';
import LoadingSpinner from './components/LoadingSpinner';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('classifier');
  const [classificationResult, setClassificationResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [speciesData, setSpeciesData] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    rarity: 'all',
    habitat: 'all',
    season: 'all',
    conservationStatus: 'all',
    sortBy: 'name'
  });

  // Mock species data
  const mockSpeciesData = [
    {
      name: 'MONARCH',
      scientificName: 'Danaus plexippus',
      description: 'Famous for its incredible migration journey across North America.',
      habitat: 'Gardens, fields, meadows',
      wingspan: '8.9-10.2 cm',
      color: 'Orange with black borders',
      rarity: 'common' as const,
      season: 'Spring to Fall',
      conservationStatus: 'Least Concern'
    },
    {
      name: 'BLUE MORPHO',
      scientificName: 'Morpho menelaus',
      description: 'Known for its brilliant iridescent blue wings.',
      habitat: 'Tropical rainforests',
      wingspan: '12-15 cm',
      color: 'Bright blue with black borders',
      rarity: 'uncommon' as const,
      season: 'Year Round',
      conservationStatus: 'Least Concern'
    },
    {
      name: 'PAINTED LADY',
      scientificName: 'Vanessa cardui',
      description: 'One of the most widely distributed butterflies in the world.',
      habitat: 'Gardens, fields, meadows',
      wingspan: '5-9 cm',
      color: 'Orange with black and white spots',
      rarity: 'common' as const,
      season: 'Spring to Fall',
      conservationStatus: 'Least Concern'
    }
  ];

  const handleClassification = (result) => {
    setClassificationResult(result);
    
    // Save to history if user is logged in
    if (user && result) {
      const record = {
        id: Date.now().toString(),
        species: result.predictions[0].species,
        confidence: result.predictions[0].confidence,
        timestamp: new Date().toISOString(),
        imageUrl: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg',
        verified: false
      };
      
      const existingHistory = JSON.parse(localStorage.getItem(`butterfly_history_${user.id}`) || '[]');
      const updatedHistory = [record, ...existingHistory];
      localStorage.setItem(`butterfly_history_${user.id}`, JSON.stringify(updatedHistory));
    }
  };

  const handleSearch = async (criteria: any) => {
    setSearchLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter mock data based on criteria
    let filtered = mockSpeciesData;
    if (criteria.query) {
      filtered = filtered.filter(species => 
        species.name.toLowerCase().includes(criteria.query.toLowerCase()) ||
        species.description.toLowerCase().includes(criteria.query.toLowerCase())
      );
    }
    
    setSpeciesData(filtered);
    setSearchLoading(false);
  };

  const handleImageUpload = async (file: File) => {
    // This would normally trigger the classification
    console.log('Image uploaded:', file.name);
  };

  // Filter species data based on current filters
  const filteredSpecies = speciesData.filter(species => {
    if (filters.searchTerm && !species.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.rarity !== 'all' && species.rarity !== filters.rarity) {
      return false;
    }
    if (filters.habitat !== 'all' && !species.habitat.toLowerCase().includes(filters.habitat.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'classifier' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Identify Butterfly Species
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload an image of a butterfly and our AI model will identify the species 
                from 40 different types with high accuracy using advanced deep learning.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ImageUpload onClassification={handleClassification} />
              {classificationResult && (
                <ClassificationResult result={classificationResult} />
              )}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Butterfly Species Gallery
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore and search through our comprehensive database of butterfly species.
              </p>
            </div>
            
            <SearchForm 
              onSearch={handleSearch}
              onImageUpload={handleImageUpload}
              loading={searchLoading}
            />
            
            <SpeciesFilters 
              filters={filters}
              onFiltersChange={setFilters}
              totalResults={filteredSpecies.length}
            />
            
            <SpeciesResults 
              species={filteredSpecies}
              loading={searchLoading}
            />
          </div>
        )}
        {activeTab === 'metrics' && <TrainingMetrics />}
        {activeTab === 'model' && <ModelInfo />}
        {activeTab === 'history' && user && <IdentificationHistory />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Butterfly className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">Butterfly Classifier</span>
            </div>
            <p className="text-gray-400">
              Powered by DeiT (Data-efficient image Transformers) and PyTorch
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;