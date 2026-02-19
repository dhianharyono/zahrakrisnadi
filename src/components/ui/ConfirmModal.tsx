'use client';

import { createPortal } from 'react-dom';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title = 'Konfirmasi',
  message,
  confirmLabel = 'Ya, Lanjutkan',
  cancelLabel = 'Batal',
  isDanger = false,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div className='fixed inset-0 bg-black/40 backdrop-blur-md z-9999 flex items-center justify-center p-4'>
      <div className='bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-100/50 border border-white/50 w-full max-w-md overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up'>
        <div className='p-6 text-center'>
          <div
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDanger ? 'bg-red-100 text-red-500' : 'bg-orange-100 text-primary'}`}
          >
            <AlertTriangle className='w-8 h-8' />
          </div>
          <h3 className='text-xl font-serif font-bold text-gray-800 mb-2'>
            {title}
          </h3>
          <p className='text-gray-600 mb-6'>{message}</p>

          <div className='flex gap-3 justify-center'>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className='cursor-pointer px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors disabled:opacity-50'
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`cursor-pointer px-6 py-2.5 text-white rounded-xl font-bold shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                isDanger
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-200'
                  : 'bg-primary hover:bg-orange-600 shadow-primary/20'
              }`}
            >
              {isLoading ? (
                <>
                  <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                  Memproses...
                </>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
