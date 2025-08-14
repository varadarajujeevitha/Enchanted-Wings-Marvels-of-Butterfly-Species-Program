import React, { useState } from 'react';
import { BarChart3, TrendingUp, Target, Clock } from 'lucide-react';

const TrainingMetrics: React.FC = () => {
  const [activeChart, setActiveChart] = useState('accuracy');

  // Simulated training data
  const epochs = Array.from({ length: 30 }, (_, i) => i + 1);
  const trainAccuracy = epochs.map(e => Math.min(0.95, 0.3 + (e * 0.022) + Math.random() * 0.05));
  const valAccuracy = epochs.map(e => Math.min(0.92, 0.25 + (e * 0.020) + Math.random() * 0.04));
  const trainLoss = epochs.map(e => Math.max(0.05, 2.5 - (e * 0.08) + Math.random() * 0.1));
  const valLoss = epochs.map(e => Math.max(0.08, 2.3 - (e * 0.075) + Math.random() * 0.12));

  const metrics = [
    { label: 'Final Accuracy', value: '92.4%', icon: Target, color: 'text-green-600' },
    { label: 'Training Time', value: '847s', icon: Clock, color: 'text-blue-600' },
    { label: 'F1 Score', value: '0.918', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Precision', value: '91.2%', icon: BarChart3, color: 'text-orange-600' },
  ];

  const renderChart = (data: number[], label: string, color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">{label}</h4>
        <div className="h-64 flex items-end space-x-1">
          {data.map((value, index) => {
            const height = ((value - min) / (max - min)) * 100;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className={`w-full ${color} rounded-t transition-all duration-300 hover:opacity-80`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`Epoch ${index + 1}: ${value.toFixed(3)}`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Epoch 1</span>
          <span>Epoch 30</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Training Metrics
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Performance metrics from training the DeiT model on 40 butterfly species 
          over 30 epochs with advanced optimization techniques.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-8 w-8 ${metric.color}`} />
                <span className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </span>
              </div>
              <p className="text-gray-600 font-medium">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart Selection */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActiveChart('accuracy')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeChart === 'accuracy'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Accuracy
        </button>
        <button
          onClick={() => setActiveChart('loss')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeChart === 'loss'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Loss
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeChart === 'accuracy' ? (
          <>
            {renderChart(trainAccuracy, 'Training Accuracy', 'bg-green-500')}
            {renderChart(valAccuracy, 'Validation Accuracy', 'bg-blue-500')}
          </>
        ) : (
          <>
            {renderChart(trainLoss, 'Training Loss', 'bg-red-500')}
            {renderChart(valLoss, 'Validation Loss', 'bg-orange-500')}
          </>
        )}
      </div>

      {/* Training Details */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Training Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Model Architecture</h4>
            <p className="text-gray-600">DeiT Tiny Patch16 224</p>
            <p className="text-sm text-gray-500">Pre-trained on ImageNet</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Optimizer</h4>
            <p className="text-gray-600">RAdam</p>
            <p className="text-sm text-gray-500">LR: 1e-3, Weight Decay: 1e-6</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Scheduler</h4>
            <p className="text-gray-600">CosineAnnealingLR</p>
            <p className="text-sm text-gray-500">T_max: 30 epochs</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Loss Function</h4>
            <p className="text-gray-600">Label Smoothing CrossEntropy</p>
            <p className="text-sm text-gray-500">Smoothing: 0.1</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Batch Size</h4>
            <p className="text-gray-600">32</p>
            <p className="text-sm text-gray-500">4 workers for data loading</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Data Augmentation</h4>
            <p className="text-gray-600">Random Crop & Flip</p>
            <p className="text-sm text-gray-500">ImageNet normalization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingMetrics;