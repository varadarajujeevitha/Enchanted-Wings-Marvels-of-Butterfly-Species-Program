import React, { useState } from 'react';
import { Grid, List, Eye, BookOpen, MapPin } from 'lucide-react';
import SpeciesCard from './SpeciesCard';

interface Species {
  name: string;
  scientificName: string;
  description: string;
  habitat: string;
  wingspan: string;
  color: string;
  rarity: 'common' | 'uncommon' | 'rare';
  season: string;
  conservationStatus: string;
  imageUrl?: string;
  detailedInfo?: {
    lifecycle: string;
    diet: string;
    behavior: string;
    distribution: string;
    threats: string[];
    funFacts: string[];
  };
}

interface SpeciesResultsProps {
  species: Species[];
  loading?: boolean;
}

const SpeciesResults: React.FC<SpeciesResultsProps> = ({ species, loading = false }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  const handleLearnMore = (species: Species) => {
    setSelectedSpecies(species);
  };

  const closeModal = () => {
    setSelectedSpecies(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gray-200 h-32 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with view toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {species.length} Species Found
        </h2>
        
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Results */}
      {species.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🦋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No species found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {species.map((species, index) => (
            viewMode === 'grid' ? (
              <SpeciesCard 
                key={index} 
                species={species} 
                onLearnMore={handleLearnMore}
              />
            ) : (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex-shrink-0"></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{species.name}</h3>
                        <p className="text-sm text-gray-600 italic">{species.scientificName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        species.rarity === 'common' ? 'text-green-600 bg-green-100' :
                        species.rarity === 'uncommon' ? 'text-yellow-600 bg-yellow-100' :
                        'text-red-600 bg-red-100'
                      }`}>
                        {species.rarity}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{species.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Wingspan: {species.wingspan}</span>
                      <span>•</span>
                      <span>{species.habitat}</span>
                      <span>•</span>
                      <span>{species.season}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLearnMore(species)}
                    className="text-blue-600 hover:text-blue-700 p-2"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Species Detail Modal */}
      {selectedSpecies && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedSpecies.name}</h2>
                  <p className="text-lg text-gray-600 italic">{selectedSpecies.scientificName}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-64 rounded-xl"></div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Wingspan:</span>
                        <p className="text-gray-600">{selectedSpecies.wingspan}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Colors:</span>
                        <p className="text-gray-600">{selectedSpecies.color}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Season:</span>
                        <p className="text-gray-600">{selectedSpecies.season}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Rarity:</span>
                        <p className="text-gray-600 capitalize">{selectedSpecies.rarity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-3">
                      <MapPin className="h-5 w-5 mr-2 text-green-500" />
                      Habitat & Distribution
                    </h3>
                    <p className="text-gray-600">{selectedSpecies.description}</p>
                    <p className="text-gray-600 mt-2">
                      <strong>Preferred Habitat:</strong> {selectedSpecies.habitat}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Conservation Status</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedSpecies.conservationStatus === 'Least Concern' ? 'text-green-600 bg-green-100' :
                      selectedSpecies.conservationStatus === 'Near Threatened' ? 'text-yellow-600 bg-yellow-100' :
                      selectedSpecies.conservationStatus === 'Vulnerable' ? 'text-orange-600 bg-orange-100' :
                      'text-red-600 bg-red-100'
                    }`}>
                      {selectedSpecies.conservationStatus}
                    </span>
                  </div>

                  {selectedSpecies.detailedInfo?.funFacts && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Fun Facts</h3>
                      <ul className="space-y-2">
                        {selectedSpecies.detailedInfo.funFacts.map((fact, index) => (
                          <li key={index} className="text-gray-600 text-sm flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeciesResults;