import { useContext, useState } from 'react';
import { X } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

export default function LanguageModal({ isOpen, onClose }) {
  const { currentLanguage, availableLanguages, changeLanguage, t } = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  
  if (!isOpen) return null;

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };
  
  const handleApply = () => {
    changeLanguage(selectedLanguage);
    onClose();
  };
  
 

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-amber-50 dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto transition-colors duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-amber-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-amber-800 dark:text-amber-300">{t('languageModal.title')}</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X size={24} className="text-amber-800 dark:text-amber-300" />
            </button>
          </div>
          
          {/* Language Options */}
          <div className="p-4">
            <div className="space-y-2">
              {Object.entries(availableLanguages).map(([code, name]) => (
                <button
                  key={code}
                  className={`w-full text-left p-3 rounded-lg flex items-center ${
                    selectedLanguage === code 
                      ? 'bg-amber-200 dark:bg-gray-700' 
                      : 'hover:bg-amber-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleLanguageChange(code)}
                >

                  <span className={`text-lg ${
                    selectedLanguage === code
                      ? 'font-medium text-amber-800 dark:text-amber-300'
                      : 'text-amber-700 dark:text-amber-200'
                  }`}>
                    {name}
                  </span>
                  {selectedLanguage === code && (
                    <span className="ml-auto text-amber-800 dark:text-amber-300">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Footer with action buttons */}
          <div className="p-4 border-t border-amber-200 dark:border-gray-700 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-300 transition-colors"
            >
              {t('languageModal.cancel')}
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 rounded-lg text-white transition-colors"
            >
              {t('languageModal.apply')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}