import { X } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-amber-50 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-amber-200">
            <h2 className="text-xl font-bold text-amber-800">About Capy-gotchi</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-amber-200 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">What is Capy-gotchi?</h3>
              <p className="text-amber-700">
                Capy-gotchi is a virtual pet game where you care for your own capybara!
                Keep your pet happy and healthy by monitoring and maintaining its vital stats.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">How to Play</h3>
              <ul className="list-disc pl-5 text-amber-700 space-y-2">
                <li><strong>Feed</strong> your capybara to maintain hunger levels</li>
                <li><strong>Play</strong> with your pet to keep happiness high</li>
                <li><strong>Water</strong> your pet to prevent dehydration</li>
                <li><strong>Sleep</strong> toggle to restore energy</li>
              </ul>
              <p className="mt-2 text-amber-700">
                If any stat reaches zero, your capybara will pass away and you'll need to start over.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Capybara Fun Facts</h3>
              <ul className="list-disc pl-5 text-amber-700 space-y-1">
                <li>Capybaras are the largest rodents in the world</li>
                <li>They're semi-aquatic and excellent swimmers</li>
                <li>Capybaras are highly social animals</li>
                <li>They can sleep in water with just their noses above the surface</li>
                <li>They're known for being friendly with other animals</li>
              </ul>
            </div>
            
            <div className="pt-2 border-t border-amber-200">
              <p className="text-center text-sm text-amber-600">
                Version 1.0.0 • Created with ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}