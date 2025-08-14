import React, { useState, useEffect } from 'react';
import { Calendar, Camera, MapPin, Star, Filter, Download, Trash2 } from 'lucide-react';
import { useAuth } from './Auth';

interface IdentificationRecord {
  id: string;
  species: string;
  confidence: number;
  timestamp: string;
  location?: string;
  imageUrl: string;
  notes?: string;
  verified: boolean;
}

const IdentificationHistory: React.FC = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<IdentificationRecord[]>([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    // Load identification history from localStorage
    const savedRecords = localStorage.getItem(`butterfly_history_${user?.id}`);
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    } else {
      // Mock data for demonstration
      const mockRecords: IdentificationRecord[] = [
        {
          id: '1',
          species: 'MONARCH',
          confidence: 94.2,
          timestamp: '2025-01-15T10:30:00Z',
          location: 'Central Park, NY',
          imageUrl: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg',
          notes: 'Beautiful specimen spotted during morning walk',
          verified: true
        },
        {
          id: '2',
          species: 'BLUE MORPHO',
          confidence: 87.6,
          timestamp: '2025-01-14T15:45:00Z',
          location: 'Butterfly Garden',
          imageUrl: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
          verified: false
        },
        {
          id: '3',
          species: 'PAINTED LADY',
          confidence: 91.8,
          timestamp: '2025-01-13T09:15:00Z',
          location: 'Backyard Garden',
          imageUrl: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
          verified: true
        }
      ];
      setRecords(mockRecords);
      localStorage.setItem(`butterfly_history_${user?.id}`, JSON.stringify(mockRecords));
    }
  }, [user?.id]);

  const filteredRecords = records.filter(record => {
    if (filter === 'verified') return record.verified;
    if (filter === 'unverified') return !record.verified;
    return true;
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    if (sortBy === 'confidence') {
      return b.confidence - a.confidence;
    }
    if (sortBy === 'species') {
      return a.species.localeCompare(b.species);
    }
    return 0;
  });

  const deleteRecord = (id: string) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
    localStorage.setItem(`butterfly_history_${user?.id}`, JSON.stringify(updatedRecords));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(records, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'butterfly_identifications.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Identification History</h2>
          <p className="text-gray-600">Track your butterfly discoveries and observations</p>
        </div>
        
        <button
          onClick={exportData}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Records</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Date</option>
              <option value="confidence">Confidence</option>
              <option value="species">Species</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{records.length}</div>
          <div className="text-sm text-gray-600">Total Identifications</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {new Set(records.map(r => r.species)).size}
          </div>
          <div className="text-sm text-gray-600">Unique Species</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {records.filter(r => r.verified).length}
          </div>
          <div className="text-sm text-gray-600">Verified</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-600">
            {records.length > 0 ? Math.round(records.reduce((sum, r) => sum + r.confidence, 0) / records.length) : 0}%
          </div>
          <div className="text-sm text-gray-600">Avg Confidence</div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {sortedRecords.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Camera className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No identifications yet</h3>
            <p className="text-gray-600">Start identifying butterflies to build your history!</p>
          </div>
        ) : (
          sortedRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={record.imageUrl}
                    alt={record.species}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {record.species}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(record.timestamp)}</span>
                        </div>
                        {record.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{record.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(record.confidence)}`}>
                        {record.confidence.toFixed(1)}%
                      </span>
                      {record.verified && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-xs">Verified</span>
                        </div>
                      )}
                      <button
                        onClick={() => deleteRecord(record.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete record"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {record.notes && (
                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                      {record.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IdentificationHistory;