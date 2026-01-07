import React, { useState } from 'react';
import { Camera, Ruler, Target, ArrowRight, Upload, X } from 'lucide-react';

const ProfileCompletionPage = ({ onComplete, registrationData, lang = 'en' }) => {
  const [formData, setFormData] = useState({
    profileImage: null,
    height: '',
    position: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = lang === 'ar';

  const positions = [
    { en: 'Setter', ar: 'معد' },
    { en: 'Outside Hitter', ar: 'ضارب خارجي' },
    { en: 'Middle Blocker', ar: 'صاد أوسط' },
    { en: 'Opposite Hitter', ar: 'ضارب معاكس' },
    { en: 'Libero', ar: 'ليبرو' },
    { en: 'Defensive Specialist', ar: 'متخصص دفاعي' }
  ];

  const t = {
    title: lang === 'en' ? 'Complete Your Profile' : 'أكمل ملفك الشخصي',
    subtitle: lang === 'en' ? 'Add your player information' : 'أضف معلومات اللاعب',
    profilePhoto: lang === 'en' ? 'Profile Photo' : 'صورة الملف الشخصي',
    uploadPhoto: lang === 'en' ? 'Upload Photo' : 'رفع صورة',
    changePhoto: lang === 'en' ? 'Change Photo' : 'تغيير الصورة',
    removePhoto: lang === 'en' ? 'Remove' : 'إزالة',
    height: lang === 'en' ? 'Height (cm)' : 'الطول (سم)',
    position: lang === 'en' ? 'Playing Position' : 'مركز اللعب',
    selectPosition: lang === 'en' ? 'Select your position' : 'اختر مركزك',
    completeProfile: lang === 'en' ? 'Complete Profile' : 'إكمال الملف',
    photoRequired: lang === 'en' ? 'Photo is required' : 'الصورة مطلوبة',
    heightRequired: lang === 'en' ? 'Height is required' : 'الطول مطلوب',
    positionRequired: lang === 'en' ? 'Position is required' : 'المركز مطلوب',
    invalidHeight: lang === 'en' ? 'Please enter a valid height (100-250 cm)' : 'يرجى إدخال طول صحيح (100-250 سم)',
    dragDropPhoto: lang === 'en' ? 'Drag & drop your photo here, or click to select' : 'اسحب وأفلت صورتك هنا، أو انقر للاختيار',
    photoFormats: lang === 'en' ? 'Supported formats: JPG, PNG, WEBP (Max 5MB)' : 'الصيغ المدعومة: JPG, PNG, WEBP (حد أقصى 5 ميجابايت)'
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    // Photo validation
    if (!formData.profileImage) {
      newErrors.profileImage = t.photoRequired;
    }

    // Height validation
    if (!formData.height) {
      newErrors.height = t.heightRequired;
    } else if (parseInt(formData.height) < 100 || parseInt(formData.height) > 250) {
      newErrors.height = t.invalidHeight;
    }

    // Position validation
    if (!formData.position) {
      newErrors.position = t.positionRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Handle drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Process image file (shared by upload and drag & drop)
  const processImageFile = (file) => {
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({...errors, profileImage: lang === 'en' ? 'File size must be less than 5MB' : 'يجب أن يكون حجم الملف أقل من 5 ميجابايت'});
      return;
    }

    // Check file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrors({...errors, profileImage: lang === 'en' ? 'Only JPG, PNG, and WEBP formats are supported' : 'الصيغ المدعومة فقط: JPG, PNG, WEBP'});
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData({...formData, profileImage: reader.result});
      setErrors({...errors, profileImage: null});
    };
    reader.readAsDataURL(file);
  };

  // Remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData({...formData, profileImage: null});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Combine registration data with profile data
    const completeUserData = {
      ...registrationData,
      profileImage: formData.profileImage,
      height: parseInt(formData.height),
      position: formData.position,
      positionAr: positions.find(p => p.en === formData.position)?.ar || formData.position
    };

    // Pass complete data to parent
    setTimeout(() => {
      onComplete(completeUserData);
      setIsSubmitting(false);
    }, 500);
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
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold">✓</div>
            <div className="w-12 h-1 bg-white"></div>
            <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">2</div>
            <div className="w-12 h-1 bg-blue-400"></div>
            <div className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold">3</div>
          </div>
          <p className="text-xs text-blue-100 mt-2">{lang === 'en' ? 'Step 2 of 3: Player Profile' : 'الخطوة 2 من 3: ملف اللاعب'}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Photo Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              {t.profilePhoto} <span className="text-red-500">*</span>
            </label>
            
            {!imagePreview ? (
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer"
                onClick={() => document.getElementById('photo-upload').click()}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                  id="photo-upload"
                />
                <div className="flex flex-col items-center gap-3 pointer-events-none">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <Camera size={32} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold mb-1">{t.dragDropPhoto}</p>
                    <p className="text-xs text-gray-500">{t.photoFormats}</p>
                  </div>
                  <div className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                    <Upload size={18} />
                    {t.uploadPhoto}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-xl">
                  <img 
                    src={imagePreview} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <label htmlFor="photo-upload-change" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer flex items-center gap-2">
                    <Camera size={16} />
                    {t.changePhoto}
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    id="photo-upload-change"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition flex items-center gap-2">
                    <X size={16} />
                    {t.removePhoto}
                  </button>
                </div>
              </div>
            )}
            {errors.profileImage && <p className="text-red-500 text-xs mt-2 text-center">{errors.profileImage}</p>}
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.height} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Ruler size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                className={`w-full pl-10 pr-4 py-3 border ${errors.height ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg`}
                placeholder="180"
                min="100"
                max="250"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">cm</span>
            </div>
            {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {t.position} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Target size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <select
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className={`w-full pl-10 pr-4 py-3 border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-lg bg-white cursor-pointer`}>
                <option value="">{t.selectPosition}</option>
                {positions.map(pos => (
                  <option key={pos.en} value={pos.en}>
                    {lang === 'en' ? pos.en : pos.ar}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-bold text-lg hover:from-green-600 hover:to-teal-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {lang === 'en' ? 'Creating Account...' : 'جاري إنشاء الحساب...'}
              </>
            ) : (
              <>
                {t.completeProfile}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCompletionPage;
