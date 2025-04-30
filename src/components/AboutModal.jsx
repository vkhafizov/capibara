import { useContext } from 'react';
import { X } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

export default function AboutModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);
  
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
        <div className="bg-amber-50 dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto transition-colors duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-amber-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-amber-800 dark:text-amber-300">{t('aboutModal.title')}</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X size={24} className="text-amber-800 dark:text-amber-300" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">{t('aboutModal.whatIs')}</h3>
              <p className="text-amber-700 dark:text-amber-200">
                {t('aboutModal.description')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">{t('aboutModal.howTo')}</h3>
              <ul className="list-disc pl-5 text-amber-700 dark:text-amber-200 space-y-2">
                <li><strong>{t('actions.feed')}</strong> {t('aboutModal.feedDesc')}</li>
                <li><strong>{t('actions.play')}</strong> {t('aboutModal.playDesc')}</li>
                <li><strong>{t('actions.water')}</strong> {t('aboutModal.waterDesc')}</li>
                <li><strong>{t('actions.sleep')}</strong> {t('aboutModal.sleepDesc')}</li>
              </ul>
              <p className="mt-2 text-amber-700 dark:text-amber-200">
                {t('aboutModal.warning')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">{t('aboutModal.funFacts')}</h3>
              <ul className="list-disc pl-5 text-amber-700 dark:text-amber-200 space-y-1">
                <li>{t('aboutModal.fact1')}</li>
                <li>{t('aboutModal.fact2')}</li>
                <li>{t('aboutModal.fact3')}</li>
                <li>{t('aboutModal.fact4')}</li>
                <li>{t('aboutModal.fact5')}</li>
              </ul>
            </div>
            
            <div className="pt-2 border-t border-amber-200 dark:border-gray-700">
              <p className="text-center text-sm text-amber-600 dark:text-amber-400">
                Version 1.0.0 • {t('aboutModal.footer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}