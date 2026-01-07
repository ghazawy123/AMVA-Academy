import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';

const LoginPage = ({ onLogin, onGoToRegister, lang = 'en' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = lang === 'ar';

  const t = {
    title: lang === 'en' ? 'Welcome Back' : 'مرحباً بعودتك',
    subtitle: lang === 'en' ? 'Login to AMVA Volleyball Academy' : 'تسجيل الدخول إلى أكاديمية AMVA',
    email: lang === 'en' ? 'Email Address' : 'البريد الإلكتروني',
    password: lang === 'en' ? 'Password' : 'كلمة المرور',
    rememberMe: lang === 'en' ? 'Remember me' : 'تذكرني',
    forgotPassword: lang === 'en' ? 'Forgot password?' : 'نسيت كلمة المرور؟',
    login: lang === 'en' ? 'Login' : 'تسجيل الدخول',
    newToAMVA: lang === 'en' ? 'New to AMVA?' : 'جديد في AMVA؟',
    createAccount: lang === 'en' ? 'Create your player account' : 'أنشئ حساب لاعب',
    demoAccounts: lang === 'en' ? 'Demo Accounts' : 'حسابات تجريبية',
    player: lang === 'en' ? 'Player' : 'لاعب',
    admin: lang === 'en' ? 'Admin' : 'مشرف'
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = lang === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === 'en' ? 'Invalid email format' : 'صيغة البريد الإلكتروني غير صحيحة';
    }
    
    if (!formData.password) {
      newErrors.password = lang === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(formData.email, formData.password, formData.rememberMe);
      setIsSubmitting(false);
    }, 500);
  };

  const handleQuickLogin = (email, password) => {
    setFormData({ email, password, rememberMe: false });
    setTimeout(() => {
      onLogin(email, password, false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-lg bg-white">
              <img 
                src="/images/AMVA-logo-1.png" 
                alt="AMVA Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold">AMVA</h1>
          </div>
          <h2 className="text-2xl font-bold mb-1">{t.title}</h2>
          <p className="text-blue-100">{t.subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.email}
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.password}
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{t.rememberMe}</span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              {t.forgotPassword}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {lang === 'en' ? 'Logging in...' : 'جاري تسجيل الدخول...'}
              </>
            ) : (
              <>
                <LogIn size={20} />
                {t.login}
              </>
            )}
          </button>

          {/* Register Link - PROMINENT */}
          <div className="text-center pt-6 border-t-2 border-gray-200">
            <p className="text-gray-600 text-base mb-3">
              {t.newToAMVA}
            </p>
            <button
              type="button"
              onClick={onGoToRegister}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-bold hover:from-green-600 hover:to-teal-600 transition shadow-lg flex items-center justify-center gap-2">
              {t.createAccount}
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        {/* Demo Accounts Section */}
        <div className="p-6 bg-gray-50 border-t">
          <p className="text-xs text-gray-500 text-center mb-3">{t.demoAccounts}</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('player@demo.com', 'player123')}
              className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium transition">
              👤 {t.player}
            </button>
            <button
              onClick={() => handleQuickLogin('coach@demo.com', 'coach123')}
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium transition">
              👨‍💼 {t.admin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
