import React from 'react';
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface Prediction {
  species: string;
  confidence: number;
}

interface ClassificationResultProps {
  result: {
    predictions: Prediction[];
    processingTime: number;
  };
}

const ClassificationResult: React.FC<ClassificationResultProps> = ({ result }) => {
  const { predictions, processingTime } = result;
  const topPrediction = predictions[0];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
      <div className="flex items-center mb-6">
        <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Classification Results</h3>
      </div>

      {/* Top Prediction */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-2xl font-bold text-gray-900">{topPrediction.species}</h4>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getConfidenceColor(topPrediction.confidence)}`}>
            {topPrediction.confidence.toFixed(1)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${getConfidenceBarColor(topPrediction.confidence)}`}
            style={{ width: `${topPrediction.confidence}%` }}
          ></div>
        </div>
        
        <p className="text-gray-600">
          Most likely species with <strong>{topPrediction.confidence.toFixed(1)}%</strong> confidence
        </p>
      </div>

      {/* Alternative Predictions */}
      <div className="space-y-3 mb-6">
        <h5 className="text-lg font-semibold text-gray-800 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
          Alternative Predictions
        </h5>
        
        {predictions.slice(1).map((prediction, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">{prediction.species}</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${prediction.confidence}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600 w-12">
                {prediction.confidence.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Processing Info */}
      <div className="flex items-center justify-center text-gray-500 text-sm bg-gray-50 rounded-lg p-3">
        <Clock className="h-4 w-4 mr-2" />
        Processed in {processingTime.toFixed(2)} seconds
      </div>
    </div>
  );
};

export default ClassificationResult;