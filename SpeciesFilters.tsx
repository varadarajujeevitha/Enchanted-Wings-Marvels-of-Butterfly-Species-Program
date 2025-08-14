import React from 'react';
import { Filter, Search, MapPin, Calendar, Star } from 'lucide-react';

interface FilterOptions {
  searchTerm: string;
  rarity: string;
  habitat: string;
  season: string;
  conservationStatus: string;
  sortBy: string;
}

interface SpeciesFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalResults: number;
}

const SpeciesFilters: React.FC<SpeciesFiltersProps> = ({ filters, onFiltersChange, totalResults }) => {
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      rarity: 'all',
      habitat: 'all',
      season: 'all',
      conservationStatus: 'all',
      sortBy: 'name'
    });
  };

  const hasActiveFilters = filters.searchTerm || 
    filters.rarity !== 'all' || 
    filters.habitat !== 'all' || 
    filters.season !== 'all' || 
    filters.conservationStatus !== 'all';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Species</h3>
        </div>
        <div className="text-sm text-gray-600">
          {totalResults} species found
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search species by name..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rarity Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Star className="inline h-4 w-4 mr-1" />
            Rarity
          </label>
          <select
            value={filters.rarity}
            onChange={(e) => handleFilterChange('rarity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Rarities</option>
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
          </select>
        </div>

        {/* Habitat Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Habitat
          </label>
          <select
            value={filters.habitat}
            onChange={(e) => handleFilterChange('habitat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Habitats</option>
            <option value="gardens">Gardens</option>
            <option value="forests">Forests</option>
            <option value="meadows">Meadows</option>
            <option value="wetlands">Wetlands</option>
            <option value="mountains">Mountains</option>
            <option value="tropical">Tropical</option>
          </select>
        </div>

        {/* Season Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Season
          </label>
          <select
            value={filters.season}
            onChange={(e) => handleFilterChange('season', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Seasons</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
            <option value="year-round">Year Round</option>
          </select>
        </div>

        {/* Conservation Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conservation
          </label>
          <select
            value={filters.conservationStatus}
            onChange={(e) => handleFilterChange('conservationStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="least concern">Least Concern</option>
            <option value="near threatened">Near Threatened</option>
            <option value="vulnerable">Vulnerable</option>
            <option value="endangered">Endangered</option>
          </select>
        </div>
      </div>

      {/* Sort and Clear */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="rarity">Rarity</option>
            <option value="conservation">Conservation Status</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SpeciesFilters;