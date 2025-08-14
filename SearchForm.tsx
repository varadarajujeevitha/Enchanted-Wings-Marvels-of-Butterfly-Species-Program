import React, { useState } from 'react';
import { Search, Camera, Upload, MapPin, Calendar } from 'lucide-react';

interface SearchCriteria {
  query: string;
  location: string;
  season: string;
  habitat: string;
  imageSearch: boolean;
}

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  onImageUpload: (file: File) => void;
  loading?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onImageUpload, loading = false }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    query: '',
    location: '',
    season: 'all',
    habitat: 'all',
    imageSearch: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(criteria);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      setCriteria({ ...criteria, imageSearch: true });
    }
  };

  const handleInputChange = (key: keyof SearchCriteria, value: string | boolean) => {
    setCriteria({ ...criteria, [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Search Butterflies</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Mode Toggle */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="searchMode"
              checked={!criteria.imageSearch}
              onChange={() => handleInputChange('imageSearch', false)}
              className="text-blue-500 focus:ring-blue-500"
            />
            <Search className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Text Search</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="searchMode"
              checked={criteria.imageSearch}
              onChange={() => handleInputChange('imageSearch', true)}
              className="text-blue-500 focus:ring-blue-500"
            />
            <Camera className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Image Search</span>
          </label>
        </div>

        {/* Text Search */}
        {!criteria.imageSearch && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by name or characteristics
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={criteria.query}
                onChange={(e) => handleInputChange('query', e.target.value)}
                placeholder="e.g., Monarch, blue wings, large butterfly..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Image Upload */}
        {criteria.imageSearch && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload butterfly image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Choose Image
              </label>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Location
            </label>
            <input
              type="text"
              value={criteria.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State, or Region"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Season
            </label>
            <select
              value={criteria.season}
              onChange={(e) => handleInputChange('season', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Seasons</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Habitat
            </label>
            <select
              value={criteria.habitat}
              onChange={(e) => handleInputChange('habitat', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Habitats</option>
              <option value="gardens">Gardens</option>
              <option value="forests">Forests</option>
              <option value="meadows">Meadows</option>
              <option value="wetlands">Wetlands</option>
              <option value="mountains">Mountains</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading || (!criteria.query && !criteria.imageSearch)}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              {criteria.imageSearch ? 'Identify Butterfly' : 'Search Species'}
            </>
          )}
        </button>
      </form>

      {/* Quick Search Suggestions */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-3">Popular searches:</p>
        <div className="flex flex-wrap gap-2">
          {['Monarch', 'Blue Morpho', 'Painted Lady', 'Swallowtail', 'Orange wings'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleInputChange('query', suggestion)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;