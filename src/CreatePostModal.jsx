import React from 'react';
import { X } from 'lucide-react';

const CreatePostModal = ({ 
  show, 
  onClose, 
  modalType, 
  newPost, 
  setNewPost, 
  onSubmit, 
  lang 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">
            {modalType === 'post'
              ? (lang === 'en' ? 'Create New Post' : 'إنشاء منشور جديد')
              : (lang === 'en' ? 'Create New Session' : 'إنشاء جلسة جديدة')
            }
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {lang === 'en' ? 'Title (English)' : 'العنوان (إنجليزي)'} *
              </label>
              <input
                type="text"
                required
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {lang === 'en' ? 'Title (Arabic)' : 'العنوان (عربي)'}
              </label>
              <input
                type="text"
                value={newPost.titleAr}
                onChange={(e) => setNewPost({...newPost, titleAr: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="أدخل العنوان..."
                dir="rtl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {lang === 'en' ? 'Content (English)' : 'المحتوى (إنجليزي)'} *
              </label>
              <textarea
                required
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                rows="4"
                placeholder="Enter content..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {lang === 'en' ? 'Content (Arabic)' : 'المحتوى (عربي)'}
              </label>
              <textarea
                value={newPost.contentAr}
                onChange={(e) => setNewPost({...newPost, contentAr: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                rows="4"
                placeholder="أدخل المحتوى..."
                dir="rtl"
              />
            </div>
          </div>

          {/* Type/Category and Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {modalType === 'post' 
                  ? (lang === 'en' ? 'Category' : 'الفئة')
                  : (lang === 'en' ? 'Training Type' : 'نوع التدريب')
                } *
              </label>
              {modalType === 'post' ? (
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
                  <option value="announcement">{lang === 'en' ? '📢 Announcement' : '📢 إعلان'}</option>
                  <option value="educational">{lang === 'en' ? '📚 Educational' : '📚 تعليمي'}</option>
                  <option value="promotional">{lang === 'en' ? '🎯 Promotional' : '🎯 ترويجي'}</option>
                  <option value="events">{lang === 'en' ? '🎉 Events' : '🎉 فعاليات'}</option>
                  <option value="updates">{lang === 'en' ? '📰 Updates' : '📰 تحديثات'}</option>
                </select>
              ) : (
                <select
                  value={newPost.trainingType}
                  onChange={(e) => setNewPost({...newPost, trainingType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                  <option value="training_session">{lang === 'en' ? '📅 Training Session' : '📅 جلسة تدريب'}</option>
                  <option value="training_group">{lang === 'en' ? '👥 Training Group' : '👥 مجموعة تدريب'}</option>
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {lang === 'en' ? 'Visibility' : 'الظهور'} *
              </label>
              <select
                value={newPost.visibility}
                onChange={(e) => setNewPost({...newPost, visibility: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                <option value="public">{lang === 'en' ? '🌐 Public (Everyone)' : '🌐 عام (الجميع)'}</option>
                <option value="members">{lang === 'en' ? '🔒 Members Only' : '🔒 الأعضاء فقط'}</option>
              </select>
            </div>
          </div>

          {/* Date, Time, Location (for training only) */}
          {modalType === 'training' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'en' ? 'Date' : 'التاريخ'}
                  </label>
                  <input
                    type="date"
                    value={newPost.date}
                    onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'en' ? 'Time' : 'الوقت'}
                  </label>
                  <input
                    type="time"
                    value={newPost.time}
                    onChange={(e) => setNewPost({...newPost, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'en' ? 'Max Participants' : 'الحد الأقصى للمشاركين'}
                  </label>
                  <input
                    type="number"
                    value={newPost.maxParticipants}
                    onChange={(e) => setNewPost({...newPost, maxParticipants: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="e.g. 20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'en' ? 'Location (English)' : 'الموقع (إنجليزي)'}
                  </label>
                  <input
                    type="text"
                    value={newPost.location}
                    onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="e.g. Main Court, Cairo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'en' ? 'Location (Arabic)' : 'الموقع (عربي)'}
                  </label>
                  <input
                    type="text"
                    value={newPost.locationAr}
                    onChange={(e) => setNewPost({...newPost, locationAr: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="مثال: الملعب الرئيسي، القاهرة"
                    dir="rtl"
                  />
                </div>
              </div>
            </>
          )}

          {/* Number of Sessions & Days (for training groups) */}
          {modalType === 'training' && newPost.trainingType === 'training_group' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {lang === 'en' ? 'Number of Sessions' : 'عدد الجلسات'}
                </label>
                <input
                  type="number"
                  value={newPost.numberOfSessions}
                  onChange={(e) => setNewPost({...newPost, numberOfSessions: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="e.g. 8"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {lang === 'en' ? 'Session Days' : 'أيام الجلسات'}
                </label>
                <input
                  type="text"
                  value={newPost.sessionDays}
                  onChange={(e) => setNewPost({...newPost, sessionDays: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="e.g. Mon, Wed, Fri"
                />
              </div>
            </div>
          )}

          {/* Attachment (for all posts) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {lang === 'en' ? 'Attachment (Optional)' : 'مرفق (اختياري)'}
            </label>
            <input
              type="url"
              value={newPost.attachment}
              onChange={(e) => setNewPost({...newPost, attachment: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder={lang === 'en' ? 'Image, YouTube, or Instagram URL...' : 'رابط صورة أو يوتيوب أو إنستغرام...'}
            />
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'en' 
                ? '💡 Paste any image, YouTube, or Instagram URL - we\'ll detect it automatically!' 
                : '💡 الصق أي رابط صورة أو يوتيوب أو إنستغرام - سنكتشفه تلقائيًا!'}
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
              {lang === 'en' ? 'Cancel' : 'إلغاء'}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition shadow-lg">
              {modalType === 'post' 
                ? (lang === 'en' ? '✓ Create Post' : '✓ إنشاء منشور')
                : (lang === 'en' ? '✓ Create Session' : '✓ إنشاء جلسة')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
