import { Download, Share2, X, FileCheck } from "lucide-react";

interface PdfGeneratedModalProps {
  isOpen: boolean;
  pdf?: Blob | null;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export default function PdfGeneratedModal({
  isOpen,
  pdf,
  onClose,
  onDownload,
  onShare,
}: PdfGeneratedModalProps) {
  if (!isOpen || !pdf) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-linear-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl animate-scaleIn overflow-hidden">
        {/* Success Gradient Background */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-br from-green-400 via-emerald-500 to-teal-500 opacity-10" />
        
        {/* Floating Orbs */}
        <div className="absolute top-8 left-8 w-24 h-24 bg-green-400/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-8 right-8 w-28 h-28 bg-emerald-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white 
                     transition-all duration-200 transform hover:scale-110 active:scale-95 group shadow-lg"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" strokeWidth={2.5} />
        </button>

        {/* Content */}
        <div className="relative px-6 pt-12 pb-6 text-center">
          {/* Success Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 w-28 h-28 rounded-full bg-linear-to-br from-green-400 to-emerald-500 opacity-20 blur-xl animate-pulse" />
            
            {/* Icon Container */}
            <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-green-500 to-emerald-600 
                          flex items-center justify-center shadow-2xl shadow-green-500/40">
              <FileCheck className="w-12 h-12 text-white" strokeWidth={2.5} />
              
              {/* Success Checkmark Badge */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            PDF Generated!
          </h2>
          
          {/* Subtitle */}
          <p className="text-sm text-gray-600 mb-8">
            Your PDF is ready to download or share
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Download Button */}
            <button
              onClick={onDownload}
              className="w-full py-4 px-6 rounded-xl font-bold text-base
                         transition-all duration-200 transform hover:scale-105 active:scale-95
                         relative overflow-hidden group shadow-lg"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                boxShadow: "0 4px 16px rgba(37, 99, 235, 0.4)"
              }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent 
                            translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative flex items-center justify-center gap-2.5">
                <Download className="w-5 h-5" strokeWidth={2.5} />
                Download PDF
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={onShare}
              className="w-full py-4 px-6 rounded-xl font-bold text-base
                         transition-all duration-200 transform hover:scale-105 active:scale-95
                         border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50
                         hover:border-gray-400 relative overflow-hidden group"
            >
              <span className="relative flex items-center justify-center gap-2.5">
                <Share2 className="w-5 h-5" strokeWidth={2.5} />
                Share
              </span>
            </button>

            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-xl font-semibold text-sm
                         text-gray-600 hover:text-gray-900 hover:bg-gray-100
                         transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Bottom Shine */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}