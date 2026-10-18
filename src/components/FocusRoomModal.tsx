import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CloudRain,
  BookOpen,
  Wind,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';

interface FocusRoomModalProps {
  onClose: () => void;
  onSessionComplete?: () => void;
}

export const FocusRoomModal: React.FC<FocusRoomModalProps> = ({ onClose, onSessionComplete }) => {
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'shortBreak'>('pomodoro');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState<boolean>(false);

  // Ambient sound states
  const [activeSound, setActiveSound] = useState<'none' | 'rain' | 'library' | 'whitenoise'>('none');
  const [volume, setVolume] = useState<number>(0.3);

  // Focus streaks
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(2);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (timerMode === 'pomodoro') {
        setSessionsCompleted((s) => s + 1);
        if (onSessionComplete) onSessionComplete();
        // Switch to break
        setTimerMode('shortBreak');
        setTimeLeft(5 * 60);
      } else {
        setTimerMode('pomodoro');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, timerMode, onSessionComplete]);

  // Audio control
  const handleSelectSound = (sound: 'none' | 'rain' | 'library' | 'whitenoise') => {
    if (sound === activeSound) {
      ambientAudio.stop();
      setActiveSound('none');
    } else {
      if (sound === 'none') {
        ambientAudio.stop();
      } else {
        ambientAudio.play(sound, volume);
      }
      setActiveSound(sound);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    ambientAudio.setVolume(newVol);
  };

  const handleToggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleResetTimer = () => {
    setIsActive(false);
    setTimeLeft(timerMode === 'pomodoro' ? 25 * 60 : 5 * 60);
  };

  const handleSwitchMode = (mode: 'pomodoro' | 'shortBreak') => {
    setTimerMode(mode);
    setIsActive(false);
    setTimeLeft(mode === 'pomodoro' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup audio on modal close
  const handleClose = () => {
    ambientAudio.stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-white">NoteNest Study Nest</h2>
              <p className="text-xs text-indigo-300">Focus sprint with synthesized ambient soundscapes</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Mode Selector */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-slate-800 rounded-xl border border-slate-700/80">
              <button
                onClick={() => handleSwitchMode('pomodoro')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  timerMode === 'pomodoro'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Focus Sprint (25m)
              </button>
              <button
                onClick={() => handleSwitchMode('shortBreak')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  timerMode === 'shortBreak'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Short Break (5m)
              </button>
            </div>
          </div>

          {/* Big Circular Clock Display */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-6xl sm:text-7xl font-extrabold font-mono tracking-tight text-white tabular-nums drop-shadow-md">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              <span>{isActive ? 'Session in progress...' : 'Paused'}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Streak: {sessionsCompleted} sessions today</span>
            </div>
          </div>

          {/* Timer Action Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleToggleTimer}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isActive ? 'Pause' : 'Start Focus'}</span>
            </button>
            <button
              onClick={handleResetTimer}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Offline Ambient Sound Generator (Web Audio API) */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Zero-Latency Ambient Soundscapes</span>
              </div>
              {activeSound !== 'none' && (
                <div className="flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="range"
                    min="0.05"
                    max="0.8"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleSelectSound('rain')}
                className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                  activeSound === 'rain'
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <CloudRain className="w-4 h-4" />
                <span>Rain on Roof</span>
              </button>

              <button
                onClick={() => handleSelectSound('library')}
                className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                  activeSound === 'library'
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Quiet Library</span>
              </button>

              <button
                onClick={() => handleSelectSound('whitenoise')}
                className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                  activeSound === 'whitenoise'
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Wind className="w-4 h-4" />
                <span>Deep Noise</span>
              </button>
            </div>
          </div>

          {/* Live Peer Activity Feed */}
          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>3rd Year AIDS Study Circle:</span>
            </div>
            <div className="text-slate-300 font-mono text-[11px]">
              28 peers currently revising
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
