import React, { useState } from 'react';
import { X, Music, CloudRain, Trash2 } from 'lucide-react';
import { AudioMode } from '../types/story';
import { PWAInstallButton } from './PWAInstallButton';

interface SettingsDrawerProps {
  open: boolean;
  audioMode: AudioMode;
  musicEnabled: boolean;
  rainEnabled: boolean;
  onClose: () => void;
  onToggleMusic: () => void;
  onToggleRain: () => void;
  onSetAudioMode: (mode: AudioMode) => void;
  onEraseSavedStory: () => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  open,
  audioMode,
  musicEnabled,
  rainEnabled,
  onClose,
  onToggleMusic,
  onToggleRain,
  onSetAudioMode,
  onEraseSavedStory,
}) => {
  const [confirmErase, setConfirmErase] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0E0A08]/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-sm h-full bg-[#15100D] border-l border-[#E59D35]/30 p-6 flex flex-col justify-between text-[#F6F2EA] overflow-y-auto archival-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between border-b border-[#F6F2EA]/12 pb-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-[#E59D35] uppercase">Preferences</p>
              <h2 className="font-display text-2xl font-medium text-[#F6F2EA]">Room & Audio</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close settings"
              className="p-2 border border-[#F6F2EA]/15 text-[#F6F2EA]/70 hover:text-[#F6F2EA] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Audio Presets */}
          <div className="mt-6 space-y-3">
            <p className="text-xs tracking-[0.16em] text-[#F6F2EA]/60 uppercase">Soundscape Preset</p>
            <div className="grid grid-cols-3 gap-1.5 bg-[#0E0A08] p-1 border border-[#F6F2EA]/12">
              {(
                [
                  { id: 'piano-rain', label: 'Piano · Rain' },
                  { id: 'piano', label: 'Felt Piano' },
                  { id: 'off', label: 'Sound Off' },
                ] as { id: AudioMode; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSetAudioMode(item.id)}
                  className={`py-2 px-2 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                    audioMode === item.id
                      ? 'bg-[#E59D35] text-[#0E0A08] font-medium'
                      : 'text-[#F6F2EA]/70 hover:text-[#F6F2EA]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Individual Channels */}
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={onToggleMusic}
              className="w-full flex items-center justify-between border border-[#F6F2EA]/12 bg-[#0E0A08]/60 px-4 py-3 text-sm hover:border-[#E59D35]/45 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <Music className="w-4 h-4 text-[#E59D35]" />
                <span>Felt Piano Music</span>
              </span>
              <span className="text-xs text-[#E59D35]">
                {musicEnabled && audioMode !== 'off' ? 'On' : 'Muted'}
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleRain}
              className="w-full flex items-center justify-between border border-[#F6F2EA]/12 bg-[#0E0A08]/60 px-4 py-3 text-sm hover:border-[#E59D35]/45 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <CloudRain className="w-4 h-4 text-[#E59D35]" />
                <span>Window Rain Ambience</span>
              </span>
              <span className="text-xs text-[#E59D35]">
                {rainEnabled && audioMode === 'piano-rain' ? 'On' : 'Muted'}
              </span>
            </button>
          </div>

          {/* PWA Install / Home Screen */}
          <div className="mt-7 pt-6 border-t border-[#F6F2EA]/12 space-y-3">
            <p className="text-xs tracking-[0.16em] text-[#F6F2EA]/60 uppercase">
              Offline & Home Screen
            </p>
            <PWAInstallButton />
          </div>
        </div>

        {/* Erase Saved Story */}
        <div className="mt-8 pt-6 border-t border-[#F6F2EA]/12">
          {!confirmErase ? (
            <button
              type="button"
              onClick={() => setConfirmErase(true)}
              className="w-full flex items-center justify-center gap-2 border border-[#B84935]/50 bg-[#B84935]/10 px-4 py-2.5 text-sm text-[#F6F2EA]/90 hover:bg-[#B84935]/20 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-[#B84935]" />
              <span>Erase Saved Story</span>
            </button>
          ) : (
            <div className="border border-[#B84935]/60 bg-[#B84935]/15 p-3.5 space-y-3">
              <p className="text-xs leading-relaxed text-[#F6F2EA]/90">
                Reset all 16 chapters, collected quote bookmarks, and margin notes? This cannot be undone.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onEraseSavedStory();
                    setConfirmErase(false);
                    onClose();
                  }}
                  className="flex-1 bg-[#B84935] text-[#F6F2EA] py-2 text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-[#c8543f]"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmErase(false)}
                  className="flex-1 border border-[#F6F2EA]/25 py-2 text-xs text-[#F6F2EA]/80 cursor-pointer hover:bg-[#F6F2EA]/10"
                >
                  Keep Story
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
