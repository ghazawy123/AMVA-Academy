import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

const RegisterPage = ({ onRegister, onBackToLogin, lang = 'en' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    parentName: '',
    parentPhone: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = lang === 'ar';
  const showParentFields = formData.age && parseInt(formData.age) < 13;

  const t = {
    title: lang === 'en' ? 'Create Your Account' : 'إنشاء حسابك',
    subtitle: lang === 'en' ? 'Join AMVA Volleyball Academy' : 'انضم إلى أكاديمية AMVA للكرة الطائرة',
    name: lang === 'en' ? 'Full Name' : 'الاسم الكامل',
    email: lang === 'en' ? 'Email Address' : 'البريد الإلكتروني',
    phone: lang === 'en' ? 'Phone Number' : 'رقم الهاتف',
    password: lang === 'en' ? 'Password' : 'كلمة المرور',
    confirmPassword: lang === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور',
    age: lang === 'en' ? 'Age' : 'العمر',
    parentName: lang === 'en' ? 'Parent/Guardian Name' : 'اسم ولي الأمر',
    parentPhone: lang === 'en' ? 'Parent/Guardian Phone' : 'هاتف ولي الأمر',
    parentInfoRequired: lang === 'en' ? 'Parent/Guardian information required for players under 13' : 'معلومات ولي الأمر مطلوبة للاعبين تحت 13 سنة',
    nextStep: lang === 'en' ? 'Next: Complete Profile' : 'التالي: أكمل الملف',
    backToLogin: lang === 'en' ? 'Back to Login' : 'العودة لتسجيل الدخول',
    passwordStrength: lang === 'en' ? 'Password Strength' : 'قوة كلمة المرور',
    weak: lang === 'en' ? 'Weak' : 'ضعيفة',
    medium: lang === 'en' ? 'Medium' : 'متوسطة',
    strong: lang === 'en' ? 'Strong' : 'قوية'
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = lang === 'en' ? 'Name is required' : 'الاسم مطلوب';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = lang === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === 'en' ? 'Invalid email format' : 'صيغة البريد الإلكتروني غير صحيحة';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = lang === 'en' ? 'Phone is required' : 'رقم الهاتف مطلوب';
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = lang === 'en' ? 'Invalid phone format' : 'صيغة رقم الهاتف غير صحيحة';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = lang === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = lang === 'en' ? 'Password must be at least 6 characters' : 'يجب أن تكون كلمة المرور 6 أحرف على الأقل';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = lang === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = lang === 'en' ? 'Age is required' : 'العمر مطلوب';
    } else if (parseInt(formData.age) < 6 || parseInt(formData.age) > 100) {
      newErrors.age = lang === 'en' ? 'Please enter a valid age (6-100)' : 'يرجى إدخال عمر صحيح (6-100)';
    }

    // Parent fields validation (if age < 13)
    if (showParentFields) {
      if (!formData.parentName.trim()) {
        newErrors.parentName = lang === 'en' ? 'Parent name is required' : 'اسم ولي الأمر مطلوب';
      }
      if (!formData.parentPhone.trim()) {
        newErrors.parentPhone = lang === 'en' ? 'Parent phone is required' : 'هاتف ولي الأمر مطلوب';
      } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.parentPhone)) {
        newErrors.parentPhone = lang === 'en' ? 'Invalid phone format' : 'صيغة رقم الهاتف غير صحيحة';
      }
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
    
    // Pass data to parent - will go to profile completion next
    setTimeout(() => {
      onRegister({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        age: parseInt(formData.age),
        parentName: showParentFields ? formData.parentName : null,
        parentPhone: showParentFields ? formData.parentPhone : null
      });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-yellow-500 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400 p-6 text-white text-center">
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
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
            <div className="w-12 h-1 bg-blue-400"></div>
            <div className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div className="w-12 h-1 bg-blue-400"></div>
            <div className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold">3</div>
          </div>
          <p className="text-xs text-blue-100 mt-2">{lang === 'en' ? 'Step 1 of 3: Basic Information' : 'الخطوة 1 من 3: المعلومات الأساسية'}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.name} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Ahmed Mohamed"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                placeholder="ahmed@example.com"
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

          {/* Age */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.age} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className={`w-full pl-10 pr-4 py-3 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="18"
                min="6"
                max="100"
              />
            </div>
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>

          {/* Parent Fields (Show if age < 13) */}
          {showParentFields && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2 text-yellow-800 mb-2">
                <span className="text-2xl">👨‍👩‍👦</span>
                <p className="text-sm font-semibold">{t.parentInfoRequired}</p>
              </div>

              {/* Parent Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t.parentName} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.parentName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white`}
                    placeholder="Parent/Guardian Name"
                  />
                </div>
                {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
              </div>

              {/* Parent Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t.parentPhone} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.parentPhone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white`}
                    placeholder="+20 100 123 4567"
                  />
                </div>
                {errors.parentPhone && <p className="text-red-500 text-xs mt-1">{errors.parentPhone}</p>}
              </div>
            </div>
          )}

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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-900 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {lang === 'en' ? 'Processing...' : 'جاري المعالجة...'}
              </>
            ) : (
              <>
                {t.nextStep}
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Back to Login Link */}
          <div className="text-center pt-4 border-t">
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-gray-600 hover:text-gray-800 font-semibold flex items-center gap-2 mx-auto">
              <ArrowLeft size={16} />
              {t.backToLogin}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
