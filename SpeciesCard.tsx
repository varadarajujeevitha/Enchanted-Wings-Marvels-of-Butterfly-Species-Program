import React from 'react';
import { MapPin, Calendar, Info, Star } from 'lucide-react';

interface SpeciesCardProps {
  species: {
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
  };
  onLearnMore?: (species: any) => void;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species, onLearnMore }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-green-600 bg-green-100';
      case 'uncommon': return 'text-yellow-600 bg-yellow-100';
      case 'rare': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConservationColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'least concern': return 'text-green-600';
      case 'near threatened': return 'text-yellow-600';
      case 'vulnerable': return 'text-orange-600';
      case 'endangered': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-32 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(species.rarity)}`}>
            {species.rarity}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{species.name}</h3>
          <p className="text-white/80 text-sm italic">{species.scientificName}</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        <p className="text-gray-600 text-sm leading-relaxed">{species.description}</p>
        
        {/* Key Information */}
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Habitat</span>
              <p className="text-sm text-gray-700">{species.habitat}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Calendar className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Season</span>
              <p className="text-sm text-gray-700">{species.season}</p>
            </div>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Wingspan</span>
            <p className="text-sm font-medium text-gray-900">{species.wingspan}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Colors</span>
            <p className="text-sm font-medium text-gray-900">{species.color}</p>
          </div>
        </div>

        {/* Conservation Status */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">Conservation:</span>
            <span className={`text-xs font-medium ${getConservationColor(species.conservationStatus)}`}>
              {species.conservationStatus}
            </span>
          </div>
          
          {onLearnMore && (
            <button
              onClick={() => onLearnMore(species)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              <Info className="h-4 w-4" />
              <span>Learn More</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeciesCard;