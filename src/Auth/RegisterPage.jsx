import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Calendar, Ruler, Target, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const RegisterPage = ({ onRegister, onBackToLogin, lang = 'en' }) => {
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    height: '',
    position: '',
    positionAr: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positions = [
    { en: 'Setter', ar: 'معد' },
    { en: 'Outside Hitter', ar: 'ضارب خارجي' },
    { en: 'Middle Blocker', ar: 'صاد أوسط' },
    { en: 'Opposite Hitter', ar: 'ضارب معاكس' },
    { en: 'Libero', ar: 'ليبرو' },
    { en: 'Defensive Specialist', ar: 'متخصص دفاعي' }
  ];

  const isRTL = lang === 'ar';

  const t = {
    title: lang === 'en' ? 'Create Your Account' : 'إنشاء حسابك',
    subtitle: lang === 'en' ? 'Join AMVA Volleyball Academy' : 'انضم إلى أكاديمية AMVA للكرة الطائرة',
    nameEn: lang === 'en' ? 'Full Name (English)' : 'الاسم الكامل (إنجليزي)',
    nameAr: lang === 'en' ? 'Full Name (Arabic)' : 'الاسم الكامل (عربي)',
    email: lang === 'en' ? 'Email Address' : 'البريد الإلكتروني',
    phone: lang === 'en' ? 'Phone Number' : 'رقم الهاتف',
    password: lang === 'en' ? 'Password' : 'كلمة المرور',
    confirmPassword: lang === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور',
    age: lang === 'en' ? 'Age' : 'العمر',
    height: lang === 'en' ? 'Height (cm)' : 'الطول (سم)',
    position: lang === 'en' ? 'Playing Position' : 'مركز اللعب',
    selectPosition: lang === 'en' ? 'Select your position' : 'اختر مركزك',
    agreeToTerms: lang === 'en' ? 'I agree to the Terms & Conditions' : 'أوافق على الشروط والأحكام',
    register: lang === 'en' ? 'Create Account' : 'إنشاء حساب',
    haveAccount: lang === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟',
    login: lang === 'en' ? 'Login' : 'تسجيل الدخول',
    optional: lang === 'en' ? 'Optional' : 'اختياري',
    required: lang === 'en' ? 'Required' : 'مطلوب',
    passwordStrength: lang === 'en' ? 'Password Strength' : 'قوة كلمة المرور',
    weak: lang === 'en' ? 'Weak' : 'ضعيفة',
    medium: lang === 'en' ? 'Medium' : 'متوسطة',
    strong: lang === 'en' ? 'Strong' : 'قوية'
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = lang === 'en' ? 'Name is required' : 'الاسم مطلوب';
    if (!formData.email.trim()) {
      newErrors.email = lang === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === 'en' ? 'Invalid email format' : 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = lang === 'en' ? 'Phone is required' : 'رقم الهاتف مطلوب';
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = lang === 'en' ? 'Invalid phone format' : 'صيغة رقم الهاتف غير صحيحة';
    }
    if (!formData.password) {
      newErrors.password = lang === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = lang === 'en' ? 'Password must be at least 6 characters' : 'يجب أن تكون كلمة المرور 6 أحرف على الأقل';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = lang === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = lang === 'en' ? 'You must agree to the terms' : 'يجب الموافقة على الشروط';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Password strength calculator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2) return { strength: 1, label: t.weak, color: 'bg-red-500' };
    if (strength <= 3) return { strength: 2, label: t.medium, color: 'bg-yellow-500' };
    return { strength: 3, label: t.strong, color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onRegister({
        id: 'p' + Date.now(),
        email: formData.email,
        password: formData.password,
        role: 'player',
        name: formData.name,
        nameAr: formData.nameAr || formData.name,
        phone: formData.phone,
        age: formData.age ? parseInt(formData.age) : null,
        height: formData.height ? parseInt(formData.height) : null,
        position: formData.position,
        positionAr: formData.positionAr || formData.position,
        sessionsRemaining: 0,
        sessionsAttended: 0,
        paymentStatus: 'unpaid',
        enrolledGroups: [],
        profileImage: null,
        registrations: [],
        joinedDate: new Date().toISOString().split('T')[0]
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg bg-white">
              <img 
                src="/images/AMVA-logo-1.png" 
                alt="AMVA Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold">AMVA</h1>
          </div>
          <h2 className="text-2xl font-bold mb-1">{t.title}</h2>
          <p className="text-blue-100">{t.subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t.nameEn} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t.nameAr} <span className="text-gray-400">({t.optional})</span>
              </label>
              <div className="relative">
                <User size={20} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} />
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="أحمد محمد"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.email} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.phone} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="+20 100 123 4567"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.password} <span className="text-red-500">*</span>
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
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">{t.passwordStrength}</span>
                  <span className={`text-xs font-semibold ${
                    passwordStrength.strength === 1 ? 'text-red-500' : 
                    passwordStrength.strength === 2 ? 'text-yellow-500' : 
                    'text-green-500'
                  }`}>{passwordStrength.label}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.confirmPassword} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className={`w-full pl-10 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t.age} <span className="text-gray-400">({t.optional})</span>
              </label>
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="18"
                  min="10"
                  max="100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t.height} <span className="text-gray-400">({t.optional})</span>
              </label>
              <div className="relative">
                <Ruler size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="180"
                  min="100"
                  max="250"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t.position} <span className="text-gray-400">({t.optional})</span>
              </label>
              <div className="relative">
                <Target size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.position}
                  onChange={(e) => {
                    const selected = positions.find(p => p.en === e.target.value);
                    setFormData({
                      ...formData, 
                      position: e.target.value,
                      positionAr: selected ? selected.ar : ''
                    });
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none">
                  <option value="">{t.selectPosition}</option>
                  {positions.map(pos => (
                    <option key={pos.en} value={pos.en}>
                      {lang === 'en' ? pos.en : pos.ar}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              {t.agreeToTerms}
              {errors.agreeToTerms && <span className="text-red-500 block">{errors.agreeToTerms}</span>}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {lang === 'en' ? 'Creating Account...' : 'جاري إنشاء الحساب...'}
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                {t.register}
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center pt-4 border-t">
            <p className="text-gray-600">
              {t.haveAccount}{' '}
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-blue-600 hover:text-blue-700 font-semibold">
                {t.login}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
