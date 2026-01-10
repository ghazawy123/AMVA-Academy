import React, { useEffect } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';

const WelcomeScreen = ({ playerName, onComplete, lang = 'en' }) => {
  const isRTL = lang === 'ar';

  const t = {
    welcome: lang === 'en' ? 'Welcome to AMVA, Champ!' : 'مرحباً بك في AMVA، يا بطل!',
    accountCreated: lang === 'en' ? 'Your account has been created successfully!' : 'تم إنشاء حسابك بنجاح!',
    redirecting: lang === 'en' ? 'Redirecting to your dashboard...' : 'جاري التوجيه إلى لوحة التحكم...'
  };

  // Auto-redirect after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-500 to-yellow-400 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center max-w-2xl">
        {/* Success Animation */}
        <div className="mb-8 relative">
          {/* Sparkles Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="absolute top-0 left-1/4 text-yellow-300 animate-pulse" size={32} />
            <Sparkles className="absolute top-10 right-1/4 text-yellow-300 animate-pulse delay-100" size={24} />
            <Sparkles className="absolute bottom-10 left-1/3 text-yellow-300 animate-pulse delay-200" size={28} />
            <Sparkles className="absolute bottom-0 right-1/3 text-yellow-300 animate-pulse delay-300" size={20} />
          </div>

          {/* Main Success Icon */}
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow mx-auto">
              <CheckCircle size={80} className="text-green-500" />
            </div>
            
            {/* AMVA Logo Overlay */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-20 h-20 bg-white rounded-full shadow-xl p-2 border-4 border-blue-600">
                <img 
                  src="/images/AMVA-logo-1.png" 
                  alt="AMVA Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            {t.welcome}
          </h1>
          
          <p className="text-2xl text-white font-semibold animate-fade-in-delay">
            {playerName}! 🎉
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-8 animate-fade-in-delay-2">
            <p className="text-xl text-white mb-4">
              {t.accountCreated}
            </p>
            
            {/* Loading Animation */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
              </div>
              <p className="text-white font-medium">{t.redirecting}</p>
            </div>
          </div>

          {/* Progress Steps Completed */}
          <div className="flex items-center justify-center gap-2 mt-8 animate-fade-in-delay-3">
            <div className="w-10 h-10 bg-white text-green-600 rounded-full flex items-center justify-center font-bold shadow-lg">✓</div>
            <div className="w-12 h-1 bg-white"></div>
            <div className="w-10 h-10 bg-white text-green-600 rounded-full flex items-center justify-center font-bold shadow-lg">✓</div>
            <div className="w-12 h-1 bg-white"></div>
            <div className="w-10 h-10 bg-white text-green-600 rounded-full flex items-center justify-center font-bold shadow-lg">✓</div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fade-in 0.6s ease-out 0.3s forwards;
        }

        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fade-in 0.6s ease-out 0.6s forwards;
        }

        .animate-fade-in-delay-3 {
          opacity: 0;
          animation: fade-in 0.6s ease-out 0.9s forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
