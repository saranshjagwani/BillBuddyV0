import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: "var(--bb-bg-soft)" }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ 
            backgroundColor: "var(--bb-secondary)",
            animation: "float 6s ease-in-out infinite"
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-10"
          style={{ 
            backgroundColor: "var(--bb-primary)",
            animation: "float 8s ease-in-out infinite 1s"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center">
          
          {/* 404 Illustration */}
          <div className="mb-8 relative">
            {/* Large 404 Text */}
            <div className="relative">
              <h1 
                className="text-[150px] sm:text-[200px] font-black leading-none opacity-10"
                style={{ color: "var(--bb-text)" }}
              >
                404
              </h1>
              
              {/* Logo Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="h-32 w-32 sm:h-40 sm:w-40 flex items-center justify-center shadow-2xl"
                  style={{ 
                    borderRadius: "28px",
                    backgroundColor: "var(--bb-secondary)",
                    animation: "bounce 2s ease-in-out infinite"
                  }}
                >
                  <img
                    src="/public/BillBuddyLogo2.png"
                    alt="BillBuddy Logo"
                    className="h-24 w-24 sm:h-32 sm:w-32 object-contain"
                  />
                </div>
                
                {/* Confused Icon */}
                <div 
                  className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "var(--bb-primary)" }}
                >
                  <span className="text-2xl">🤔</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8 space-y-3">
            <h2 
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: "var(--bb-text)" }}
            >
              Oops! Page Not Found
            </h2>
            <p 
              className="text-lg sm:text-xl max-w-md mx-auto"
              style={{ color: "var(--bb-text-muted)" }}
            >
              The page you're looking for seems to have wandered off. 
              Let's get you back on track!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl font-semibold text-base
                       transition-all duration-200 transform
                       hover:scale-105 active:scale-95
                       shadow-lg hover:shadow-xl flex items-center gap-2"
              style={{
                backgroundColor: "white",
                color: "var(--bb-primary)",
                border: "2px solid var(--bb-primary)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bb-primary)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "var(--bb-primary)";
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Go Back
            </button>

            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl font-semibold text-base text-white
                       transition-all duration-200 transform
                       hover:scale-105 active:scale-95
                       shadow-lg hover:shadow-xl flex items-center gap-2"
              style={{ backgroundColor: "var(--bb-primary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bb-primary-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bb-primary)";
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </button>
          </div>     
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}