import React, { useState } from 'react';
import { Mail, Lock, Key, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPasswordPage = ({ onResetPassword, onBackToLogin, lang = 'en' }) => {
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password, 4: Success
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = lang === 'ar';

  const t = {
    title: lang === 'en' ? 'Reset Password' : 'إعادة تعيين كلمة المرور',
    subtitle: lang === 'en' ? "We'll help you recover your account" : 'سنساعدك في استعادة حسابك',
    step1Title: lang === 'en' ? 'Enter Your Email' : 'أدخل بريدك الإلكتروني',
    step1Subtitle: lang === 'en' ? "We'll send you a verification code" : 'سنرسل لك رمز التحقق',
    step2Title: lang === 'en' ? 'Enter Verification Code' : 'أدخل رمز التحقق',
    step2Subtitle: lang === 'en' ? 'Check your email for the 6-digit code' : 'تحقق من بريدك الإلكتروني للحصول على الرمز المكون من 6 أرقام',
    step3Title: lang === 'en' ? 'Create New Password' : 'إنشاء كلمة مرور جديدة',
    step3Subtitle: lang === 'en' ? 'Choose a strong password' : 'اختر كلمة مرور قوية',
    successTitle: lang === 'en' ? 'Password Reset Successful!' : 'تم إعادة تعيين كلمة المرور بنجاح!',
    successSubtitle: lang === 'en' ? 'You can now login with your new password' : 'يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة',
    email: lang === 'en' ? 'Email Address' : 'البريد الإلكتروني',
    code: lang === 'en' ? 'Verification Code' : 'رمز التحقق',
    newPassword: lang === 'en' ? 'New Password' : 'كلمة المرور الجديدة',
    confirmPassword: lang === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور',
    sendCode: lang === 'en' ? 'Send Code' : 'إرسال الرمز',
    verifyCode: lang === 'en' ? 'Verify Code' : 'التحقق من الرمز',
    resetPassword: lang === 'en' ? 'Reset Password' : 'إعادة تعيين كلمة المرور',
    backToLogin: lang === 'en' ? 'Back to Login' : 'العودة لتسجيل الدخول',
    resendCode: lang === 'en' ? 'Resend code' : 'إعادة إرسال الرمز',
    codeSent: lang === 'en' ? 'Code sent to' : 'تم إرسال الرمز إلى'
  };

  const validate = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.email.trim()) {
        newErrors.email = lang === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = lang === 'en' ? 'Invalid email format' : 'صيغة البريد الإلكتروني غير صحيحة';
      }
    }

    if (step === 2) {
      if (!formData.code.trim()) {
        newErrors.code = lang === 'en' ? 'Code is required' : 'الرمز مطلوب';
      } else if (formData.code.length !== 6) {
        newErrors.code = lang === 'en' ? 'Code must be 6 digits' : 'يجب أن يكون الرمز مكونًا من 6 أرقام';
      }
    }

    if (step === 3) {
      if (!formData.newPassword) {
        newErrors.newPassword = lang === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = lang === 'en' ? 'Password must be at least 6 characters' : 'يجب أن تكون كلمة المرور 6 أحرف على الأقل';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = lang === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة';
      }
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
      if (step === 1) {
        // Send verification code
        setStep(2);
        setIsSubmitting(false);
      } else if (step === 2) {
        // Verify code
        setStep(3);
        setIsSubmitting(false);
      } else if (step === 3) {
        // Reset password
        setStep(4);
        setIsSubmitting(false);
        // Call the reset function after 2 seconds on success screen
        setTimeout(() => {
          onResetPassword(formData.email, formData.newPassword);
        }, 2000);
      }
    }, 1000);
  };

  const handleResendCode = () => {
    // Simulate resending code
    alert(lang === 'en' ? 'Verification code resent!' : 'تم إعادة إرسال رمز التحقق!');
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

        {/* Progress Indicator */}
        {step < 4 && (
          <div className="px-8 pt-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step > s ? '✓' : s}
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Step 1: Enter Email */}
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.step1Title}</h3>
                <p className="text-gray-600 text-sm">{t.step1Subtitle}</p>
              </div>

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
                    autoFocus
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {lang === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                  </div>
                ) : (
                  t.sendCode
                )}
              </button>
            </>
          )}

          {/* Step 2: Enter Code */}
          {step === 2 && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.step2Title}</h3>
                <p className="text-gray-600 text-sm mb-1">{t.step2Subtitle}</p>
                <p className="text-blue-600 text-sm font-semibold">{t.codeSent} {formData.email}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t.code}
                </label>
                <div className="relative">
                  <Key size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.code ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-center text-2xl tracking-widest font-mono`}
                    placeholder="000000"
                    maxLength="6"
                    autoFocus
                  />
                </div>
                {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                  {t.resendCode}
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {lang === 'en' ? 'Verifying...' : 'جاري التحقق...'}
                  </div>
                ) : (
                  t.verifyCode
                )}
              </button>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.step3Title}</h3>
                <p className="text-gray-600 text-sm">{t.step3Subtitle}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t.newPassword}
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    placeholder="••••••••"
                    autoFocus
                  />
                </div>
                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {lang === 'en' ? 'Resetting...' : 'جاري إعادة التعيين...'}
                  </div>
                ) : (
                  t.resetPassword
                )}
              </button>
            </>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.successTitle}</h3>
              <p className="text-gray-600 mb-6">{t.successSubtitle}</p>
              <button
                onClick={onBackToLogin}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition shadow-lg">
                {t.backToLogin}
              </button>
            </div>
          )}

          {/* Back to Login Link */}
          {step < 4 && (
            <div className="text-center pt-4 border-t">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-gray-600 hover:text-gray-800 font-semibold flex items-center gap-2 mx-auto">
                <ArrowLeft size={16} />
                {t.backToLogin}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
