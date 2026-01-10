import React, { useState } from 'react';
import { Camera, Ruler, Target, X, Upload, Save } from 'lucide-react';

const EditProfileModal = ({ user, onSave, onClose, lang = 'en' }) => {
  const [formData, setFormData] = useState({
    height: user.height || '',
    position: user.position || '',
    profileImage: user.profileImage || null
  });

  const [imagePreview, setImagePreview] = useState(user.profileImage);
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
    title: lang === 'en' ? 'Edit Profile' : 'تعديل الملف الشخصي',
    height: lang === 'en' ? 'Height (cm)' : 'الطول (سم)',
    position: lang === 'en' ? 'Playing Position' : 'مركز اللعب',
    profilePhoto: lang === 'en' ? 'Profile Photo' : 'صورة الملف الشخصي',
    selectPosition: lang === 'en' ? 'Select your position' : 'اختر مركزك',
    uploadPhoto: lang === 'en' ? 'Upload New Photo' : 'رفع صورة جديدة',
    changePhoto: lang === 'en' ? 'Change Photo' : 'تغيير الصورة',
    removePhoto: lang === 'en' ? 'Remove Photo' : 'إزالة الصورة',
    save: lang === 'en' ? 'Save Changes' : 'حفظ التغييرات',
    cancel: lang === 'en' ? 'Cancel' : 'إلغاء',
    heightRequired: lang === 'en' ? 'Height is required' : 'الطول مطلوب',
    positionRequired: lang === 'en' ? 'Position is required' : 'المركز مطلوب',
    invalidHeight: lang === 'en' ? 'Please enter a valid height (100-250 cm)' : 'يرجى إدخال طول صحيح (100-250 سم)',
    photoFormats: lang === 'en' ? 'Supported: JPG, PNG, WEBP (Max 5MB)' : 'المدعوم: JPG, PNG, WEBP (حد أقصى 5 ميجابايت)'
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

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

  // Process image file
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Prepare updated data
    const updatedData = {
      height: parseInt(formData.height),
      position: formData.position,
      positionAr: positions.find(p => p.en === formData.position)?.ar || formData.position,
      profileImage: formData.profileImage
    };

    // Pass to parent
    setTimeout(() => {
      onSave(updatedData);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex items-center justify-between sticky top-0">
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              {t.profilePhoto}
            </label>
            
            {!imagePreview ? (
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition cursor-pointer"
                onClick={() => document.getElementById('edit-photo-upload').click()}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                  id="edit-photo-upload"
                />
                <div className="flex flex-col items-center gap-3 pointer-events-none">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Camera size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold mb-1">{t.uploadPhoto}</p>
                    <p className="text-xs text-gray-500">{t.photoFormats}</p>
                  </div>
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                    <Upload size={16} />
                    {t.uploadPhoto}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-xl">
                  <img 
                    src={imagePreview} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <label htmlFor="edit-photo-change" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer flex items-center gap-2">
                    <Camera size={16} />
                    {t.changePhoto}
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    id="edit-photo-change"
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
                className={`w-full pl-10 pr-16 py-3 border ${errors.height ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg`}
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

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {lang === 'en' ? 'Saving...' : 'جاري الحفظ...'}
                </>
              ) : (
                <>
                  <Save size={18} />
                  {t.save}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
