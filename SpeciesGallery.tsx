import React, { useState } from 'react';
import { Search, Filter, Router as Butterfly } from 'lucide-react';

const butterflyData = [
  {
    name: 'MONARCH',
    scientificName: 'Danaus plexippus',
    description: 'Famous for its incredible migration journey across North America.',
    habitat: 'Gardens, fields, meadows',
    wingspan: '8.9-10.2 cm',
    color: 'Orange with black borders',
  },
  {
    name: 'BLUE MORPHO',
    scientificName: 'Morpho menelaus',
    description: 'Known for its brilliant iridescent blue wings.',
    habitat: 'Tropical rainforests',
    wingspan: '12-15 cm',
    color: 'Bright blue with black borders',
  },
  {
    name: 'PAINTED LADY',
    scientificName: 'Vanessa cardui',
    description: 'One of the most widely distributed butterflies in the world.',
    habitat: 'Gardens, fields, meadows',
    wingspan: '5-9 cm',
    color: 'Orange with black and white spots',
  },
  {
    name: 'PEACOCK',
    scientificName: 'Aglais io',
    description: 'Distinctive eyespots on wings that resemble peacock feathers.',
    habitat: 'Gardens, parks, woodland edges',
    wingspan: '6.3-6.9 cm',
    color: 'Dark red with prominent eyespots',
  },
  {
    name: 'RED ADMIRAL',
    scientificName: 'Vanessa atalanta',
    description: 'Fast-flying butterfly known for its territorial behavior.',
    habitat: 'Gardens, parks, woodland',
    wingspan: '5.1-6.4 cm',
    color: 'Black with red bands and white spots',
  },
  {
    name: 'CABBAGE WHITE',
    scientificName: 'Pieris rapae',
    description: 'Common garden butterfly, sometimes considered a pest.',
    habitat: 'Gardens, farmland, open areas',
    wingspan: '4.6-6.5 cm',
    color: 'White with black spots',
  },
];

const SpeciesGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredSpecies = butterflyData.filter(species =>
    species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    species.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Butterfly Species Gallery
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the 40 butterfly species our AI model can identify, each with unique 
          characteristics and fascinating behaviors.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search species..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Species</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="tropical">Tropical</option>
          </select>
        </div>
      </div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecies.map((species, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-32 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4">
                <Butterfly className="h-8 w-8 text-white/80" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white">{species.name}</h3>
                <p className="text-white/80 text-sm italic">{species.scientificName}</p>
              </div>
            </div>
            
            <div className="p-6 space-y-3">
              <p className="text-gray-600">{species.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Habitat:</span>
                  <span className="text-gray-600">{species.habitat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Wingspan:</span>
                  <span className="text-gray-600">{species.wingspan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Color:</span>
                  <span className="text-gray-600">{species.color}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSpecies.length === 0 && (
        <div className="text-center py-12">
          <Butterfly className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">No species found</p>
          <p className="text-gray-400">Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default SpeciesGallery;