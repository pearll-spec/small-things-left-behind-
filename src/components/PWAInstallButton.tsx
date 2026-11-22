import React, { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return (
      <p className="text-xs text-[#F6F2EA]/55 italic">
        Installed as a standalone keepsake app on this device.
      </p>
    );
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="w-full flex items-center justify-center gap-2 border border-[#E59D35]/50 bg-[#E59D35]/10 px-4 py-2.5 text-sm text-[#F6F2EA] hover:bg-[#E59D35]/20 transition-colors cursor-pointer whitespace-nowrap"
      >
        <Download className="w-4 h-4 text-[#E59D35]" />
        <span>Install App to Device</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="w-full flex items-center justify-center gap-2 border border-[#E59D35]/45 bg-[#E59D35]/10 px-4 py-2.5 text-sm text-[#F6F2EA] hover:bg-[#E59D35]/20 transition-colors cursor-pointer whitespace-nowrap"
        >
          <Share className="w-4 h-4 text-[#E59D35]" />
          <span>Add to iPhone Home Screen</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0E0A08]/85 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm border border-[#E59D35]/35 bg-[#16100D] p-6 text-[#F6F2EA] shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-medium text-[#F6F2EA]">
                  Add to Home Screen
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Close guide"
                  className="p-1.5 text-[#F6F2EA]/60 hover:text-[#F6F2EA] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#F6F2EA]/80">
                1. Tap the <strong className="text-[#E59D35]">Share</strong> button in Safari&apos;s toolbar.
                <br />
                2. Scroll down and tap{' '}
                <strong className="text-[#E59D35]">Add to Home Screen</strong>.
                <br />
                3. Open anytime offline like a pocket keepsake book.
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full border border-[#F6F2EA]/25 py-2.5 text-sm text-[#F6F2EA] hover:bg-[#F6F2EA]/10 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <p className="text-xs leading-relaxed text-[#F6F2EA]/55">
      Available offline via browser cache. On iPhone Safari, use Share &rarr; Add to Home Screen.
    </p>
  );
};
