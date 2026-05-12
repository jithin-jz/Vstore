import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const hasSeenPrompt = sessionStorage.getItem("pwa_prompt_seen");
      if (!hasSeenPrompt) setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
    sessionStorage.setItem("pwa_prompt_seen", "true");
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("pwa_prompt_seen", "true");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[100] sm:bottom-8 sm:left-auto sm:right-8 sm:w-96">
      <div className="card-light overflow-hidden p-6 shadow-[0_8px_24px_rgba(0,55,112,0.08),0_2px_6px_rgba(0,55,112,0.04)]">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-primary-subdued text-primary-deep">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[18px] leading-[1.3] text-ink" style={{ fontWeight: 300, letterSpacing: "-0.01em" }}>
              Install the Store app
            </h3>
            <p className="caption mt-1.5 text-ink-mute">
              Faster launches, offline-ready catalog, and direct access to premium assets.
            </p>
          </div>
        </div>
        <div className="mt-5 flex gap-2.5">
          <button onClick={handleInstall} className="btn-pill flex-1 text-[14px] py-2.5">
            Install
          </button>
          <button onClick={handleDismiss} className="btn-pill-secondary flex-1 text-[14px] py-2.5">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
