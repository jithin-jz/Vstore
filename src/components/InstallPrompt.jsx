import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Show our custom prompt if it hasn't been shown in this session
      const hasSeenPrompt = sessionStorage.getItem('pwa_prompt_seen');
      if (!hasSeenPrompt) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install');
    } else {
      console.log('User dismissed the PWA install');
    }

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_seen', 'true');
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_seen', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[100] sm:bottom-8 sm:left-auto sm:right-8 sm:w-96">
      <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-lg">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900">Install Store App</h3>
            <p className="mt-1 text-sm text-gray-500 leading-relaxed">
              Install our app for a faster, better experience and direct access to premium assets.
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleInstall}
            className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-bold text-white transition-all hover:bg-black active:scale-95"
          >
            Install Now
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-bold text-gray-900 transition-all hover:bg-gray-200 active:scale-95"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}
