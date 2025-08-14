import React from 'react';
import { Brain, Layers, Zap, Shield, Database, Cpu } from 'lucide-react';

const ModelInfo: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Vision Transformer Architecture',
      description: 'Uses the state-of-the-art DeiT (Data-efficient image Transformers) model with self-attention mechanisms.',
      color: 'text-purple-600 bg-purple-100',
    },
    {
      icon: Layers,
      title: 'Transfer Learning',
      description: 'Fine-tuned from ImageNet pre-trained weights, enabling excellent performance with limited butterfly data.',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Achieves 92.4% accuracy on 40 butterfly species with optimized inference speed.',
      color: 'text-yellow-600 bg-yellow-100',
    },
    {
      icon: Shield,
      title: 'Robust Predictions',
      description: 'Label smoothing and dropout regularization prevent overfitting and improve generalization.',
      color: 'text-green-600 bg-green-100',
    },
  ];

  const specs = [
    { label: 'Model Size', value: '22M parameters', icon: Database },
    { label: 'Input Resolution', value: '224×224 pixels', icon: Layers },
    { label: 'Processing Speed', value: '~2 seconds', icon: Zap },
    { label: 'Hardware', value: 'GPU Optimized', icon: Cpu },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Model Architecture
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our butterfly classifier uses advanced deep learning techniques based on 
          Vision Transformers for accurate species identification.
        </p>
      </div>

      {/* Model Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Technical Specifications */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Technical Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-md mb-3">
                  <Icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{spec.value}</p>
                </div>
                <p className="text-gray-700 font-medium">{spec.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Model Pipeline
        </h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-6">
          {[
            { step: 'Input Image', desc: '224×224 RGB', color: 'bg-blue-500' },
            { step: 'Patch Embedding', desc: '16×16 patches', color: 'bg-purple-500' },
            { step: 'Transformer', desc: '12 layers', color: 'bg-green-500' },
            { step: 'Classification', desc: '40 species', color: 'bg-orange-500' },
          ].map((stage, index) => (
            <React.Fragment key={index}>
              <div className="text-center">
                <div className={`w-20 h-20 ${stage.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h4 className="font-semibold text-gray-900">{stage.step}</h4>
                <p className="text-sm text-gray-600">{stage.desc}</p>
              </div>
              {index < 3 && (
                <div className="hidden lg:block">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Model Benefits */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why DeiT?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Data Efficient</h4>
            <p className="text-gray-600 text-sm">Requires less training data than traditional CNNs while maintaining high accuracy.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Self-Attention</h4>
            <p className="text-gray-600 text-sm">Captures long-range dependencies in images better than convolutional approaches.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Robust</h4>
            <p className="text-gray-600 text-sm">Advanced regularization techniques prevent overfitting and improve real-world performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelInfo;