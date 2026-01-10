import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Upload, Image, Video, Instagram, Camera, ChevronUp, ChevronDown } from 'lucide-react';

const ManageGallery = ({ 
  galleryItems, 
  setGalleryItems, 
  onBack, 
  addNotification,
  lang = 'en' 
}) => {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const isRTL = lang === 'ar';

  const t = {
    title: lang === 'en' ? 'Manage Gallery' : 'إدارة المعرض',
    addNew: lang === 'en' ? 'Add New Item' : 'إضافة عنصر جديد',
    back: lang === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم',
    filterAll: lang === 'en' ? 'All' : 'الكل',
    filterTraining: lang === 'en' ? 'Training' : 'تدريب',
    filterAchievements: lang === 'en' ? 'Achievements' : 'إنجازات',
    filterVideos: lang === 'en' ? 'Videos' : 'فيديوهات',
    edit: lang === 'en' ? 'Edit' : 'تعديل',
    delete: lang === 'en' ? 'Delete' : 'حذف',
    moveUp: lang === 'en' ? 'Move Up' : 'تحريك لأعلى',
    moveDown: lang === 'en' ? 'Move Down' : 'تحريك لأسفل',
    noItems: lang === 'en' ? 'No gallery items yet. Add your first one!' : 'لا توجد عناصر في المعرض. أضف أول عنصر!',
    deleteConfirm: lang === 'en' ? 'Are you sure you want to delete this item?' : 'هل أنت متأكد من حذف هذا العنصر؟',
    confirmDelete: lang === 'en' ? 'Yes, Delete' : 'نعم، احذف',
    cancel: lang === 'en' ? 'Cancel' : 'إلغاء',
    itemDeleted: lang === 'en' ? 'Gallery item deleted successfully' : 'تم حذف العنصر بنجاح',
    itemAdded: lang === 'en' ? 'Gallery item added successfully' : 'تم إضافة العنصر بنجاح',
    itemUpdated: lang === 'en' ? 'Gallery item updated successfully' : 'تم تحديث العنصر بنجاح'
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'achievements': return 'bg-yellow-100 text-yellow-800';
      case 'videos': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter items
  const filteredItems = filterCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filterCategory);

  // Handle Add New
  const handleAddNew = () => {
    setEditingItem(null);
    setShowAddEditModal(true);
  };

  // Handle Edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowAddEditModal(true);
  };

  // Handle Delete
  const handleDelete = (itemId) => {
    setGalleryItems(galleryItems.filter(item => item.id !== itemId));
    setShowDeleteConfirm(null);
    addNotification(t.itemDeleted, 'success');
  };

  // Handle Move Up
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newItems = [...galleryItems];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    setGalleryItems(newItems);
  };

  // Handle Move Down
  const handleMoveDown = (index) => {
    if (index === galleryItems.length - 1) return;
    const newItems = [...galleryItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setGalleryItems(newItems);
  };

  // Handle Save from Modal
  const handleSave = (itemData) => {
    if (editingItem) {
      // Update existing
      setGalleryItems(galleryItems.map(item => 
        item.id === editingItem.id ? { ...item, ...itemData } : item
      ));
      addNotification(t.itemUpdated, 'success');
    } else {
      // Add new
      const newItem = {
        id: Date.now(),
        ...itemData,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setGalleryItems([...galleryItems, newItem]);
      addNotification(t.itemAdded, 'success');
    }
    setShowAddEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{t.title}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 font-semibold flex items-center gap-2 transition shadow-lg">
              <Plus size={20} />
              {t.addNew}
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition">
              {t.back}
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterCategory === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
              {t.filterAll}
            </button>
            <button
              onClick={() => setFilterCategory('training')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterCategory === 'training' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
              🏐 {t.filterTraining}
            </button>
            <button
              onClick={() => setFilterCategory('achievements')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterCategory === 'achievements' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
              🏆 {t.filterAchievements}
            </button>
            <button
              onClick={() => setFilterCategory('videos')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterCategory === 'videos' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
              🎥 {t.filterVideos}
            </button>
          </div>
        </div>

        {/* Gallery Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image size={48} className="text-gray-400" />
            </div>
            <p className="text-xl text-gray-500 mb-4">{t.noItems}</p>
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 font-semibold flex items-center gap-2 mx-auto transition shadow-lg">
              <Plus size={20} />
              {t.addNew}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const actualIndex = galleryItems.findIndex(g => g.id === item.id);
              return (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  {/* Item Preview */}
                  <div className="relative h-48 bg-gray-100">
                    {item.type === 'image' && (
                      <img 
                        src={item.url} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {item.type === 'youtube' && (
                      <div className="w-full h-full flex items-center justify-center bg-red-100">
                        <Video size={64} className="text-red-600" />
                      </div>
                    )}
                    {item.type === 'instagram' && item.thumbnail && (
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {item.type === 'instagram' && !item.thumbnail && (
                      <div className="w-full h-full flex items-center justify-center bg-pink-100">
                        <Instagram size={64} className="text-pink-600" />
                      </div>
                    )}
                    
                    {/* Type Badge */}
                    <div className="absolute top-2 left-2 px-3 py-1 bg-black/70 text-white text-xs font-semibold rounded-full">
                      {item.type === 'image' && '📷 Image'}
                      {item.type === 'youtube' && '▶️ YouTube'}
                      {item.type === 'instagram' && '📸 Instagram'}
                    </div>

                    {/* Category Badge */}
                    <div className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category === 'training' && '🏐'}
                      {item.category === 'achievements' && '🏆'}
                      {item.category === 'videos' && '🎥'}
                      {' '}
                      {lang === 'en' 
                        ? item.category.charAt(0).toUpperCase() + item.category.slice(1)
                        : item.category === 'training' ? 'تدريب' : item.category === 'achievements' ? 'إنجازات' : 'فيديوهات'
                      }
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">
                      {lang === 'en' ? item.title : (item.titleAr || item.title)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 truncate">
                      {lang === 'en' ? item.caption : (item.captionAr || item.caption)}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-semibold flex items-center justify-center gap-1 transition">
                        <Edit2 size={16} />
                        {t.edit}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(item.id)}
                        className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-semibold flex items-center justify-center gap-1 transition">
                        <Trash2 size={16} />
                        {t.delete}
                      </button>
                    </div>

                    {/* Reorder Buttons */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleMoveUp(actualIndex)}
                        disabled={actualIndex === 0}
                        className="flex-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-1 transition text-sm">
                        <ChevronUp size={14} />
                        {t.moveUp}
                      </button>
                      <button
                        onClick={() => handleMoveDown(actualIndex)}
                        disabled={actualIndex === galleryItems.length - 1}
                        className="flex-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-1 transition text-sm">
                        <ChevronDown size={14} />
                        {t.moveDown}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddEditModal && (
        <AddEditGalleryModal
          item={editingItem}
          onSave={handleSave}
          onClose={() => setShowAddEditModal(false)}
          lang={lang}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t.deleteConfirm}</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold transition">
                {t.cancel}
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition">
                {t.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add/Edit Gallery Item Modal Component
const AddEditGalleryModal = ({ item, onSave, onClose, lang }) => {
  const [formData, setFormData] = useState({
    type: item?.type || 'image',
    title: item?.title || '',
    titleAr: item?.titleAr || '',
    caption: item?.caption || '',
    captionAr: item?.captionAr || '',
    url: item?.url || '',
    thumbnail: item?.thumbnail || '',
    category: item?.category || 'training'
  });

  const [imagePreview, setImagePreview] = useState(item?.type === 'image' ? item.url : null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = lang === 'ar';

  const t = {
    titleAdd: lang === 'en' ? 'Add Gallery Item' : 'إضافة عنصر للمعرض',
    titleEdit: lang === 'en' ? 'Edit Gallery Item' : 'تعديل عنصر المعرض',
    type: lang === 'en' ? 'Item Type' : 'نوع العنصر',
    typeImage: lang === 'en' ? 'Image' : 'صورة',
    typeYouTube: lang === 'en' ? 'YouTube Video' : 'فيديو يوتيوب',
    typeInstagram: lang === 'en' ? 'Instagram Post' : 'منشور إنستغرام',
    titleEn: lang === 'en' ? 'Title (English)' : 'العنوان (إنجليزي)',
    titleAr: lang === 'en' ? 'Title (Arabic)' : 'العنوان (عربي)',
    captionEn: lang === 'en' ? 'Caption (English)' : 'الوصف (إنجليزي)',
    captionAr: lang === 'en' ? 'Caption (Arabic)' : 'الوصف (عربي)',
    category: lang === 'en' ? 'Category' : 'الفئة',
    catTraining: lang === 'en' ? 'Training' : 'تدريب',
    catAchievements: lang === 'en' ? 'Achievements' : 'إنجازات',
    catVideos: lang === 'en' ? 'Videos' : 'فيديوهات',
    uploadImage: lang === 'en' ? 'Upload Image' : 'رفع صورة',
    changeImage: lang === 'en' ? 'Change Image' : 'تغيير الصورة',
    youtubeUrl: lang === 'en' ? 'YouTube URL' : 'رابط يوتيوب',
    youtubeHelp: lang === 'en' ? 'Paste the full YouTube video URL' : 'الصق رابط فيديو يوتيوب الكامل',
    instagramUrl: lang === 'en' ? 'Instagram URL' : 'رابط إنستغرام',
    instagramHelp: lang === 'en' ? 'Paste the Instagram post/reel URL' : 'الصق رابط المنشور أو الريل',
    thumbnailUrl: lang === 'en' ? 'Thumbnail URL (optional)' : 'رابط الصورة المصغرة (اختياري)',
    save: lang === 'en' ? 'Save' : 'حفظ',
    cancel: lang === 'en' ? 'Cancel' : 'إلغاء',
    dragDrop: lang === 'en' ? 'Drag & drop or click to upload' : 'اسحب وأفلت أو انقر للرفع',
    photoFormats: lang === 'en' ? 'JPG, PNG, WEBP (Max 5MB)' : 'JPG, PNG, WEBP (حد أقصى 5 ميجابايت)'
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = lang === 'en' ? 'Title is required' : 'العنوان مطلوب';
    if (!formData.caption.trim()) newErrors.caption = lang === 'en' ? 'Caption is required' : 'الوصف مطلوب';
    
    if (formData.type === 'image' && !formData.url) {
      newErrors.url = lang === 'en' ? 'Please upload an image' : 'يرجى رفع صورة';
    }
    if (formData.type === 'youtube' && !formData.url.includes('youtube.com')) {
      newErrors.url = lang === 'en' ? 'Please enter a valid YouTube URL' : 'يرجى إدخال رابط يوتيوب صحيح';
    }
    if (formData.type === 'instagram' && !formData.url.includes('instagram.com')) {
      newErrors.url = lang === 'en' ? 'Please enter a valid Instagram URL' : 'يرجى إدخال رابط إنستغرام صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) processImageFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) processImageFile(file);
  };

  const processImageFile = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrors({...errors, url: lang === 'en' ? 'File size must be less than 5MB' : 'يجب أن يكون حجم الملف أقل من 5 ميجابايت'});
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrors({...errors, url: lang === 'en' ? 'Only JPG, PNG, and WEBP formats are supported' : 'الصيغ المدعومة فقط: JPG, PNG, WEBP'});
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData({...formData, url: reader.result});
      setErrors({...errors, url: null});
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSave(formData);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white flex items-center justify-between sticky top-0">
          <h2 className="text-2xl font-bold">{item ? t.titleEdit : t.titleAdd}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Item Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t.type} <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'image', url: '', thumbnail: ''})}
                className={`p-4 rounded-xl border-2 font-semibold transition ${
                  formData.type === 'image'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}>
                <Image size={24} className="mx-auto mb-2" />
                {t.typeImage}
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'youtube', url: '', thumbnail: ''})}
                className={`p-4 rounded-xl border-2 font-semibold transition ${
                  formData.type === 'youtube'
                    ? 'border-red-600 bg-red-50 text-red-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}>
                <Video size={24} className="mx-auto mb-2" />
                {t.typeYouTube}
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'instagram', url: '', thumbnail: ''})}
                className={`p-4 rounded-xl border-2 font-semibold transition ${
                  formData.type === 'instagram'
                    ? 'border-pink-600 bg-pink-50 text-pink-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}>
                <Instagram size={24} className="mx-auto mb-2" />
                {t.typeInstagram}
              </button>
            </div>
          </div>

          {/* Content Upload/URL based on type */}
          {formData.type === 'image' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.uploadImage} <span className="text-red-500">*</span></label>
              {!imagePreview ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer"
                  onClick={() => document.getElementById('gallery-image-upload').click()}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    id="gallery-image-upload"
                  />
                  <Camera size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-700 font-semibold mb-1">{t.dragDrop}</p>
                  <p className="text-xs text-gray-500">{t.photoFormats}</p>
                </div>
              ) : (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => document.getElementById('gallery-image-change').click()}
                    className="absolute top-2 right-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                    {t.changeImage}
                  </button>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    id="gallery-image-change"
                  />
                </div>
              )}
              {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
            </div>
          )}

          {formData.type === 'youtube' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.youtubeUrl} <span className="text-red-500">*</span></label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="https://www.youtube.com/watch?v=..."
                className={`w-full px-4 py-3 border ${errors.url ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              <p className="text-xs text-gray-500 mt-1">{t.youtubeHelp}</p>
              {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
            </div>
          )}

          {formData.type === 'instagram' && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.instagramUrl} <span className="text-red-500">*</span></label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://www.instagram.com/p/..."
                  className={`w-full px-4 py-3 border ${errors.url ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                />
                <p className="text-xs text-gray-500 mt-1">{t.instagramHelp}</p>
                {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.thumbnailUrl}</label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                  placeholder="/images/thumbnail.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Titles */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.titleEn} <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Training Session"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.titleAr}</label>
              <input
                type="text"
                value={formData.titleAr}
                onChange={(e) => setFormData({...formData, titleAr: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="جلسة تدريبية"
                dir="rtl"
              />
            </div>
          </div>

          {/* Captions */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.captionEn} <span className="text-red-500">*</span></label>
              <textarea
                value={formData.caption}
                onChange={(e) => setFormData({...formData, caption: e.target.value})}
                rows="3"
                className={`w-full px-4 py-3 border ${errors.caption ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Description..."
              />
              {errors.caption && <p className="text-red-500 text-xs mt-1">{errors.caption}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.captionAr}</label>
              <textarea
                value={formData.captionAr}
                onChange={(e) => setFormData({...formData, captionAr: e.target.value})}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="الوصف..."
                dir="rtl"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t.category} <span className="text-red-500">*</span></label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
              <option value="training">🏐 {t.catTraining}</option>
              <option value="achievements">🏆 {t.catAchievements}</option>
              <option value="videos">🎥 {t.catVideos}</option>
            </select>
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
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

export default ManageGallery;
