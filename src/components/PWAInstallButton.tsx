import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, Share, PlusSquare, X } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'button' | 'compact' | 'sidebar' | 'banner';
  language?: 'en' | 'hi';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'button',
  language = 'en',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already running as an installed PWA, hide install prompts
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (isInstallable) {
      setIsInstalling(true);
      try {
        await install();
      } finally {
        setIsInstalling(false);
      }
    } else {
      // Browser didn't fire beforeinstallprompt yet or not eligible (e.g. desktop non-chromium or manual instructions)
      setShowIOSGuide(true);
    }
  };

  const buttonText = language === 'hi' ? 'ऐप इंस्टॉल करें' : 'Install App';
  const subText = language === 'hi' ? 'होम स्क्रीन पर जोड़ें' : 'Add to Home Screen';

  // Sidebar variant: fits nicely inside CivicSidebar
  if (variant === 'sidebar') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-[#ca4a1c]/10 to-amber-500/10 hover:from-[#ca4a1c]/20 hover:to-amber-500/20 text-[#ca4a1c] dark:text-amber-400 border border-[#ca4a1c]/20 dark:border-amber-400/20 ${className}`}
          title={buttonText}
        >
          <div className="w-6 h-6 rounded-lg bg-[#ca4a1c] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Download className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="font-extrabold truncate">{buttonText}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{subText}</div>
          </div>
        </button>

        {showIOSGuide && (
          <InstallInstructionsModal
            isIOS={isIOS}
            language={language}
            onClose={() => setShowIOSGuide(false)}
          />
        )}
      </>
    );
  }

  // Compact variant for header or toolbar
  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          className={`px-3 py-1.5 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer ${className}`}
          title={buttonText}
        >
          <Download className="w-3.5 h-3.5" />
          <span>{buttonText}</span>
        </button>

        {showIOSGuide && (
          <InstallInstructionsModal
            isIOS={isIOS}
            language={language}
            onClose={() => setShowIOSGuide(false)}
          />
        )}
      </>
    );
  }

  // Banner variant for home screen notice
  if (variant === 'banner') {
    return (
      <>
        <div
          className={`p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-200/80 dark:border-orange-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ca4a1c] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                {language === 'hi' ? 'DTC दिल्ली बस ट्रैकर मोबाइल ऐप' : 'Install DTC Bus Tracker PWA'}
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                {language === 'hi'
                  ? 'तेज़ ट्रैकिंग और ऑफ़लाइन उपयोग के लिए होम स्क्रीन पर जोड़ें।'
                  : 'Fast GPS tracking and offline routes directly on your phone.'}
              </p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            disabled={isInstalling}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] text-white text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{buttonText}</span>
          </button>
        </div>

        {showIOSGuide && (
          <InstallInstructionsModal
            isIOS={isIOS}
            language={language}
            onClose={() => setShowIOSGuide(false)}
          />
        )}
      </>
    );
  }

  // Default button variant
  return (
    <>
      <button
        onClick={handleInstallClick}
        disabled={isInstalling}
        className={`flex items-center gap-2 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] px-3.5 py-2 text-xs font-extrabold text-white shadow-sm transition cursor-pointer ${className}`}
      >
        <Download className="w-4 h-4" />
        <span>{buttonText}</span>
      </button>

      {showIOSGuide && (
        <InstallInstructionsModal
          isIOS={isIOS}
          language={language}
          onClose={() => setShowIOSGuide(false)}
        />
      )}
    </>
  );
};

interface InstallInstructionsModalProps {
  isIOS: boolean;
  language: 'en' | 'hi';
  onClose: () => void;
}

const InstallInstructionsModal: React.FC<InstallInstructionsModalProps> = ({
  isIOS,
  language,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#121a27] p-5 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ca4a1c] text-white flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black">
                {language === 'hi' ? 'ऐप कैसे इंस्टॉल करें' : 'Install on Mobile'}
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {language === 'hi' ? 'प्रोग्रेसिव वेब ऐप (PWA)' : 'Progressive Web App (PWA)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-3.5 text-xs">
          {isIOS ? (
            <>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#ca4a1c] font-black flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <p className="font-bold">
                    {language === 'hi'
                      ? 'Safari में शेयर (Share) बटन दबाएं'
                      : 'Tap the Share icon in Safari'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <Share className="w-3.5 h-3.5 inline text-[#ca4a1c]" /> Bottom bar in iPhone Safari
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#ca4a1c] font-black flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <p className="font-bold">
                    {language === 'hi'
                      ? 'नीचे स्क्रॉल करें और "Add to Home Screen" चुनें'
                      : 'Scroll down and tap "Add to Home Screen"'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <PlusSquare className="w-3.5 h-3.5 inline text-[#006d42]" /> Add to Home Screen / होम स्क्रीन में जोड़ें
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#ca4a1c] font-black flex items-center justify-center shrink-0 text-xs">
                  3
                </div>
                <div>
                  <p className="font-bold">
                    {language === 'hi' ? 'ऊपर दाईं ओर "Add" दबाएं' : 'Tap "Add" in top-right corner'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'hi'
                      ? 'ऐप आपके होम स्क्रीन पर सीधे उपलब्ध हो जाएगी।'
                      : 'The DTC Bus Tracker icon will appear on your Home Screen.'}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#ca4a1c] font-black flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <p className="font-bold">
                    {language === 'hi' ? 'ब्राउज़र मेनू (तीन डॉट्स ⋮) खोलें' : 'Open browser menu (⋮)'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    In Chrome, Edge, or Samsung Internet
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#ca4a1c] font-black flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <p className="font-bold">
                    {language === 'hi'
                      ? '"ऐप इंस्टॉल करें" या "होम स्क्रीन पर जोड़ें" चुनें'
                      : 'Select "Install app" or "Add to Home Screen"'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-extrabold text-xs cursor-pointer transition text-slate-700 dark:text-slate-200"
        >
          {language === 'hi' ? 'समझ गए / बंद करें' : 'Got it / Close'}
        </button>
      </div>
    </div>
  );
};
