import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Calendar, CreditCard, MapPin, Clock, Mail, Phone, 
  CheckCircle, X, Plus, Edit2, Trash2, Search, Filter,
  Bell, Menu, LogOut, Home, User, Settings, TrendingUp,
  FileText, Download, Eye, Activity, BarChart3, Save,
  Upload, Image as ImageIcon, DollarSign, AlertCircle,
  ChevronLeft, ChevronRight, RefreshCw, Star, Award,
  Target, Zap, Send, FileDown, Printer, Copy
} from 'lucide-react';

// ============================================
// OPTION C HOME PAGE - FULL IMPLEMENTATION
// Replace the landing page section (lines 1594-1677) with this
// ============================================

function LandingPage({
  lang,
  isRTL,
  t,
  setLang,
  setCurrentPage,
  NotificationToast,
  addNotification,
  posts = [],
  setPosts,
  user,
  handleLogout
}) {

  const [activeSection, setActiveSection] = useState('hero');
  const [newsPosts, setNewsPosts] = useState([
    {
      id: 1,
      type: 'training_group',
      title: lang === 'en' ? 'New Under-22 Training Group Starting!' : 'مجموعة تدريب جديدة تحت 22 تبدأ قريباً!',
      content: lang === 'en' 
        ? 'Join our advanced training program for competitive players. Limited spots available!'
        : 'انضم إلى برنامجنا التدريبي المتقدم للاعبين المحترفين. الأماكن محدودة!',
      image: null,
      videoUrl: null,
      instagramUrl: null,
      groupId: 'tg1',
      date: '2025-01-02',
      author: 'Coach Ahmed'
    },
    {
      id: 2,
      type: 'announcement',
      title: lang === 'en' ? 'Welcome to AMVA 2025!' : 'مرحباً بكم في AMVA 2025!',
      content: lang === 'en'
        ? 'We\'re excited to start the new year with amazing training programs and opportunities for all levels!'
        : 'نحن متحمسون لبدء العام الجديد مع برامج تدريب رائعة وفرص لجميع المستويات!',
      image: null,
      videoUrl: null,
      instagramUrl: null,
      date: '2025-01-01',
      author: 'AMVA Team'
    },
    {
      id: 3,
      type: 'achievement',
      title: lang === 'en' ? 'Tournament Success! 🏆' : 'نجاح في البطولة! 🏆',
      content: lang === 'en'
        ? 'Our Under-18 team won 1st place in the Cairo Regional Championship! Congratulations to all players!'
        : 'فريقنا تحت 18 فاز بالمركز الأول في بطولة القاهرة الإقليمية! تهانينا لجميع اللاعبين!',
      image: null,
      videoUrl: null,
      instagramUrl: null,
      date: '2024-12-28',
      author: 'Coach Ahmed'
    }
  ]);

  // Combine static posts with created posts from admin
  const allPosts = useMemo(() => {
    return [
      ...posts.map(post => ({
        ...post,
        title: lang === 'en' ? post.title : (post.titleAr || post.title),
        content: lang === 'en' ? post.content : (post.contentAr || post.content),
        location: lang === 'en' ? post.location : (post.locationAr || post.location),
        author: lang === 'en' ? post.author : (post.authorAr || post.author)
      })),
      ...newsPosts
    ].filter(post => {
      // Always show public posts (to everyone - logged in or not)
      if (post.visibility === 'public' || !post.visibility) return true;
      
      // Show members-only posts to logged-in users (players, coaches, admins)
      if (post.visibility === 'members') {
        return user !== null;
      }
      
      // Default: hide (not logged in)
      return false;
    });
  }, [posts, newsPosts, lang, user]);

  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      type: 'image',
      title: lang === 'en' ? 'Our Founder' : 'مؤسسنا',
      caption: lang === 'en' ? 'You are the next CHAMP' : 'أنت البطل القادم',
      url: '/images/gallery-image-2.jpeg',
      category: 'training'
    },
    {
      id: 2,
      type: 'image',
      title: lang === 'en' ? 'Team Victory' : 'انتصار الفريق',
      caption: lang === 'en' ? 'Championship celebration' : 'احتفال بالبطولة',
      url: '/images/gallery-image-1.jpg',
      category: 'achievements'
    },
    {
      id: 3,
      type: 'image',
      title: lang === 'en' ? 'Awards' : 'الجوائز',
      caption: lang === 'en' ? '1st Place Trophy' : 'كأس المركز الأول',
      url: '/images/gallery-image-3.jpg',
      category: 'training'
    },
    {
      id: 4,
      type: 'youtube',
      title: lang === 'en' ? 'Simplified Volleyball E1' : 'أالكرة الطائرة المبسطة',
      caption: lang === 'en' ? 'Serve Types' : 'انواع الإرسال',
      url: 'https://www.youtube.com/embed/3g-j4zUc8qk?si=GilJFV0CAN99wmQZ',
      category: 'videos'
    },
    {
      id: 5,
      type: 'instagram',
      title: lang === 'en' ? 'U15 Training Session' : 'جلسة تدريبية تحت 15 سنة',
      caption: lang === 'en' ? 'Watch on Instagram' : 'شاهد على إنستغرام',
      url: 'https://www.instagram.com/reel/CwpmagXrfrj/',
      thumbnail: '/images/instagram-trainingvideo-1.PNG',
      category: 'videos'
    },
     {
      id: 6,
      type: 'instagram',
      title: lang === 'en' ? 'Girls Training Session' : 'جلسة تدريبية للفتيات',
      caption: lang === 'en' ? 'Watch on Instagram' : 'شاهد على إنستغرام',
      url: 'https://www.instagram.com/p/C0jTBYcNcq0/',
      thumbnail: '/images/instagram-trainingvideo-2.PNG',
      category: 'videos'
    }
  ]);

  const academyInfo = {
    mission: lang === 'en' 
      ? 'To develop volleyball talent in Egypt and create future champions through professional training and dedication.'
      : 'تطوير مواهب الكرة الطائرة في مصر وخلق أبطال المستقبل من خلال التدريب الاحترافي والتفاني.',
    vision: lang === 'en'
      ? 'To be the leading volleyball academy in the Middle East, known for excellence in player development.'
      : 'أن نكون الأكاديمية الرائدة للكرة الطائرة في الشرق الأوسط، معروفين بالتميز في تطوير اللاعبين.',
    facilities: lang === 'en'
      ? 'Modern training halls, professional equipment, video analysis systems, and experienced coaching staff.'
      : 'صالات تدريب حديثة، معدات احترافية، أنظمة تحليل الفيديو، وطاقم تدريب من ذوي الخبرة.',
    stats: {
      players: 500,
      years: 3,
      locations: 5,
      coaches: 1
    }
  };

  const coachInfo = {
    name: lang === 'en' ? 'Ahmed Mostafa' : 'أحمد مصطفى',
    bio: lang === 'en'
      ? 'Professional volleyball coach with over 10 years of experience in player development. Former national team player and certified international coach.'
      : 'مدرب كرة طائرة محترف بخبرة تزيد عن 10 سنوات في تطوير اللاعبين. لاعب سابق في المنتخب الوطني ومدرب دولي معتمد.',
    achievements: [
      lang === 'en' ? 'National team player (2008-2015)' : 'لاعب في المنتخب الوطني (2008-2015)',
      lang === 'en' ? 'Championship winner 2012, 2015' : 'بطل 2012، 2015',
      lang === 'en' ? 'Best coach award 2020' : 'جائزة أفضل مدرب 2020',
      lang === 'en' ? 'Developed 30+ professional players' : 'طور أكثر من 30 لاعب محترف'
    ],
    certifications: [
      lang === 'en' ? 'FIVB Level 2 Coaching Certificate' : 'شهادة تدريب FIVB المستوى 2',
      lang === 'en' ? 'Sports Science Degree - Cairo University' : 'درجة علوم الرياضة - جامعة القاهرة',
      lang === 'en' ? 'First Aid & CPR Certified' : 'معتمد في الإسعافات الأولية والإنعاش القلبي الرئوي'
    ]
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle joining a training session/group
  const handleJoinTraining = (post) => {
    if (!user || user.role !== 'player') return;
    
    // Check if already registered
    const existingRegistration = post.registrations?.find(reg => reg.playerId === user.id);
    if (existingRegistration) {
      addNotification(
        lang === 'en' ? 'You already have a request for this training!' : 'لديك بالفعل طلب لهذا التدريب!',
        'warning'
      );
      return;
    }
    
    // Create registration request
    const registration = {
      playerId: user.id,
      playerName: user.name,
      playerNameAr: user.nameAr || user.name,
      playerEmail: user.email,
      status: 'pending', // pending, approved, rejected
      requestDate: new Date().toISOString(),
      approvedBy: null,
      approvedDate: null,
      rejectionReason: null
    };
    
    // Update the post with new registration
    const updatedPosts = posts.map(p => {
      if (p.id === post.id) {
        return {
          ...p,
          registrations: [...(p.registrations || []), registration]
        };
      }
      return p;
    });
    
    setPosts(updatedPosts);
    
    addNotification(
      lang === 'en' 
        ? 'Join request sent successfully! Wait for approval from coaches.' 
        : 'تم إرسال طلب الانضمام بنجاح! انتظر الموافقة من المدربين.',
      'success'
    );
  };

  // Get registration status for a post
  const getRegistrationStatus = (post) => {
    if (!user || !post.registrations) return null;
    return post.registrations.find(reg => reg.playerId === user.id);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <NotificationToast />
      
      {/* FLOATING HEADER - Always Visible */}
<div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
      <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
  <img 
    src="/images/AMVA-logo-1.png" 
    alt="AMVA Logo" 
    className="w-full h-full object-contain"
  />
</div>
      <div>
        <h1 className="text-lg font-bold text-gray-800">AMVA</h1>
        <p className="text-xs text-gray-500">Ahmed Mostafa Volleyball Academy</p>
      </div>
    </div>
    
    <div className="flex items-center gap-3">
      <button 
        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
        className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
        {lang === 'en' ? '🇪🇬 AR' : '🇬🇧 EN'}
      </button>
      
      {user ? (
        // Logged in - show user info, dashboard and logout
        <>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <User size={16} className="text-blue-700" />
            <span className="text-sm font-medium text-gray-800">
              {lang === 'en' ? user.name : (user.nameAr || user.name)}
            </span>
          </div>
          <button 
            onClick={() => {
              setCurrentPage(user.role === 'player' ? 'player-home' : 'admin-dashboard');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md text-sm">
            {lang === 'en' ? 'Dashboard' : 'لوحة التحكم'}
          </button>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition"
            title={lang === 'en' ? 'Logout' : 'تسجيل الخروج'}>
            <LogOut size={20} className="text-red-600" />
          </button>
        </>
      ) : (
        // Not logged in - show login and apply buttons
        <>
          <button 
            onClick={() => setCurrentPage('login')}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
            {t.signIn}
          </button>
          <button 
            onClick={() => {
              window.open(
                'https://docs.google.com/forms/d/e/1FAIpQLSeSpolCMQ9BC-wkP32g4A6_urwxZiUZrF0FyZGEVraUgL9V0w/viewform',
                '_blank'
              );
            }}
            className="px-5 py-2 bg-yellow-400 text-blue-900 rounded-lg font-semibold hover:bg-yellow-500 transition shadow-md">
            {t.applyNow}
          </button>
        </>
      )}
    </div>
  </div>
</div>

      {/* SECTION 1: HERO - Only show when NOT logged in */}
      {!user && (
        <div id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pt-16">
          <div className="text-center px-4 max-w-5xl">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
                {lang === 'en' ? 'Welcome to' : 'مرحباً بك في'}
                <br/>
                <span className="text-yellow-400">AMVA</span>
              </h1>
              <p className="text-2xl md:text-3xl text-blue-100 mb-8">{t.tagline}</p>
              <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto">
                {lang === 'en' 
                  ? 'Join Egypt\'s premier volleyball academy and train with professional coaches in world-class facilities.'
                  : 'انضم إلى أكاديمية الكرة الطائرة الرائدة في مصر وتدرب مع مدربين محترفين في منشآت عالمية المستوى.'}
              </p>
              
              <div className="flex gap-4 justify-center flex-wrap mb-16">
                <button 
                  onClick={() => scrollToSection('news')}
                  className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl">
                  {lang === 'en' ? 'Explore' : 'استكشف'} ↓
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <p className="text-4xl font-bold text-yellow-400">{academyInfo.stats.players}+</p>
                  <p className="text-white mt-2">{lang === 'en' ? 'Players' : 'لاعب'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <p className="text-4xl font-bold text-yellow-400">{academyInfo.stats.years}</p>
                  <p className="text-white mt-2">{lang === 'en' ? 'Years' : 'سنوات'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <p className="text-4xl font-bold text-yellow-400">{academyInfo.stats.locations}</p>
                  <p className="text-white mt-2">{lang === 'en' ? 'Locations' : 'مواقع'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <p className="text-4xl font-bold text-yellow-400">{academyInfo.stats.coaches}</p>
                  <p className="text-white mt-2">{lang === 'en' ? 'Coaches' : 'مدربين'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: NEWS FEED */}
      <div id="news" className={`min-h-screen bg-gray-50 py-20 px-4 ${user ? 'pt-32' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {lang === 'en' ? 'Latest News' : 'آخر الأخبار'}
            </h2>
            <p className="text-xl text-gray-600">
              {lang === 'en' ? 'Stay updated with our latest announcements and achievements' : 'ابقَ على اطلاع بأحدث إعلاناتنا وإنجازاتنا'}
            </p>
          </div>

          <div className="space-y-6">
            {allPosts.map(post => {
              const categoryInfo = getCategoryDisplay(post.type);
              const isPost = post.postType === 'post' || !['training_session', 'training_group'].includes(post.type);
              
              return (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{lang === 'en' ? post.author : (post.authorAr || post.author)}</p>
                    <p className="text-sm text-gray-500">{post.date || new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  {/* Category Badge for Posts */}
                  {isPost && (
                    <span className={`ml-auto px-3 py-1 bg-${categoryInfo.color}-100 text-${categoryInfo.color}-800 rounded-full text-sm font-semibold`}>
                      {categoryInfo.icon} {lang === 'en' ? categoryInfo.nameEn : categoryInfo.nameAr}
                    </span>
                  )}
                  
                  {/* Training Type Badges */}
                  {post.type === 'training_group' && (
                    <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {lang === 'en' ? '👥 Training Group' : '👥 مجموعة تدريب'}
                    </span>
                  )}
                  {post.type === 'training_session' && (
                    <span className="ml-auto px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {lang === 'en' ? '📅 Training Session' : '📅 جلسة تدريب'}
                    </span>
                  )}
                  
                  {/* Visibility Badge */}
                  {post.visibility === 'members' && (
                    <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                      {lang === 'en' ? '🔒 Members Only' : '🔒 للأعضاء فقط'}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">{lang === 'en' ? post.title : (post.titleAr || post.title)}</h3>
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">{lang === 'en' ? post.content : (post.contentAr || post.content)}</p>

                {/* Image */}
                {post.imageUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-auto"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}

                {/* YouTube Embed */}
                {post.videoUrl && getYouTubeEmbedUrl(post.videoUrl) && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <iframe
                      src={getYouTubeEmbedUrl(post.videoUrl)}
                      className="w-full aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Instagram Embed */}
                {post.instagramUrl && getInstagramEmbedUrl(post.instagramUrl) && (
                  <div className="mb-4">
                    <iframe
                      src={getInstagramEmbedUrl(post.instagramUrl)}
                      className="w-full"
                      style={{ minHeight: '500px', border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Training Details */}
                {(post.type === 'training_session' || post.type === 'training_group') && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
                    {post.date && (
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">{lang === 'en' ? 'Date' : 'التاريخ'}</p>
                          <p className="text-sm font-semibold text-gray-800">{post.date}</p>
                        </div>
                      </div>
                    )}
                    {post.time && (
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">{lang === 'en' ? 'Time' : 'الوقت'}</p>
                          <p className="text-sm font-semibold text-gray-800">{post.time}</p>
                        </div>
                      </div>
                    )}
                    {post.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">{lang === 'en' ? 'Location' : 'الموقع'}</p>
                          <p className="text-sm font-semibold text-gray-800">{post.location}</p>
                        </div>
                      </div>
                    )}
                    {post.maxParticipants && (
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">{lang === 'en' ? 'Max' : 'الحد الأقصى'}</p>
                          <p className="text-sm font-semibold text-gray-800">{post.maxParticipants}</p>
                        </div>
                      </div>
                    )}
                    {post.numberOfSessions && (
                      <div className="flex items-center gap-2">
                        <Target size={18} className="text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">{lang === 'en' ? 'Sessions' : 'الجلسات'}</p>
                          <p className="text-sm font-semibold text-gray-800">{post.numberOfSessions}</p>
                        </div>
                      </div>
                    )}
                    {post.sessionDays && (
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">{lang === 'en' ? 'Days' : 'الأيام'}</p>
                          <p className="text-sm font-semibold text-gray-800">{post.sessionDays}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Join Button for Training Posts */}
                {(post.type === 'training_session' || post.type === 'training_group') && user && user.role === 'player' && (() => {
                  const registration = getRegistrationStatus(post);
                  
                  if (registration?.status === 'approved') {
                    return (
                      <div className="w-full py-3 bg-green-100 border-2 border-green-500 text-green-800 rounded-xl font-bold text-center flex items-center justify-center gap-2">
                        <CheckCircle size={20} />
                        {lang === 'en' ? '✓ Registered' : '✓ مسجل'}
                      </div>
                    );
                  }
                  
                  if (registration?.status === 'pending') {
                    return (
                      <div className="w-full py-3 bg-yellow-100 border-2 border-yellow-500 text-yellow-800 rounded-xl font-bold text-center flex items-center justify-center gap-2">
                        <Clock size={20} />
                        {lang === 'en' ? '⏳ Pending Approval' : '⏳ في انتظار الموافقة'}
                      </div>
                    );
                  }
                  
                  if (registration?.status === 'rejected') {
                    return (
                      <div className="w-full py-3 bg-red-100 border-2 border-red-500 text-red-800 rounded-xl font-bold text-center flex items-center justify-center gap-2">
                        <X size={20} />
                        {lang === 'en' ? '✗ Request Declined' : '✗ تم رفض الطلب'}
                      </div>
                    );
                  }
                  
                  // No registration - show Join button
                  return (
                    <button 
                      onClick={() => handleJoinTraining(post)}
                      className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition shadow-lg">
                      {lang === 'en' ? '✓ Join Training' : '✓ انضم للتدريب'}
                    </button>
                  );
                })()}
                
              </div>
            );
            })}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="px-8 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition">
              {lang === 'en' ? 'Learn More About Us ↓' : 'تعرف علينا أكثر ↓'}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: ABOUT */}
      <div id="about" className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {lang === 'en' ? 'About AMVA' : 'عن AMVA'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* About Academy */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-blue-900 mb-6">
                {lang === 'en' ? '🏢 The Academy' : '🏢 الأكاديمية'}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-blue-800 text-lg mb-2">
                    {lang === 'en' ? 'Our Mission' : 'مهمتنا'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{academyInfo.mission}</p>
                </div>

                <div>
                  <h4 className="font-bold text-blue-800 text-lg mb-2">
                    {lang === 'en' ? 'Our Vision' : 'رؤيتنا'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{academyInfo.vision}</p>
                </div>

                <div>
                  <h4 className="font-bold text-blue-800 text-lg mb-2">
                    {lang === 'en' ? 'Facilities' : 'المرافق'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{academyInfo.facilities}</p>
                </div>
              </div>
            </div>

            {/* About Coach */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-yellow-900 mb-6">
                {lang === 'en' ? '👨‍🏫 Coach Ahmed Mostafa' : '👨‍🏫 المدرب أحمد مصطفى'}
              </h3>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">{coachInfo.bio}</p>

                <div>
                  <h4 className="font-bold text-yellow-800 text-lg mb-3">
                    {lang === 'en' ? 'Achievements' : 'الإنجازات'}
                  </h4>
                  <ul className="space-y-2">
                    {coachInfo.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">✓</span>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-yellow-800 text-lg mb-3">
                    {lang === 'en' ? 'Certifications' : 'الشهادات'}
                  </h4>
                  <ul className="space-y-2">
                    {coachInfo.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold">🎓</span>
                        <span className="text-gray-700">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => scrollToSection('gallery')}
              className="px-8 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition">
              {lang === 'en' ? 'View Gallery ↓' : 'عرض المعرض ↓'}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: GALLERY */}
      <div id="gallery" className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {lang === 'en' ? 'Gallery' : 'المعرض'}
            </h2>
            <p className="text-xl text-gray-600">
              {lang === 'en' ? 'Photos and videos from our training sessions' : 'صور وفيديوهات من جلساتنا التدريبية'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map(item => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition">
               {item.type === 'image' && (
        <img 
          src={item.url || item.thumbnail}
          alt={item.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />
      )}
                {item.type === 'youtube' && (
                  <div className="aspect-video">
                    <iframe 
                      src={item.url} 
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {item.type === 'instagram' && (
  <a 
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block relative h-64 cursor-pointer overflow-hidden group">
    
    {/* Background thumbnail image */}
    <img 
      src={item.thumbnail} 
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
    />
    
    {/* Dark overlay on hover */}
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
    
    {/* Instagram logo badge (top right) */}
    <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center shadow-lg">
      <svg className="w-6 h-6" fill="url(#instagram-gradient)" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#833AB4' }} />
            <stop offset="50%" style={{ stopColor: '#E1306C' }} />
            <stop offset="100%" style={{ stopColor: '#FD1D1D' }} />
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </div>
    
    {/* Play button overlay (center) */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
        <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
    
    {/* Bottom caption bar */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <h4 className="text-white font-bold text-lg">{item.title}</h4>
      <p className="text-gray-200 text-sm">{item.caption}</p>
    </div>
  </a>
)}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-gray-200 text-sm">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition">
              {lang === 'en' ? 'Contact Us ↓' : 'تواصل معنا ↓'}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 5: CONTACT & FOOTER */}
      <div id="contact" className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {lang === 'en' ? 'Get in Touch' : 'تواصل معنا'}
            </h2>
            <p className="text-xl text-blue-100">
              {lang === 'en' ? 'Ready to start your volleyball journey?' : 'مستعد لبدء رحلتك في الكرة الطائرة؟'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <Phone size={48} className="text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">
                {lang === 'en' ? 'Phone' : 'الهاتف'}
              </h3>
              <p className="text-blue-100">+20 111 110 8484</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <Mail size={48} className="text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">
                {lang === 'en' ? 'Email' : 'البريد الإلكتروني'}
              </h3>
              <p className="text-blue-100">amvolleyballagency@gmail.com</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <MapPin size={48} className="text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">
                {lang === 'en' ? 'Location' : 'الموقع'}
              </h3>
              <p className="text-blue-100">Cairo, Egypt</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex gap-4 justify-center mb-6">
              <a 
                href="https://instagram.com/amva_eg" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                <span className="text-white text-xl">📷</span>
              </a>
              <a 
                href="https://facebook.com/amva.eg" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                <span className="text-white text-xl">👥</span>
              </a>
              <a 
                href="https://youtube.com/@amva_eg" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                <span className="text-white text-xl">▶️</span>
              </a>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button 
                onClick={() => setCurrentPage('login')}
                className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-xl font-bold text-lg hover:bg-yellow-500 transition shadow-2xl">
                {t.signIn}
              </button>
              <button 
                onClick={() => {
                  window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLSeSpolCMQ9BC-wkP32g4A6_urwxZiUZrF0FyZGEVraUgL9V0w/viewform',
                    '_blank'
                  );
                }}
                className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-2xl">
                {t.applyNow}
              </button>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-blue-200 text-sm">
              © 2025 Ahmed Mostafa Volleyball Academy - All Rights Reserved
            </p>
            <p className="text-blue-300 text-xs mt-2">
              {lang === 'en' ? 'Building Champions Through Excellence' : 'بناء الأبطال من خلال التميز'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function AMVACompleteApp() {
  // ============================================
  // STATE MANAGEMENT - ALL DATA
  // ============================================
  
  const [currentPage, setCurrentPage] = useState('landing');
  const [lang, setLang] = useState(() => localStorage.getItem('amva_language') || 'en');
  const [user, setUser] = useState(null);
  
  // Core Data States
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('amva_users');
    return saved ? JSON.parse(saved) : {
      'player@demo.com': {
        id: 'p1',
        email: 'player@demo.com',
        password: 'player123',
        role: 'player',
        name: 'Ahmed Hassan',
        nameAr: 'أحمد حسن',
        age: 20,
        height: 182,
        position: 'Setter',
        positionAr: 'معد',
        phone: '+20 100 123 4567',
        sessionsRemaining: 5,
        sessionsAttended: 3,
        paymentStatus: 'paid',
        enrolledGroups: ['tg1'],
        profileImage: null,
        registrations: [],
        joinedDate: '2024-11-01'
      },
      'player2@demo.com': {
        id: 'p2',
        email: 'player2@demo.com',
        password: 'player123',
        role: 'player',
        name: 'Mohamed Ali',
        nameAr: 'محمد علي',
        age: 18,
        height: 178,
        position: 'Outside Hitter',
        positionAr: 'ضارب خارجي',
        phone: '+20 101 234 5678',
        sessionsRemaining: 8,
        sessionsAttended: 2,
        paymentStatus: 'paid',
        enrolledGroups: ['tg2'],
        profileImage: null,
        registrations: [],
        joinedDate: '2024-12-01'
      },
      'coach@demo.com': {
        id: 'admin1',
        email: 'coach@demo.com',
        password: 'coach123',
        role: 'admin',
        name: 'Coach Ahmed Mostafa',
        nameAr: 'المدرب أحمد مصطفى'
      },
      'admin@demo.com': {
        id: 'admin2',
        email: 'admin@demo.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        nameAr: 'مدير النظام'
      }
    };
  });

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('amva_sessions');
    return saved ? JSON.parse(saved) : [
      {
        id: 's1',
        date: '2024-12-25',
        time: '18:00',
        location: 'Main Court, Cairo',
        locationAr: 'الملعب الرئيسي، القاهرة',
        maxPlayers: 12,
        coach: 'Coach Ahmed',
        coachAr: 'المدرب أحمد',
        type: 'Training',
        typeAr: 'تدريب'
      },
      {
        id: 's2',
        date: '2024-12-27',
        time: '19:00',
        location: 'Secondary Court, Cairo',
        locationAr: 'الملعب الثانوي، القاهرة',
        maxPlayers: 10,
        coach: 'Coach Ahmed',
        coachAr: 'المدرب أحمد',
        type: 'Practice Match',
        typeAr: 'مباراة تدريبية'
      },
      {
        id: 's3',
        date: '2024-12-28',
        time: '17:00',
        location: 'Main Court, Cairo',
        locationAr: 'الملعب الرئيسي، القاهرة',
        maxPlayers: 12,
        coach: 'Coach Ahmed',
        coachAr: 'المدرب أحمد',
        type: 'Skill Development',
        typeAr: 'تطوير المهارات'
      }
    ];
  });

  const [trainingGroups, setTrainingGroups] = useState(() => {
    const saved = localStorage.getItem('amva_training_groups');
    return saved ? JSON.parse(saved) : [
      {
        id: 'tg1',
        name: 'Under 22 Boys - January',
        nameAr: 'تحت 22 بنين - يناير',
        description: 'Advanced training for competitive players under 22. Focus on techniques, tactics, and team play.',
        descriptionAr: 'تدريب متقدم للاعبين المحترفين تحت 22. التركيز على التقنيات والتكتيكات واللعب الجماعي.',
        price: 'EGP 800',
        schedule: 'Mon, Wed, Fri - 6:00 PM',
        scheduleAr: 'الاثنين، الأربعاء، الجمعة - 6:00 مساءً',
        capacity: 12,
        enrolled: 8,
        coach: 'Coach Ahmed Mostafa',
        coachAr: 'المدرب أحمد مصطفى',
        level: 'Advanced',
        levelAr: 'متقدم',
        ageGroup: '18-22',
        sessions: [
          {
            id: 'tgs1',
            date: '2025-01-05',
            time: '18:00',
            location: 'Main Court',
            locationAr: 'الملعب الرئيسي',
            maxPlayers: 12
          },
          {
            id: 'tgs2',
            date: '2025-01-08',
            time: '18:00',
            location: 'Main Court',
            locationAr: 'الملعب الرئيسي',
            maxPlayers: 12
          },
          {
            id: 'tgs3',
            date: '2025-01-10',
            time: '18:00',
            location: 'Main Court',
            locationAr: 'الملعب الرئيسي',
            maxPlayers: 12
          },
          {
            id: 'tgs4',
            date: '2025-01-12',
            time: '18:00',
            location: 'Main Court',
            locationAr: 'الملعب الرئيسي',
            maxPlayers: 12
          }
        ]
      },
      {
        id: 'tg2',
        name: 'Beginners - Weekend',
        nameAr: 'المبتدئين - نهاية الأسبوع',
        description: 'Perfect for those starting their volleyball journey. Learn basics and fundamentals.',
        descriptionAr: 'مثالي للمبتدئين في رحلة الكرة الطائرة. تعلم الأساسيات والمبادئ.',
        price: 'EGP 600',
        schedule: 'Sat, Sun - 10:00 AM',
        scheduleAr: 'السبت، الأحد - 10:00 صباحاً',
        capacity: 15,
        enrolled: 12,
        coach: 'Coach Mahmoud',
        coachAr: 'المدرب محمود',
        level: 'Beginner',
        levelAr: 'مبتدئ',
        ageGroup: '16-25',
        sessions: [
          {
            id: 'tgs5',
            date: '2025-01-06',
            time: '10:00',
            location: 'Training Hall',
            locationAr: 'صالة التدريب',
            maxPlayers: 15
          },
          {
            id: 'tgs6',
            date: '2025-01-07',
            time: '10:00',
            location: 'Training Hall',
            locationAr: 'صالة التدريب',
            maxPlayers: 15
          }
        ]
      },
      {
        id: 'tg3',
        name: 'Professional Team',
        nameAr: 'الفريق المحترف',
        description: 'Elite training for tournament preparation and professional development.',
        descriptionAr: 'تدريب النخبة للإعداد للبطولات والتطوير المهني.',
        price: 'EGP 1200',
        schedule: 'Mon-Fri - 5:00 PM',
        scheduleAr: 'الإثنين-الجمعة - 5:00 مساءً',
        capacity: 10,
        enrolled: 10,
        coach: 'Coach Ahmed Mostafa',
        coachAr: 'المدرب أحمد مصطفى',
        level: 'Professional',
        levelAr: 'محترف',
        ageGroup: '20-30',
        sessions: []
      }
    ];
  });

  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('amva_news');
    return saved ? JSON.parse(saved) : [
      {
        id: 'n1',
        title: 'Training Schedule Update - January 2025',
        titleAr: 'تحديث جدول التدريب - يناير 2025',
        content: 'New training times for January 2025. All players please check your schedules. We have added more sessions for advanced groups.',
        contentAr: 'مواعيد تدريب جديدة لشهر يناير 2025. يرجى من جميع اللاعبين التحقق من جداولهم. لقد أضفنا المزيد من الجلسات للمجموعات المتقدمة.',
        date: '2024-12-20',
        author: 'AMVA Admin',
        category: 'Schedule',
        categoryAr: 'الجدول',
        priority: 'high'
      },
      {
        id: 'n2',
        title: 'Holiday Notice - New Year Break',
        titleAr: 'إشعار العطلة - استراحة العام الجديد',
        content: 'Academy will be closed from Dec 31 to Jan 2 for New Year celebrations. Regular training resumes Jan 3rd.',
        contentAr: 'ستغلق الأكاديمية من 31 ديسمبر إلى 2 يناير للاحتفال بالعام الجديد. يستأنف التدريب المنتظم في 3 يناير.',
        date: '2024-12-18',
        author: 'AMVA Admin',
        category: 'Announcement',
        categoryAr: 'إعلان',
        priority: 'medium'
      },
      {
        id: 'n3',
        title: 'New Equipment Arrival',
        titleAr: 'وصول معدات جديدة',
        content: 'Professional volleyball equipment has arrived! New balls, nets, and training aids now available.',
        contentAr: 'وصلت معدات الكرة الطائرة الاحترافية! كرات وشباك ووسائل تدريب جديدة متاحة الآن.',
        date: '2024-12-15',
        author: 'AMVA Admin',
        category: 'Equipment',
        categoryAr: 'المعدات',
        priority: 'low'
      },
      {
        id: 'n4',
        title: 'Tournament Registration Open',
        titleAr: 'التسجيل في البطولة مفتوح',
        content: 'Registration is now open for the Cairo Volleyball Championship 2025. Contact admin for details.',
        contentAr: 'التسجيل مفتوح الآن لبطولة القاهرة للكرة الطائرة 2025. اتصل بالإدارة للحصول على التفاصيل.',
        date: '2024-12-10',
        author: 'AMVA Admin',
        category: 'Tournament',
        categoryAr: 'البطولة',
        priority: 'high'
      }
    ];
  });

  // Posts state (for coaches/admins to create)
const [posts, setPosts] = useState(() => {
  const saved = localStorage.getItem('amva_posts');
  return saved ? JSON.parse(saved) : [];
});

// Post creation modal state
const [showCreatePostModal, setShowCreatePostModal] = useState(false);
const [newPost, setNewPost] = useState({
  title: '',
  titleAr: '',
  content: '',
  contentAr: '',
  type: 'post', // 'post' or 'training'
  category: 'announcement', // For posts: announcement, educational, promotional, events, updates
  trainingType: 'training_session', // For training: training_session, training_group
  visibility: 'public', // public, members
  date: '',
  time: '',
  location: '',
  locationAr: '',
  maxParticipants: '',
  numberOfSessions: '',
  sessionDays: '',
  imageUrl: '',
  videoUrl: '',
  instagramUrl: ''
});

// Save posts to localStorage whenever they change
useEffect(() => {
  localStorage.setItem('amva_posts', JSON.stringify(posts));
}, [posts]);
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('amva_applications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'app1',
        fullName: 'Mohamed Ali',
        fullNameAr: 'محمد علي',
        email: 'mohamed@email.com',
        phone: '+20 101 234 5678',
        dateOfBirth: '2005-05-15',
        gender: 'male',
        height: 178,
        weight: 72,
        position: 'Outside Hitter',
        positionAr: 'ضارب خارجي',
        experience: 'intermediate',
        experienceAr: 'متوسط',
        previousClubs: 'Cairo Youth Club',
        previousClubsAr: 'نادي القاهرة للشباب',
        medicalConditions: 'None',
        medicalConditionsAr: 'لا يوجد',
        emergencyContact: 'Ali Mohamed - +20 100 111 2222',
        status: 'pending',
        submittedDate: '2024-12-20',
        notes: ''
      },
      {
        id: 'app2',
        fullName: 'Youssef Ibrahim',
        fullNameAr: 'يوسف إبراهيم',
        email: 'youssef@email.com',
        phone: '+20 102 345 6789',
        dateOfBirth: '2003-08-20',
        gender: 'male',
        height: 185,
        weight: 80,
        position: 'Middle Blocker',
        positionAr: 'صادّ وسط',
        experience: 'advanced',
        experienceAr: 'متقدم',
        previousClubs: 'Alexandria Volleyball Academy',
        previousClubsAr: 'أكاديمية الإسكندرية للكرة الطائرة',
        medicalConditions: 'None',
        medicalConditionsAr: 'لا يوجد',
        emergencyContact: 'Ibrahim Youssef - +20 100 222 3333',
        status: 'accepted',
        submittedDate: '2024-12-15',
        notes: 'Excellent blocker, tournament experience'
      }
    ];
  });

  const [registrationRequests, setRegistrationRequests] = useState(() => {
    const saved = localStorage.getItem('amva_registration_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'reg1',
        playerId: 'p1',
        playerEmail: 'player@demo.com',
        playerName: 'Ahmed Hassan',
        playerNameAr: 'أحمد حسن',
        trainingGroupId: 'tg1',
        trainingGroupName: 'Under 22 Boys - January',
        trainingGroupNameAr: 'تحت 22 بنين - يناير',
        sessionIds: ['tgs1', 'tgs2', 'tgs3', 'tgs4'],
        amount: 'EGP 800',
        paymentMethod: 'bank_transfer',
        paymentProof: null,
        status: 'approved',
        requestDate: '2024-12-10',
        paymentDate: '2024-12-11',
        approvalDate: '2024-12-12',
        notes: 'Payment verified'
      }
    ];
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('amva_attendance');
    return saved ? JSON.parse(saved) : [
      {
        id: 'att1',
        sessionId: 's1',
        playerId: 'p1',
        playerEmail: 'player@demo.com',
        playerName: 'Ahmed Hassan',
        playerNameAr: 'أحمد حسن',
        date: '2024-12-20',
        time: '18:00',
        location: 'Main Court',
        locationAr: 'الملعب الرئيسي',
        status: 'present',
        checkInTime: '2024-12-20T17:55:00',
        checkInMethod: 'admin',
        notes: ''
      },
      {
        id: 'att2',
        sessionId: 's2',
        playerId: 'p1',
        playerEmail: 'player@demo.com',
        playerName: 'Ahmed Hassan',
        playerNameAr: 'أحمد حسن',
        date: '2024-12-18',
        time: '19:00',
        location: 'Secondary Court',
        locationAr: 'الملعب الثانوي',
        status: 'present',
        checkInTime: '2024-12-18T18:50:00',
        checkInMethod: 'admin',
        notes: ''
      },
      {
        id: 'att3',
        sessionId: 's1',
        playerId: 'p2',
        playerEmail: 'player2@demo.com',
        playerName: 'Mohamed Ali',
        playerNameAr: 'محمد علي',
        date: '2024-12-20',
        time: '18:00',
        location: 'Main Court',
        locationAr: 'الملعب الرئيسي',
        status: 'present',
        checkInTime: '2024-12-20T17:58:00',
        checkInMethod: 'admin',
        notes: ''
      }
    ];
  });

  // UI States
  const [selectedTrainingGroup, setSelectedTrainingGroup] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showAddSession, setShowAddSession] = useState(false);
  const [showAddNews, setShowAddNews] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showAddApplication, setShowAddApplication] = useState(false);

  // Search & Filter States
  const [playerSearchQuery, setPlayerSearchQuery] = useState('');
  const [playerFilterStatus, setPlayerFilterStatus] = useState('all');
  const [playerFilterGroup, setPlayerFilterGroup] = useState('all');
  const [playerSortBy, setPlayerSortBy] = useState('name');
  
  const [groupSearchQuery, setGroupSearchQuery] = useState('');
  const [groupFilterSchedule, setGroupFilterSchedule] = useState('all');
  const [groupFilterPrice, setGroupFilterPrice] = useState('all');
  const [groupFilterLevel, setGroupFilterLevel] = useState('all');
  
  const [newsSearchQuery, setNewsSearchQuery] = useState('');
  const [newsFilterCategory, setNewsFilterCategory] = useState('all');
  
  const [sessionSearchDate, setSessionSearchDate] = useState('');
  const [applicationFilterStatus, setApplicationFilterStatus] = useState('all');

  // Analytics State
  const [selectedReportType, setSelectedReportType] = useState('revenue');
  const [analyticsDateRange, setAnalyticsDateRange] = useState('all');

  // Registration Flow State
  const [registrationStep, setRegistrationStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({});

  // Notification State
  const [notifications, setNotifications] = useState([]);
  
  // Calendar states
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Filter states
  const [attendanceFilterPeriod, setAttendanceFilterPeriod] = useState('all');
  const [newsFilterType, setNewsFilterType] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Manage News states
  const [editingPost, setEditingPost] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [modalType, setModalType] = useState('post'); // 'post' or 'training'

  // ============================================
  // PERSISTENCE - Save to localStorage
  // ============================================
  
  useEffect(() => { localStorage.setItem('amva_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('amva_sessions', JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { localStorage.setItem('amva_training_groups', JSON.stringify(trainingGroups)); }, [trainingGroups]);
  useEffect(() => { localStorage.setItem('amva_news', JSON.stringify(news)); }, [news]);
  useEffect(() => { localStorage.setItem('amva_applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('amva_registration_requests', JSON.stringify(registrationRequests)); }, [registrationRequests]);
  useEffect(() => { localStorage.setItem('amva_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('amva_language', lang); }, [lang]);

  // ============================================
  // TRANSLATIONS - COMPLETE
  // ============================================
  
  const translations = {
    en: {
      // Navigation & Auth
      welcome: 'Welcome to AMVA',
      tagline: 'Building Champions Through Excellence',
      applyNow: 'Apply Now',
      signIn: 'Sign In',
      home: 'Home',
      profile: 'Profile',
      trainingGroups: 'Training Groups',
      schedule: 'Schedule',
      payment: 'Payment',
      logout: 'Logout',
      adminDashboard: 'Admin Dashboard',
      analytics: 'Analytics',
      
      // Common Terms
      email: 'Email',
      password: 'Password',
      login: 'Login',
      name: 'Name',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      price: 'Price',
      status: 'Status',
      actions: 'Actions',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      submit: 'Submit',
      close: 'Close',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      finish: 'Finish',
      
      // Player Dashboard
      sessionsRemaining: 'Sessions Remaining',
      sessionsAttended: 'Sessions Attended',
      paymentStatus: 'Payment Status',
      latestNews: 'Latest News',
      myAttendance: 'My Attendance',
      attendanceRate: 'Attendance Rate',
      myRegistrations: 'My Registrations',
      membershipCard: 'Membership Card',
      
      // Admin Pages
      applications: 'Applications',
      sessions: 'Sessions',
      news: 'News',
      players: 'Players',
      manageSessions: 'Manage Sessions',
      manageNews: 'Manage News',
      manageGroups: 'Manage Training Groups',
      addSession: 'Add Session',
      addNews: 'Add News',
      addGroup: 'Add Training Group',
      viewDetails: 'View Details',
      acceptApplication: 'Accept',
      rejectApplication: 'Reject',
      attendanceManagement: 'Attendance Management',
      
      // Search & Filters
      searchPlayers: 'Search players...',
      searchGroups: 'Search training groups...',
      searchNews: 'Search news...',
      sortByName: 'Sort by Name',
      sortByEmail: 'Sort by Email',
      sortBySessions: 'Sort by Sessions',
      filterByStatus: 'Filter by Status',
      filterByGroup: 'Filter by Group',
      allStatus: 'All Status',
      clearFilters: 'Clear Filters',
      showing: 'Showing',
      results: 'results',
      
      // Attendance
      markAttendance: 'Mark Attendance',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      attendanceHistory: 'Attendance History',
      noAttendanceYet: 'No attendance records yet',
      checkIn: 'Check In',
      checkInTime: 'Check-in Time',
      totalAttendance: 'Total Attendance',
      todaysAttendance: "Today's Attendance",
      
      // Analytics
      reportsAnalytics: 'Reports & Analytics',
      revenue: 'Revenue',
      totalRevenue: 'Total Revenue',
      pendingRevenue: 'Pending Revenue',
      totalPlayers: 'Total Players',
      activePlayers: 'Active Players',
      inactivePlayers: 'Inactive Players',
      exportReport: 'Export Report',
      downloadPDF: 'Download PDF',
      downloadExcel: 'Download Excel',
      averageRate: 'Average Rate',
      transactions: 'Transactions',
      
      // Training Groups
      viewRegister: 'View & Register',
      registerNow: 'Register Now',
      enrolled: 'Enrolled',
      capacity: 'Capacity',
      coach: 'Coach',
      level: 'Level',
      ageGroup: 'Age Group',
      scheduleTime: 'Schedule',
      groupDetails: 'Group Details',
      
      // Registration Process
      selectSessions: 'Select Sessions',
      paymentProcess: 'Payment Process',
      choosePaymentMethod: 'Choose Payment Method',
      bankTransfer: 'Bank Transfer',
      vodafoneCash: 'Vodafone Cash',
      instaPay: 'InstaPay',
      cashPayment: 'Cash Payment',
      uploadProof: 'Upload Payment Proof',
      paymentNotes: 'Payment Notes',
      requestSubmitted: 'Request Submitted',
      pendingApproval: 'Pending Approval',
      
      // Application Form
      applicationForm: 'Application Form',
      personalInfo: 'Personal Information',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
      position: 'Position',
      experience: 'Experience Level',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      previousClubs: 'Previous Clubs',
      medicalConditions: 'Medical Conditions',
      emergencyContact: 'Emergency Contact',
      
      // Messages & Alerts
      noNewsYet: 'No news yet',
      noSessionsYet: 'No sessions yet',
      noGroupsYet: 'No training groups yet',
      noPlayersFound: 'No players found',
      noApplicationsYet: 'No applications yet',
      loginSuccess: 'Login successful!',
      logoutSuccess: 'Logged out successfully',
      applicationSubmitted: 'Application submitted successfully!',
      attendanceMarked: 'Attendance marked successfully',
      dataUpdated: 'Data updated successfully',
      errorOccurred: 'An error occurred',
      
      // Misc
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      trainingPrograms: 'Training Programs',
      facilities: 'Facilities',
      ourTeam: 'Our Team',
      testimonials: 'Testimonials',
      gallery: 'Gallery',
      faq: 'FAQ',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
    },
    ar: {
      // Navigation & Auth
      welcome: 'مرحباً بك في AMVA',
      tagline: 'بناء الأبطال من خلال التميز',
      applyNow: 'قدم الآن',
      signIn: 'تسجيل الدخول',
      home: 'الرئيسية',
      profile: 'الملف الشخصي',
      trainingGroups: 'مجموعات التدريب',
      schedule: 'الجدول',
      payment: 'الدفع',
      logout: 'خروج',
      adminDashboard: 'لوحة تحكم الإدارة',
      analytics: 'التحليلات',
      
      // Common Terms
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      login: 'دخول',
      name: 'الاسم',
      date: 'التاريخ',
      time: 'الوقت',
      location: 'الموقع',
      price: 'السعر',
      status: 'الحالة',
      actions: 'الإجراءات',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      view: 'عرض',
      search: 'بحث',
      filter: 'تصفية',
      all: 'الكل',
      active: 'نشط',
      inactive: 'غير نشط',
      pending: 'قيد الانتظار',
      approved: 'مقبول',
      rejected: 'مرفوض',
      submit: 'إرسال',
      close: 'إغلاق',
      confirm: 'تأكيد',
      back: 'رجوع',
      next: 'التالي',
      finish: 'إنهاء',
      
      // Player Dashboard
      sessionsRemaining: 'التدريبات المتبقية',
      sessionsAttended: 'التدريبات المحضورة',
      paymentStatus: 'حالة الدفع',
      latestNews: 'آخر الأخبار',
      myAttendance: 'سجل حضوري',
      attendanceRate: 'نسبة الحضور',
      myRegistrations: 'تسجيلاتي',
      membershipCard: 'بطاقة العضوية',
      
      // Admin Pages
      applications: 'الطلبات',
      sessions: 'التدريبات',
      news: 'الأخبار',
      players: 'اللاعبين',
      manageSessions: 'إدارة التدريبات',
      manageNews: 'إدارة الأخبار',
      manageGroups: 'إدارة مجموعات التدريب',
      addSession: 'إضافة تدريب',
      addNews: 'إضافة خبر',
      addGroup: 'إضافة مجموعة تدريب',
      viewDetails: 'عرض التفاصيل',
      acceptApplication: 'قبول',
      rejectApplication: 'رفض',
      attendanceManagement: 'إدارة الحضور',
      
      // Search & Filters
      searchPlayers: 'البحث عن اللاعبين...',
      searchGroups: 'البحث في مجموعات التدريب...',
      searchNews: 'البحث في الأخبار...',
      sortByName: 'ترتيب بالاسم',
      sortByEmail: 'ترتيب بالبريد',
      sortBySessions: 'ترتيب بالتدريبات',
      filterByStatus: 'تصفية بالحالة',
      filterByGroup: 'تصفية بالمجموعة',
      allStatus: 'كل الحالات',
      clearFilters: 'مسح الفلاتر',
      showing: 'عرض',
      results: 'نتيجة',
      
      // Attendance
      markAttendance: 'تسجيل الحضور',
      present: 'حاضر',
      absent: 'غائب',
      late: 'متأخر',
      attendanceHistory: 'سجل الحضور',
      noAttendanceYet: 'لا يوجد سجل حضور بعد',
      checkIn: 'تسجيل الدخول',
      checkInTime: 'وقت التسجيل',
      totalAttendance: 'إجمالي الحضور',
      todaysAttendance: 'حضور اليوم',
      
      // Analytics
      reportsAnalytics: 'التقارير والتحليلات',
      revenue: 'الإيرادات',
      totalRevenue: 'إجمالي الإيرادات',
      pendingRevenue: 'الإيرادات المعلقة',
      totalPlayers: 'إجمالي اللاعبين',
      activePlayers: 'اللاعبين النشطين',
      inactivePlayers: 'اللاعبين غير النشطين',
      exportReport: 'تصدير التقرير',
      downloadPDF: 'تحميل PDF',
      downloadExcel: 'تحميل Excel',
      averageRate: 'متوسط النسبة',
      transactions: 'المعاملات',
      
      // Training Groups
      viewRegister: 'عرض والتسجيل',
      registerNow: 'سجل الآن',
      enrolled: 'المسجلين',
      capacity: 'السعة',
      coach: 'المدرب',
      level: 'المستوى',
      ageGroup: 'الفئة العمرية',
      scheduleTime: 'الجدول',
      groupDetails: 'تفاصيل المجموعة',
      
      // Registration Process
      selectSessions: 'اختر التدريبات',
      paymentProcess: 'عملية الدفع',
      choosePaymentMethod: 'اختر طريقة الدفع',
      bankTransfer: 'تحويل بنكي',
      vodafoneCash: 'فودافون كاش',
      instaPay: 'إنستا باي',
      cashPayment: 'دفع نقدي',
      uploadProof: 'رفع إثبات الدفع',
      paymentNotes: 'ملاحظات الدفع',
      requestSubmitted: 'تم إرسال الطلب',
      pendingApproval: 'في انتظار الموافقة',
      
      // Application Form
      applicationForm: 'نموذج التقديم',
      personalInfo: 'المعلومات الشخصية',
      fullName: 'الاسم الكامل',
      phoneNumber: 'رقم الهاتف',
      dateOfBirth: 'تاريخ الميلاد',
      gender: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
      height: 'الطول (سم)',
      weight: 'الوزن (كجم)',
      position: 'المركز',
      experience: 'مستوى الخبرة',
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
      previousClubs: 'الأندية السابقة',
      medicalConditions: 'الحالات الطبية',
      emergencyContact: 'جهة الاتصال في حالات الطوارئ',
      
      // Messages & Alerts
      noNewsYet: 'لا توجد أخبار بعد',
      noSessionsYet: 'لا توجد تدريبات بعد',
      noGroupsYet: 'لا توجد مجموعات تدريب بعد',
      noPlayersFound: 'لا توجد نتائج',
      noApplicationsYet: 'لا توجد طلبات بعد',
      loginSuccess: 'تم تسجيل الدخول بنجاح!',
      logoutSuccess: 'تم تسجيل الخروج بنجاح',
      applicationSubmitted: 'تم إرسال الطلب بنجاح!',
      attendanceMarked: 'تم تسجيل الحضور بنجاح',
      dataUpdated: 'تم تحديث البيانات بنجاح',
      errorOccurred: 'حدث خطأ',
      
      // Misc
      aboutUs: 'من نحن',
      contactUs: 'اتصل بنا',
      trainingPrograms: 'برامج التدريب',
      facilities: 'المرافق',
      ourTeam: 'فريقنا',
      testimonials: 'الشهادات',
      gallery: 'المعرض',
      faq: 'الأسئلة الشائعة',
      privacyPolicy: 'سياسة الخصوصية',
      termsConditions: 'الشروط والأحكام',
    }
  };

  const t = translations[lang];
  const isRTL = lang === 'ar';
  const ADMIN_EMAILS = ['coach@demo.com', 'admin@amva-eg.com'];
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  // ============================================
  // CORE FUNCTIONS
  // ============================================

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const foundUser = users[email];
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      setCurrentPage(foundUser.role === 'admin' ? 'admin-dashboard' : 'player-home');
      addNotification(t.loginSuccess, 'success');
    } else {
      addNotification(lang === 'en' ? 'Invalid credentials' : 'بيانات دخول خاطئة', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
    addNotification(t.logoutSuccess, 'success');
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Handle creating a new post
// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  try {
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
};

// Helper function to get Instagram embed URL
const getInstagramEmbedUrl = (url) => {
  if (!url || !url.includes('instagram.com')) return null;
  try {
    // Remove trailing slash
    const cleanUrl = url.replace(/\/$/, '');
    return `${cleanUrl}/embed`;
  } catch {
    return null;
  }
};

// Helper function to get category icon and name
const getCategoryDisplay = (category) => {
  const categories = {
    announcement: { icon: '📢', nameEn: 'Announcement', nameAr: 'إعلان', color: 'purple' },
    educational: { icon: '📚', nameEn: 'Educational', nameAr: 'تعليمي', color: 'blue' },
    promotional: { icon: '🎯', nameEn: 'Promotional', nameAr: 'ترويجي', color: 'orange' },
    events: { icon: '🎉', nameEn: 'Events', nameAr: 'فعاليات', color: 'pink' },
    updates: { icon: '📰', nameEn: 'Updates', nameAr: 'تحديثات', color: 'teal' }
  };
  return categories[category] || categories.announcement;
};

const handleCreatePost = (e) => {
  e.preventDefault();
  
  // Validation
  if (!newPost.title || !newPost.content) {
    addNotification(lang === 'en' ? 'Please fill in all required fields' : 'يرجى ملء جميع الحقول المطلوبة', 'error');
    return;
  }
  
  // Determine the actual type for the post
  let actualType;
  if (newPost.type === 'training') {
    actualType = newPost.trainingType; // 'training_session' or 'training_group'
  } else {
    actualType = newPost.category; // 'announcement', 'educational', etc.
  }
  
  // Create post object
  const post = {
    id: `post${Date.now()}`,
    title: newPost.title,
    titleAr: newPost.titleAr || newPost.title,
    content: newPost.content,
    contentAr: newPost.contentAr || newPost.content,
    type: actualType,
    postType: newPost.type, // 'post' or 'training'
    visibility: newPost.visibility,
    date: newPost.date || null,
    time: newPost.time,
    location: newPost.location,
    locationAr: newPost.locationAr || newPost.location,
    maxParticipants: newPost.maxParticipants ? parseInt(newPost.maxParticipants) : null,
    numberOfSessions: newPost.numberOfSessions ? parseInt(newPost.numberOfSessions) : null,
    sessionDays: newPost.sessionDays,
    imageUrl: newPost.imageUrl,
    videoUrl: newPost.videoUrl,
    instagramUrl: newPost.instagramUrl,
    author: user.name,
    authorAr: user.nameAr || user.name,
    createdAt: new Date().toISOString(),
    registrations: [] // Track who joined
  };
  
  // Add to posts array
  setPosts([post, ...posts]);
  
  // Reset form
  setNewPost({
    title: '',
    titleAr: '',
    content: '',
    contentAr: '',
    type: 'post',
    category: 'announcement',
    trainingType: 'training_session',
    visibility: 'public',
    date: '',
    time: '',
    location: '',
    locationAr: '',
    maxParticipants: '',
    numberOfSessions: '',
    sessionDays: '',
    imageUrl: '',
    videoUrl: '',
    instagramUrl: ''
  });
  
  // Close modal
  setShowCreatePostModal(false);
  
  // Success notification
  addNotification(
    lang === 'en' ? 'Post created successfully!' : 'تم إنشاء المنشور بنجاح!',
    'success'
  );
};
  
  // ============================================
  // SEARCH & FILTER FUNCTIONS - ADVANCED
  // ============================================

  const getFilteredPlayers = () => {
    let players = Object.values(users).filter(u => u.role === 'player');
    
    // Search by name, email, or phone
    if (playerSearchQuery) {
      const query = playerSearchQuery.toLowerCase();
      players = players.filter(p => 
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.nameAr && p.nameAr.includes(playerSearchQuery)) ||
        (p.email && p.email.toLowerCase().includes(query)) ||
        (p.phone && p.phone.includes(playerSearchQuery)) ||
        (p.position && p.position.toLowerCase().includes(query))
      );
    }
    
    // Filter by active/inactive status
    if (playerFilterStatus !== 'all') {
      players = players.filter(p => 
        playerFilterStatus === 'active' ? (p.sessionsRemaining > 0) : (p.sessionsRemaining === 0)
      );
    }
    
    // Filter by training group
    if (playerFilterGroup !== 'all') {
      players = players.filter(p => 
        p.enrolledGroups && p.enrolledGroups.includes(playerFilterGroup)
      );
    }
    
    // Sort
    players.sort((a, b) => {
      if (playerSortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      } else if (playerSortBy === 'email') {
        return (a.email || '').localeCompare(b.email || '');
      } else if (playerSortBy === 'sessions') {
        return (b.sessionsRemaining || 0) - (a.sessionsRemaining || 0);
      } else if (playerSortBy === 'joinDate') {
        return new Date(b.joinedDate || 0) - new Date(a.joinedDate || 0);
      }
      return 0;
    });
    
    return players;
  };

  const getFilteredGroups = () => {
    let groups = [...trainingGroups];
    
    // Search by name or description
    if (groupSearchQuery) {
      const query = groupSearchQuery.toLowerCase();
      groups = groups.filter(g => 
        (g.name && g.name.toLowerCase().includes(query)) ||
        (g.nameAr && g.nameAr.includes(groupSearchQuery)) ||
        (g.description && g.description.toLowerCase().includes(query)) ||
        (g.descriptionAr && g.descriptionAr.includes(groupSearchQuery)) ||
        (g.coach && g.coach.toLowerCase().includes(query))
      );
    }
    
    // Filter by schedule (weekday/weekend)
    if (groupFilterSchedule !== 'all') {
      groups = groups.filter(g => {
        const hasWeekdaySessions = g.sessions.some(s => {
          const day = new Date(s.date).getDay();
          return day >= 1 && day <= 5; // Monday to Friday
        });
        const hasWeekendSessions = g.sessions.some(s => {
          const day = new Date(s.date).getDay();
          return day === 0 || day === 6; // Saturday or Sunday
        });
        
        if (groupFilterSchedule === 'weekday') return hasWeekdaySessions;
        if (groupFilterSchedule === 'weekend') return hasWeekendSessions;
        return true;
      });
    }
    
    // Filter by price range
    if (groupFilterPrice !== 'all') {
      groups = groups.filter(g => {
        const price = parseInt(g.price.replace(/[^0-9]/g, '')) || 0;
        if (groupFilterPrice === 'low') return price < 600;
        if (groupFilterPrice === 'medium') return price >= 600 && price <= 1000;
        if (groupFilterPrice === 'high') return price > 1000;
        return true;
      });
    }
    
    // Filter by level
    if (groupFilterLevel !== 'all') {
      groups = groups.filter(g => 
        g.level && g.level.toLowerCase() === groupFilterLevel.toLowerCase()
      );
    }
    
    return groups;
  };

  const getFilteredNews = () => {
    let filteredNews = [...news];
    
    // Search in title and content
    if (newsSearchQuery) {
      const query = newsSearchQuery.toLowerCase();
      filteredNews = filteredNews.filter(n => 
        (n.title && n.title.toLowerCase().includes(query)) ||
        (n.titleAr && n.titleAr.includes(newsSearchQuery)) ||
        (n.content && n.content.toLowerCase().includes(query)) ||
        (n.contentAr && n.contentAr.includes(newsSearchQuery)) ||
        (n.author && n.author.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (newsFilterCategory !== 'all') {
      filteredNews = filteredNews.filter(n => 
        n.category && n.category.toLowerCase() === newsFilterCategory.toLowerCase()
      );
    }
    
    // Sort by date (newest first)
    filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return filteredNews;
  };

  const getFilteredSessions = () => {
    let filteredSessions = [...sessions];
    
    // Filter by date
    if (sessionSearchDate) {
      filteredSessions = filteredSessions.filter(s => 
        s.date && s.date.includes(sessionSearchDate)
      );
    }
    
    // Sort by date
    filteredSessions.sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateA - dateB;
    });
    
    return filteredSessions;
  };

  const getFilteredApplications = () => {
    let filteredApps = [...applications];
    
    // Filter by status
    if (applicationFilterStatus !== 'all') {
      filteredApps = filteredApps.filter(a => a.status === applicationFilterStatus);
    }
    
    // Sort by date (newest first)
    filteredApps.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate));
    
    return filteredApps;
  };

  // ============================================
  // ATTENDANCE FUNCTIONS - COMPLETE
  // ============================================

  const markAttendance = (sessionId, playerId, status = 'present', method = 'admin') => {
    const session = sessions.find(s => s.id === sessionId);
    const player = users[Object.keys(users).find(email => users[email].id === playerId)];
    
    if (!session || !player) {
      addNotification(lang === 'en' ? 'Session or player not found' : 'التدريب أو اللاعب غير موجود', 'error');
      return;
    }

    // Check if already marked
    const existing = attendance.find(a => 
      a.sessionId === sessionId && a.playerId === playerId
    );

    if (existing) {
      addNotification(lang === 'en' ? 'Attendance already recorded' : 'تم تسجيل الحضور مسبقاً', 'warning');
      return;
    }

    const newAttendance = {
      id: `att_${Date.now()}`,
      sessionId: session.id,
      playerId: player.id,
      playerEmail: player.email,
      playerName: player.name,
      playerNameAr: player.nameAr,
      date: session.date,
      time: session.time,
      location: session.location,
      locationAr: session.locationAr,
      checkInTime: new Date().toISOString(),
      checkInMethod: method,
      status: status,
      notes: ''
    };

    setAttendance([...attendance, newAttendance]);

    // Update player's session counters if present
    if (status === 'present') {
      const updatedUser = {
        ...player,
        sessionsAttended: (player.sessionsAttended || 0) + 1,
        sessionsRemaining: Math.max(0, (player.sessionsRemaining || 0) - 1)
      };

      const updatedUsers = {
        ...users,
        [player.email]: updatedUser
      };
      setUsers(updatedUsers);

      // Update current user if it's them
      if (user && user.email === player.email) {
        setUser(updatedUser);
      }
    }

    addNotification(
      lang === 'en' ? `✅ Attendance marked for ${player.name}` : `✅ تم تسجيل الحضور لـ ${player.nameAr}`,
      'success'
    );
  };

  const getSessionAttendance = (sessionId) => {
    return attendance.filter(a => a.sessionId === sessionId);
  };

  const getPlayerAttendance = (playerId) => {
    return attendance.filter(a => a.playerId === playerId);
  };

  const getAttendancePercentage = (playerId) => {
    const player = users[Object.keys(users).find(email => users[email].id === playerId)];
    if (!player) return 0;
    
    const total = (player.sessionsAttended || 0) + (player.sessionsRemaining || 0);
    if (total === 0) return 0;
    
    return Math.round(((player.sessionsAttended || 0) / total) * 100);
  };

  const exportAttendanceReport = () => {
    const report = attendance.map(a => ({
      Date: a.date,
      Time: a.time,
      Player: a.playerName,
      Email: a.playerEmail,
      Location: a.location,
      Status: a.status,
      CheckInTime: new Date(a.checkInTime).toLocaleString(),
      Method: a.checkInMethod
    }));

    const csv = [
      Object.keys(report[0]).join(','),
      ...report.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AMVA_Attendance_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    addNotification(t.exportReport + ' ' + (lang === 'en' ? 'downloaded!' : 'تم التحميل!'), 'success');
  };

  // ============================================
  // ANALYTICS FUNCTIONS - COMPLETE
  // ============================================

  const getRevenueAnalytics = () => {
    const approvedRegistrations = registrationRequests.filter(r => r.status === 'approved');
    
    const totalRevenue = approvedRegistrations.reduce((sum, r) => {
      const amount = parseInt(r.amount?.replace(/[^0-9]/g, '') || '0');
      return sum + amount;
    }, 0);

    // Revenue by month
    const revenueByMonth = {};
    approvedRegistrations.forEach(r => {
      const month = new Date(r.approvalDate || r.requestDate).toLocaleString('default', { month: 'short', year: 'numeric' });
      const amount = parseInt(r.amount?.replace(/[^0-9]/g, '') || '0');
      revenueByMonth[month] = (revenueByMonth[month] || 0) + amount;
    });

    // Revenue by payment method
    const revenueByMethod = {};
    approvedRegistrations.forEach(r => {
      const method = r.paymentMethod || 'unknown';
      const amount = parseInt(r.amount?.replace(/[^0-9]/g, '') || '0');
      revenueByMethod[method] = (revenueByMethod[method] || 0) + amount;
    });

    // Revenue by training group
    const revenueByGroup = {};
    approvedRegistrations.forEach(r => {
      const group = r.trainingGroupName || 'Unknown';
      const amount = parseInt(r.amount?.replace(/[^0-9]/g, '') || '0');
      revenueByGroup[group] = (revenueByGroup[group] || 0) + amount;
    });

    // Pending revenue
    const pendingRevenue = registrationRequests
      .filter(r => r.status === 'pending_approval' || r.status === 'pending_payment')
      .reduce((sum, r) => {
        const amount = parseInt(r.amount?.replace(/[^0-9]/g, '') || '0');
        return sum + amount;
      }, 0);

    return {
      totalRevenue,
      revenueByMonth,
      revenueByMethod,
      revenueByGroup,
      pendingRevenue,
      averageTransactionValue: approvedRegistrations.length > 0 ? Math.round(totalRevenue / approvedRegistrations.length) : 0,
      transactionCount: approvedRegistrations.length
    };
  };

  const getPlayerAnalytics = () => {
    const players = Object.values(users).filter(u => u.role === 'player');
    
    const activePlayers = players.filter(p => (p.sessionsRemaining || 0) > 0);
    const inactivePlayers = players.filter(p => (p.sessionsRemaining || 0) === 0);

    // Age distribution
    const ageDistribution = {
      'Under 16': 0,
      '16-18': 0,
      '19-22': 0,
      'Over 22': 0
    };
    
    players.forEach(p => {
      const age = p.age || 0;
      if (age < 16) ageDistribution['Under 16']++;
      else if (age >= 16 && age <= 18) ageDistribution['16-18']++;
      else if (age >= 19 && age <= 22) ageDistribution['19-22']++;
      else if (age > 22) ageDistribution['Over 22']++;
    });

    // Position distribution
    const positionDistribution = {};
    players.forEach(p => {
      const position = p.position || 'Unknown';
      positionDistribution[position] = (positionDistribution[position] || 0) + 1;
    });

    // Player growth
    const playerGrowth = {};
    Object.values(users).filter(u => u.role === 'player' && u.joinedDate).forEach(p => {
      const month = new Date(p.joinedDate).toLocaleString('default', { month: 'short' });
      playerGrowth[month] = (playerGrowth[month] || 0) + 1;
    });

    // Attendance rate
    const totalAttendance = attendance.length;
    const presentCount = attendance.filter(a => a.status === 'present').length;
    const attendanceRate = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

    return {
      totalPlayers: players.length,
      activePlayers: activePlayers.length,
      inactivePlayers: inactivePlayers.length,
      ageDistribution,
      positionDistribution,
      playerGrowth,
      attendanceRate,
      averageSessionsPerPlayer: players.length > 0 
        ? Math.round(players.reduce((sum, p) => sum + (p.sessionsAttended || 0), 0) / players.length)
        : 0
    };
  };

  const getTrainingAnalytics = () => {
    // Most popular groups by registrations
    const groupPopularity = {};
    registrationRequests.forEach(r => {
      const group = r.trainingGroupName || 'Unknown';
      groupPopularity[group] = (groupPopularity[group] || 0) + 1;
    });

    // Attendance by day of week
    const attendanceByDay = {
      'Sunday': 0,
      'Monday': 0,
      'Tuesday': 0,
      'Wednesday': 0,
      'Thursday': 0,
      'Friday': 0,
      'Saturday': 0
    };
    
    attendance.filter(a => a.status === 'present').forEach(a => {
      const day = new Date(a.date).toLocaleDateString('en-US', { weekday: 'long' });
      attendanceByDay[day] = (attendanceByDay[day] || 0) + 1;
    });

    return {
      totalGroups: trainingGroups.length,
      groupPopularity,
      attendanceByDay,
      totalSessions: sessions.length,
      averageGroupSize: trainingGroups.length > 0
        ? Math.round(Object.values(groupPopularity).reduce((a, b) => a + b, 0) / trainingGroups.length)
        : 0
    };
  };

  const exportAnalyticsExcel = () => {
    const revenueData = getRevenueAnalytics();
    const playerData = getPlayerAnalytics();
    
    const csvContent = [
      'AMVA Analytics Report',
      `Generated: ${new Date().toLocaleString()}`,
      '',
      'REVENUE SUMMARY',
      `Total Revenue,EGP ${revenueData.totalRevenue}`,
      `Pending Revenue,EGP ${revenueData.pendingRevenue}`,
      `Average Transaction,EGP ${revenueData.averageTransactionValue}`,
      `Total Transactions,${revenueData.transactionCount}`,
      '',
      'PLAYER SUMMARY',
      `Total Players,${playerData.totalPlayers}`,
      `Active Players,${playerData.activePlayers}`,
      `Inactive Players,${playerData.inactivePlayers}`,
      `Attendance Rate,${playerData.attendanceRate}%`,
      `Average Sessions Per Player,${playerData.averageSessionsPerPlayer}`,
      ''
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `AMVA_Analytics_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    addNotification(t.exportReport + ' ' + (lang === 'en' ? 'downloaded!' : 'تم التحميل!'), 'success');
  };

  // ============================================
  // APPLICATION MANAGEMENT
  // ============================================

  const acceptApplication = (appId) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    
    setApplications(applications.map(a => 
      a.id === appId ? {...a, status: 'accepted', processedDate: new Date().toISOString().split('T')[0]} : a
    ));
    
    addNotification(
      lang === 'en' ? `✅ Application approved for ${app.fullName}` : `✅ تمت الموافقة على طلب ${app.fullNameAr || app.fullName}`,
      'success'
    );
    
    setSelectedApplication(null);
  };

  const rejectApplication = (appId) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    
    const reason = prompt(lang === 'en' ? 'Rejection reason (optional):' : 'سبب الرفض (اختياري):');
    
    setApplications(applications.map(a => 
      a.id === appId ? {
        ...a, 
        status: 'rejected', 
        rejectionReason: reason || '',
        processedDate: new Date().toISOString().split('T')[0]
      } : a
    ));
    
    addNotification(
      lang === 'en' ? `❌ Application rejected for ${app.fullName}` : `❌ تم رفض طلب ${app.fullNameAr || app.fullName}`,
      'warning'
    );
    
    setSelectedApplication(null);
  };

  const deleteApplication = (appId) => {
    if (window.confirm(lang === 'en' ? 'Are you sure you want to delete this application?' : 'هل أنت متأكد من حذف هذا الطلب؟')) {
      setApplications(applications.filter(a => a.id !== appId));
      addNotification(lang === 'en' ? 'Application deleted' : 'تم حذف الطلب', 'success');
      setSelectedApplication(null);
    }
  };

  // ============================================
  // SESSION MANAGEMENT
  // ============================================

  const addSession = (sessionData) => {
    const newSession = {
      id: `s${sessions.length + 1}`,
      ...sessionData,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setSessions([...sessions, newSession]);
    addNotification(t.dataUpdated, 'success');
    setShowAddSession(false);
  };

  const deleteSession = (sessionId) => {
    if (window.confirm(lang === 'en' ? 'Delete this session?' : 'حذف هذا التدريب؟')) {
      setSessions(sessions.filter(s => s.id !== sessionId));
      // Also remove related attendance
      setAttendance(attendance.filter(a => a.sessionId !== sessionId));
      addNotification(lang === 'en' ? 'Session deleted' : 'تم حذف التدريب', 'success');
    }
  };

  // ============================================
  // NEWS MANAGEMENT
  // ============================================

  const addNews = (newsData) => {
    const newNews = {
      id: `n${news.length + 1}`,
      ...newsData,
      date: new Date().toISOString().split('T')[0],
      author: user.name
    };
    setNews([newNews, ...news]);
    addNotification(lang === 'en' ? 'News posted!' : 'تم نشر الخبر!', 'success');
    setShowAddNews(false);
  };

  const deleteNews = (newsId) => {
    if (window.confirm(lang === 'en' ? 'Delete this news?' : 'حذف هذا الخبر؟')) {
      setNews(news.filter(n => n.id !== newsId));
      addNotification(lang === 'en' ? 'News deleted' : 'تم حذف الخبر', 'success');
    }
  };

  // ============================================
  // TRAINING GROUP MANAGEMENT
  // ============================================

  const addTrainingGroup = (groupData) => {
    const newGroup = {
      id: `tg${trainingGroups.length + 1}`,
      ...groupData,
      enrolled: 0,
      sessions: [],
      createdDate: new Date().toISOString().split('T')[0]
    };
    setTrainingGroups([...trainingGroups, newGroup]);
    addNotification(lang === 'en' ? 'Training group added!' : 'تمت إضافة مجموعة التدريب!', 'success');
    setShowAddGroup(false);
  };

  const deleteTrainingGroup = (groupId) => {
    if (window.confirm(lang === 'en' ? 'Delete this training group?' : 'حذف مجموعة التدريب؟')) {
      setTrainingGroups(trainingGroups.filter(g => g.id !== groupId));
      addNotification(lang === 'en' ? 'Training group deleted' : 'تم حذف مجموعة التدريب', 'success');
    }
  };

  // ============================================
  // CONTINUE IN NEXT PART...
  // ============================================

  // ============================================
  // COMPONENTS - UI ELEMENTS
  // ============================================

  // Notification Toast Component
  const NotificationToast = () => {
    if (notifications.length === 0) return null;
    
    return (
      <div className="fixed top-4 right-4 z-50 space-y-2" style={{direction: 'ltr'}}>
        {notifications.map(notif => (
          <div key={notif.id} 
            className={`px-6 py-4 rounded-lg shadow-lg text-white animate-slide-in ${
              notif.type === 'success' ? 'bg-green-500' :
              notif.type === 'error' ? 'bg-red-500' :
              notif.type === 'warning' ? 'bg-yellow-500' :
              'bg-blue-500'
            }`}>
            {notif.message}
          </div>
        ))}
      </div>
    );
  };

  // Navigation Component
  const Navigation = () => (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setCurrentPage('landing')} className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/images/AMVA-logo-1.png" 
                alt="AMVA Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-lg font-bold text-blue-700">AMVA</h1>
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-3 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 text-sm font-medium transition">
              {lang === 'en' ? '🇪🇬 العربية' : '🇬🇧 English'}
            </button>
            
            {user && (
              <>
                {/* Player Navigation */}
                {user.role === 'player' && (
                  <>
                    <button onClick={() => setCurrentPage('landing')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'landing' ? 'bg-blue-100' : ''}`}
                      title={t.home}>
                      <Home size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('player-home')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'player-home' || currentPage === 'player-profile' ? 'bg-blue-100' : ''}`}
                      title={t.profile}>
                      <User size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('training-groups')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'training-groups' ? 'bg-blue-100' : ''}`}
                      title={t.trainingGroups}>
                      <Users size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('my-attendance')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'my-attendance' ? 'bg-blue-100' : ''}`}
                      title={t.myAttendance}>
                      <CheckCircle size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('my-registrations')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'my-registrations' ? 'bg-blue-100' : ''}`}
                      title={t.myRegistrations}>
                      <FileText size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('training-calendar')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'training-calendar' ? 'bg-blue-100' : ''}`}
                      title={lang === 'en' ? 'Training Calendar' : 'تقويم التدريبات'}>
                      <Calendar size={20} className="text-blue-700" />
                    </button>
                  </>
                )}
                
                {/* Admin Navigation */}
                {isAdmin && (
                  <>
                    <button onClick={() => setCurrentPage('landing')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'landing' ? 'bg-blue-100' : ''}`}
                      title={lang === 'en' ? 'View Homepage' : 'عرض الصفحة الرئيسية'}>
                      <Eye size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('admin-dashboard')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'admin-dashboard' ? 'bg-blue-100' : ''}`}
                      title={t.adminDashboard}>
                      <Home size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('applications')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg relative transition ${currentPage === 'applications' ? 'bg-blue-100' : ''}`}
                      title={t.applications}>
                      <FileText size={20} className="text-blue-700" />
                      {applications.filter(a => a.status === 'pending').length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {applications.filter(a => a.status === 'pending').length}
                        </span>
                      )}
                    </button>
                    <button onClick={() => setCurrentPage('registration-requests')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg relative transition ${currentPage === 'registration-requests' ? 'bg-blue-100' : ''}`}
                      title={lang === 'en' ? 'Registration Requests' : 'طلبات التسجيل'}>
                      <Users size={20} className="text-blue-700" />
                      {(() => {
                        const pendingCount = posts.reduce((count, post) => {
                          const pending = post.registrations?.filter(r => r.status === 'pending').length || 0;
                          return count + pending;
                        }, 0);
                        return pendingCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {pendingCount}
                          </span>
                        );
                      })()}
                    </button>
                    <button onClick={() => setCurrentPage('sessions-manage')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'sessions-manage' ? 'bg-blue-100' : ''}`}
                      title={t.manageSessions}>
                      <Calendar size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('news-manage')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'news-manage' ? 'bg-blue-100' : ''}`}
                      title={t.manageNews}>
                      <Bell size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('groups-manage')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'groups-manage' ? 'bg-blue-100' : ''}`}
                      title={t.manageGroups}>
                      <Users size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('session-attendance')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'session-attendance' ? 'bg-blue-100' : ''}`}
                      title={lang === 'en' ? 'Session Attendance' : 'حضور الجلسات'}>
                      <CheckCircle size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('analytics')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'analytics' ? 'bg-blue-100' : ''}`}
                      title={t.analytics}>
                      <BarChart3 size={20} className="text-blue-700" />
                    </button>
                    <button onClick={() => setCurrentPage('player-management')} 
                      className={`p-2 hover:bg-blue-50 rounded-lg transition ${currentPage === 'player-management' ? 'bg-blue-100' : ''}`}
                      title={lang === 'en' ? 'Manage Players' : 'إدارة اللاعبين'}>
                      <Users size={20} className="text-blue-700" />
                    </button>
                  </>
                )}
                
                <button onClick={handleLogout} 
                  className="px-4 py-2 bg-red-50 rounded-lg hover:bg-red-100 text-red-600 font-medium flex items-center gap-2 transition">
                  <LogOut size={18} />
                  <span className="hidden md:inline">{t.logout}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // PAGES - ALL PAGES
  // ============================================




 // LOGIN PAGE
if (currentPage === 'login') {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <NotificationToast />
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <button 
          onClick={() => setCurrentPage('landing')}
          className="mb-4 text-2xl hover:bg-gray-100 p-2 rounded transition">
          ←
        </button>
        
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4">
            <img 
              src="/images/AMVA-logo-1.png" 
              alt="AMVA Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-xl text-gray-700 mb-2">Ahmed Mostafa Volleyball Academy</h2>
          <p className="text-gray-600 mt-3">{t.signIn}</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
            <input 
              type="email" 
              name="email"
              placeholder={t.email}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
            <input 
              type="password" 
              name="password"
              placeholder={t.password}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg">
            {t.login}
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
          <p className="font-semibold mb-2 text-gray-800">{lang === 'en' ? '🎮 Demo Accounts' : '🎮 حسابات تجريبية'}</p>
          <div className="space-y-1 text-gray-600">
            <p><strong>{lang === 'en' ? 'Player' : 'لاعب'}:</strong> player@demo.com / player123</p>
            <p><strong>{lang === 'en' ? 'Admin' : 'مسؤول'}:</strong> coach@demo.com / coach123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

  // PLAYER HOME PAGE
  if (currentPage === 'player-home' && user && user.role === 'player') {
    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {lang === 'en' ? `Welcome back, ${user.name}!` : `مرحباً بعودتك، ${user.nameAr}!`}
          </h2>

          {/* Membership Card */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white shadow-xl mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-blue-200 text-sm">{lang === 'en' ? 'Member ID' : 'رقم العضوية'}</p>
                <p className="text-2xl font-bold">{user.id.toUpperCase()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-400" />
                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-yellow-900">
                  {lang === 'en' ? 'ACTIVE' : 'نشط'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-yellow-400">
                <span className="text-4xl">👤</span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">
                  {lang === 'en' ? user.name : user.nameAr}
                </h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span className="text-blue-200">{lang === 'en' ? 'Age' : 'العمر'}:</span> {user.age}
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity size={14} />
                    <span className="text-blue-200">{lang === 'en' ? 'Height' : 'الطول'}:</span> {user.height} cm
                  </div>
                  <div className="col-span-2 flex items-center gap-1">
                    <Target size={14} />
                    <span className="text-blue-200">{lang === 'en' ? 'Position' : 'المركز'}:</span> {lang === 'en' ? user.position : user.positionAr}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm">{t.sessionsRemaining}</p>
                <Calendar size={20} className="text-blue-700" />
              </div>
              <p className="text-3xl font-bold text-blue-700">{user.sessionsRemaining}</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-700 transition-all"
                  style={{width: `${((user.sessionsRemaining / (user.sessionsRemaining + user.sessionsAttended)) * 100) || 0}%`}}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm">{t.sessionsAttended}</p>
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{user.sessionsAttended}</p>
              <p className="text-xs text-gray-500 mt-2">
                {t.attendanceRate}: {getAttendancePercentage(user.id)}%
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm">{t.paymentStatus}</p>
                <CreditCard size={20} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">
                {lang === 'en' ? 'Paid' : 'مدفوع'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {lang === 'en' ? 'All dues cleared' : 'تم سداد جميع المستحقات'}
              </p>
            </div>
          </div>

          {/* News Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Bell size={24} className="text-blue-700" />
                {t.latestNews}
              </h3>
              <button 
                onClick={() => setCurrentPage('landing')}
                className="text-blue-700 hover:text-blue-800 text-sm font-medium">
                {lang === 'en' ? 'View All →' : 'عرض الكل ←'}
              </button>
            </div>
            {posts.length === 0 && news.length === 0 ? (
              <p className="text-gray-600 text-center py-8">{t.noNewsYet}</p>
            ) : (
              <div className="space-y-4">
                {[...posts, ...news].slice(0, 3).map(n => (
                  <div key={n.id} className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition border-l-4 border-blue-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-1">{lang === 'en' ? (n.title || n.titleAr) : (n.titleAr || n.title)}</h4>
                        <p className="text-sm text-gray-600 mb-2">{lang === 'en' ? (n.content || n.contentAr) : (n.contentAr || n.content)}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {n.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {lang === 'en' ? (n.author || n.authorAr) : (n.authorAr || n.author)}
                          </span>
                          {n.category && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-200 text-blue-800 text-xs font-medium">
                              {lang === 'en' ? n.category : n.categoryAr}
                            </span>
                          )}
                        </div>
                      </div>
                      {n.priority === 'high' && (
                        <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // MY ATTENDANCE PAGE (Player)
  if (currentPage === 'my-attendance' && user && user.role === 'player') {
    // Get all attendance records for this player
    const attendanceRecords = [];
    
    posts.forEach(post => {
      if (post.registrations) {
        const playerReg = post.registrations.find(reg => reg.playerId === user.id && reg.status === 'approved');
        if (playerReg && playerReg.attendance) {
          Object.entries(playerReg.attendance).forEach(([date, record]) => {
            attendanceRecords.push({
              date,
              attended: record.attended,
              sessionTitle: post.title,
              sessionTitleAr: post.titleAr,
              sessionType: post.type,
              sessionTime: post.time,
              sessionLocation: post.location,
              sessionLocationAr: post.locationAr,
              markedBy: record.markedBy,
              markedAt: record.markedAt
            });
          });
        }
      }
    });

    // Sort by date (newest first)
    attendanceRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate statistics
    const totalSessions = attendanceRecords.length;
    const attendedSessions = attendanceRecords.filter(r => r.attended).length;
    const missedSessions = totalSessions - attendedSessions;
    const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0;

    // Using component-level state: attendanceFilterPeriod

    const getFilteredRecords = () => {
      if (attendanceFilterPeriod === 'all') return attendanceRecords;
      
      const now = new Date();
      const filterDate = new Date();
      
      if (attendanceFilterPeriod === 'week') {
        filterDate.setDate(now.getDate() - 7);
      } else if (attendanceFilterPeriod === 'month') {
        filterDate.setMonth(now.getMonth() - 1);
      }
      
      return attendanceRecords.filter(record => new Date(record.date) >= filterDate);
    };

    const filteredRecords = getFilteredRecords();

    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {lang === 'en' ? 'My Attendance' : 'حضوري'}
          </h2>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <Calendar size={24} className="text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">{totalSessions}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Total Sessions' : 'إجمالي الجلسات'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle size={24} className="text-green-600" />
                <span className="text-3xl font-bold text-green-600">{attendedSessions}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Attended' : 'حضرت'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
              <div className="flex items-center justify-between mb-2">
                <X size={24} className="text-red-600" />
                <span className="text-3xl font-bold text-red-600">{missedSessions}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Missed' : 'غبت'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp size={24} className="text-purple-600" />
                <span className="text-3xl font-bold text-purple-600">{attendanceRate}%</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Attendance Rate' : 'معدل الحضور'}
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">
                {lang === 'en' ? 'Filter:' : 'تصفية:'}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setAttendanceFilterPeriod('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    attendanceFilterPeriod === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {lang === 'en' ? 'All Time' : 'كل الوقت'}
                </button>
                <button
                  onClick={() => setAttendanceFilterPeriod('month')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    attendanceFilterPeriod === 'month'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {lang === 'en' ? 'Last Month' : 'الشهر الماضي'}
                </button>
                <button
                  onClick={() => setAttendanceFilterPeriod('week')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    attendanceFilterPeriod === 'week'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {lang === 'en' ? 'Last Week' : 'الأسبوع الماضي'}
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Records */}
          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-xl p-12 shadow-lg text-center">
              <CheckCircle size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {lang === 'en' ? 'No Attendance Records' : 'لا توجد سجلات حضور'}
              </h3>
              <p className="text-gray-600">
                {lang === 'en' 
                  ? 'Your attendance will appear here once coaches mark it.'
                  : 'سيظهر حضورك هنا بمجرد أن يقوم المدربون بتسجيله.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {lang === 'en' ? 'Attendance History' : 'سجل الحضور'}
                {' '}({filteredRecords.length})
              </h3>
              <div className="space-y-3">
                {filteredRecords.map((record, index) => (
                  <div 
                    key={`${record.date}-${index}`}
                    className={`p-4 rounded-lg border-2 transition ${
                      record.attended
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {record.attended ? (
                            <CheckCircle size={20} className="text-green-600" />
                          ) : (
                            <X size={20} className="text-red-600" />
                          )}
                          <span className={`font-bold ${
                            record.attended ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {record.attended
                              ? (lang === 'en' ? 'Present' : 'حاضر')
                              : (lang === 'en' ? 'Absent' : 'غائب')
                            }
                          </span>
                        </div>
                        
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {lang === 'en' ? record.sessionTitle : (record.sessionTitleAr || record.sessionTitle)}
                        </h4>
                        
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(record.date).toLocaleDateString()}
                          </span>
                          {record.sessionTime && (
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {record.sessionTime}
                            </span>
                          )}
                          {record.sessionLocation && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {lang === 'en' ? record.sessionLocation : (record.sessionLocationAr || record.sessionLocation)}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                          {lang === 'en' ? 'Marked by: ' : 'تم التسجيل بواسطة: '}
                          {record.markedBy}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // MY REGISTRATIONS PAGE (Player)
  if (currentPage === 'my-registrations' && user && user.role === 'player') {
    // Get user's registered sessions and groups
    const userRegistrations = posts.filter(post => 
      post.registrations && post.registrations.some(reg => reg.playerId === user.id)
    );

    // Categorize by status
    const pending = userRegistrations.filter(post => 
      post.registrations.find(reg => reg.playerId === user.id)?.status === 'pending'
    );
    const approved = userRegistrations.filter(post => 
      post.registrations.find(reg => reg.playerId === user.id)?.status === 'approved'
    );
    const rejected = userRegistrations.filter(post => 
      post.registrations.find(reg => reg.playerId === user.id)?.status === 'rejected'
    );

    // Categorize approved by time
    const now = new Date();
    const upcoming = approved.filter(post => post.date && new Date(post.date) > now);
    const past = approved.filter(post => post.date && new Date(post.date) < now);
    const ongoing = approved.filter(post => !post.date); // No specific date = ongoing

    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {lang === 'en' ? 'My Registrations' : 'تسجيلاتي'}
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock size={24} className="text-yellow-600" />
                <span className="text-3xl font-bold text-yellow-700">{pending.length}</span>
              </div>
              <p className="text-sm font-medium text-yellow-800">
                {lang === 'en' ? 'Pending' : 'قيد الانتظار'}
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar size={24} className="text-blue-600" />
                <span className="text-3xl font-bold text-blue-700">{upcoming.length}</span>
              </div>
              <p className="text-sm font-medium text-blue-800">
                {lang === 'en' ? 'Upcoming' : 'القادمة'}
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity size={24} className="text-green-600" />
                <span className="text-3xl font-bold text-green-700">{ongoing.length}</span>
              </div>
              <p className="text-sm font-medium text-green-800">
                {lang === 'en' ? 'Ongoing' : 'جارية'}
              </p>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle size={24} className="text-gray-600" />
                <span className="text-3xl font-bold text-gray-700">{past.length}</span>
              </div>
              <p className="text-sm font-medium text-gray-800">
                {lang === 'en' ? 'Completed' : 'مكتملة'}
              </p>
            </div>
          </div>

          {/* Pending Registrations */}
          {pending.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Clock size={24} className="text-yellow-600" />
                {lang === 'en' ? 'Pending Approval' : 'في انتظار الموافقة'}
              </h3>
              <div className="space-y-4">
                {pending.map(post => {
                  const registration = post.registrations.find(reg => reg.playerId === user.id);
                  return (
                    <div key={post.id} className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">
                            {lang === 'en' ? post.title : (post.titleAr || post.title)}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {lang === 'en' ? post.content : (post.contentAr || post.content)}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            {post.date && (
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {post.date}
                              </span>
                            )}
                            {post.time && (
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {post.time}
                              </span>
                            )}
                            {post.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {lang === 'en' ? post.location : (post.locationAr || post.location)}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-800 font-medium">
                              {lang === 'en' ? 'Pending' : 'قيد الانتظار'}
                            </span>
                          </div>
                          {registration.requestDate && (
                            <p className="text-xs text-gray-500 mt-2">
                              {lang === 'en' ? 'Requested on: ' : 'تم الطلب في: '}
                              {new Date(registration.requestDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Upcoming Sessions */}
          {upcoming.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-blue-600" />
                {lang === 'en' ? 'Upcoming Sessions' : 'الجلسات القادمة'}
              </h3>
              <div className="space-y-4">
                {upcoming.map(post => (
                  <div key={post.id} className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-1">
                      {lang === 'en' ? post.title : (post.titleAr || post.title)}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {lang === 'en' ? post.content : (post.contentAr || post.content)}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      {post.date && (
                        <span className="flex items-center gap-1 text-blue-700 font-medium">
                          <Calendar size={12} />
                          {post.date}
                        </span>
                      )}
                      {post.time && (
                        <span className="flex items-center gap-1 text-blue-700 font-medium">
                          <Clock size={12} />
                          {post.time}
                        </span>
                      )}
                      {post.location && (
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin size={12} />
                          {lang === 'en' ? post.location : (post.locationAr || post.location)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ongoing Groups */}
          {ongoing.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity size={24} className="text-green-600" />
                {lang === 'en' ? 'Ongoing Training Groups' : 'المجموعات التدريبية الجارية'}
              </h3>
              <div className="space-y-4">
                {ongoing.map(post => (
                  <div key={post.id} className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-1">
                      {lang === 'en' ? post.title : (post.titleAr || post.title)}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {lang === 'en' ? post.content : (post.contentAr || post.content)}
                    </p>
                    {post.sessionDays && (
                      <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                        <Calendar size={14} />
                        {post.sessionDays}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past/Completed */}
          {past.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle size={24} className="text-gray-600" />
                {lang === 'en' ? 'Completed Sessions' : 'الجلسات المكتملة'}
              </h3>
              <div className="space-y-4">
                {past.map(post => (
                  <div key={post.id} className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg opacity-75">
                    <h4 className="font-bold text-gray-700 mb-1">
                      {lang === 'en' ? post.title : (post.titleAr || post.title)}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-gray-300 text-gray-700 font-medium">
                        {lang === 'en' ? 'Completed' : 'مكتمل'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rejected */}
          {rejected.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <X size={24} className="text-red-600" />
                {lang === 'en' ? 'Rejected Requests' : 'الطلبات المرفوضة'}
              </h3>
              <div className="space-y-4">
                {rejected.map(post => {
                  const registration = post.registrations.find(reg => reg.playerId === user.id);
                  return (
                    <div key={post.id} className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-1">
                        {lang === 'en' ? post.title : (post.titleAr || post.title)}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {lang === 'en' ? post.content : (post.contentAr || post.content)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-red-200 text-red-800 text-xs font-medium">
                          {lang === 'en' ? 'Rejected' : 'مرفوض'}
                        </span>
                        {registration.rejectionReason && (
                          <span className="text-xs text-gray-600">
                            {registration.rejectionReason}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {userRegistrations.length === 0 && (
            <div className="bg-white rounded-xl p-12 shadow-lg text-center">
              <FileText size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {lang === 'en' ? 'No Registrations Yet' : 'لا توجد تسجيلات بعد'}
              </h3>
              <p className="text-gray-600 mb-6">
                {lang === 'en' 
                  ? 'Join training sessions from the news feed to see them here!'
                  : 'انضم للجلسات التدريبية من صفحة الأخبار لرؤيتها هنا!'}
              </p>
              <button
                onClick={() => setCurrentPage('landing')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                {lang === 'en' ? 'Browse Training Sessions' : 'تصفح الجلسات التدريبية'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }


  // TRAINING GROUPS PAGE (Player)
  if (currentPage === 'training-groups' && user && user.role === 'player') {
    const filteredGroups = getFilteredGroups();
    
    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.trainingGroups}</h2>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Box */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.search}</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={groupSearchQuery}
                    onChange={(e) => setGroupSearchQuery(e.target.value)}
                    placeholder={t.searchGroups}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'en' ? 'Price Range' : 'نطاق السعر'}</label>
                <select
                  value={groupFilterPrice}
                  onChange={(e) => setGroupFilterPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="all">{t.allPrices || (lang === 'en' ? 'All Prices' : 'كل الأسعار')}</option>
                  <option value="low">{lang === 'en' ? 'Under 600 EGP' : 'أقل من 600 جنيه'}</option>
                  <option value="medium">{lang === 'en' ? '600-1000 EGP' : '600-1000 جنيه'}</option>
                  <option value="high">{lang === 'en' ? 'Over 1000 EGP' : 'أكثر من 1000 جنيه'}</option>
                </select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.level}</label>
                <select
                  value={groupFilterLevel}
                  onChange={(e) => setGroupFilterLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="all">{t.all}</option>
                  <option value="beginner">{t.beginner}</option>
                  <option value="intermediate">{t.intermediate}</option>
                  <option value="advanced">{t.advanced}</option>
                  <option value="professional">{lang === 'en' ? 'Professional' : 'محترف'}</option>
                </select>
              </div>
            </div>

            {/* Results Count & Clear Button */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-600">
                {t.showing} {filteredGroups.length} {t.results}
              </p>
              {(groupSearchQuery || groupFilterPrice !== 'all' || groupFilterLevel !== 'all') && (
                <button
                  onClick={() => {
                    setGroupSearchQuery('');
                    setGroupFilterPrice('all');
                    setGroupFilterLevel('all');
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                  {t.clearFilters}
                </button>
              )}
            </div>
          </div>

          {/* Training Groups Grid */}
          {filteredGroups.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow text-center">
              <Users size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">{lang === 'en' ? 'No groups match your filters' : 'لا توجد مجموعات مطابقة'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map(group => (
                <div key={group.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{lang === 'en' ? group.name : group.nameAr}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      group.level === 'Beginner' || group.level === 'مبتدئ' ? 'bg-green-100 text-green-800' :
                      group.level === 'Intermediate' || group.level === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lang === 'en' ? group.level : group.levelAr}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {lang === 'en' ? group.description : group.descriptionAr}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CreditCard size={20} className="text-green-600" />
                        <span className="text-sm text-gray-600">{t.price}</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">{group.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar size={20} className="text-blue-700" />
                        <span className="text-sm text-gray-600">{t.sessions}</span>
                      </div>
                      <span className="text-xl font-bold text-blue-700">{group.sessions.length}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users size={20} className="text-purple-600" />
                        <span className="text-sm text-gray-600">{t.capacity}</span>
                      </div>
                      <span className="text-sm font-bold text-purple-600">{group.enrolled}/{group.capacity}</span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={16} className="text-gray-600" />
                        <span className="text-xs font-medium text-gray-600">{t.scheduleTime}</span>
                      </div>
                      <p className="text-sm text-gray-800">{lang === 'en' ? group.schedule : group.scheduleAr}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <User size={16} className="text-gray-600" />
                        <span className="text-xs font-medium text-gray-600">{t.coach}</span>
                      </div>
                      <p className="text-sm text-gray-800">{lang === 'en' ? group.coach : group.coachAr}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedTrainingGroup(group.id);
                      setCurrentPage('group-details');
                    }}
                    className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg flex items-center justify-center gap-2">
                    <Eye size={20} />
                    {t.viewRegister}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // MY ATTENDANCE PAGE (Player)
  if (currentPage === 'my-attendance' && user && user.role === 'player') {
    const myAttendance = getPlayerAttendance(user.id);
    const attendanceRate = getAttendancePercentage(user.id);
    
    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.myAttendance}</h2>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-green-100 text-sm mb-1">{t.sessionsAttended}</p>
              <p className="text-4xl font-bold mb-2">{user.sessionsAttended || 0}</p>
              <div className="flex items-center gap-1 text-green-100 text-sm">
                <TrendingUp size={16} />
                <span>{lang === 'en' ? 'Keep it up!' : 'استمر!'}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-blue-100 text-sm mb-1">{t.sessionsRemaining}</p>
              <p className="text-4xl font-bold mb-2">{user.sessionsRemaining || 0}</p>
              <div className="flex items-center gap-1 text-blue-100 text-sm">
                <Calendar size={16} />
                <span>{lang === 'en' ? 'Book now' : 'احجز الآن'}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-yellow-100 text-sm mb-1">{t.attendanceRate}</p>
              <p className="text-4xl font-bold mb-2">{attendanceRate}%</p>
              <div className="flex items-center gap-1 text-yellow-100 text-sm">
                <Star size={16} />
                <span>{attendanceRate >= 80 ? (lang === 'en' ? 'Excellent!' : 'ممتاز!') : (lang === 'en' ? 'Good!' : 'جيد!')}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">{lang === 'en' ? 'Overall Progress' : 'التقدم العام'}</span>
              <span className="text-sm font-bold text-gray-700">{attendanceRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 transition-all duration-1000 flex items-center justify-end px-2"
                style={{ width: `${attendanceRate}%` }}>
                {attendanceRate > 10 && (
                  <span className="text-white text-xs font-bold">{attendanceRate}%</span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {lang === 'en' 
                ? `${user.sessionsAttended} attended out of ${(user.sessionsAttended || 0) + (user.sessionsRemaining || 0)} total sessions`
                : `${user.sessionsAttended} حضرت من ${(user.sessionsAttended || 0) + (user.sessionsRemaining || 0)} إجمالي التدريبات`
              }
            </p>
          </div>

          {/* Attendance History */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{t.attendanceHistory}</h3>
              {myAttendance.length > 0 && (
                <button 
                  onClick={exportAttendanceReport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2 transition">
                  <Download size={16} />
                  {lang === 'en' ? 'Export' : 'تصدير'}
                </button>
              )}
            </div>

            {myAttendance.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">{t.noAttendanceYet}</p>
                <p className="text-sm text-gray-500">{lang === 'en' ? 'Your attendance will appear here' : 'سيظهر حضورك هنا'}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {myAttendance.reverse().map((record, index) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                        record.status === 'present' ? 'bg-green-500' : 
                        record.status === 'late' ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}>
                        {record.status === 'present' ? '✓' : record.status === 'late' ? '⏰' : '✗'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-gray-800">{record.date}</p>
                          <span className="text-gray-400">•</span>
                          <p className="text-sm text-gray-600">{record.time}</p>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin size={14} />
                          {lang === 'en' ? record.location : record.locationAr}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {lang === 'en' ? 'Checked in at' : 'تم التسجيل في'}: {new Date(record.checkInTime).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        record.status === 'present' ? 'bg-green-100 text-green-800' :
                        record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.status === 'present' ? t.present :
                         record.status === 'late' ? t.late :
                         t.absent
                        }
                      </span>
                      <span className="text-xs text-gray-500">#{myAttendance.length - index}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  if (currentPage === 'admin-dashboard' && isAdmin) {
    const filteredPlayers = getFilteredPlayers();
    const recentApplications = applications.slice(0, 5);
    const upcomingSessions = sessions.filter(s => new Date(s.date) >= new Date()).slice(0, 5);
    
    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold text-gray-800">{t.adminDashboard}</h2>
  <div className="flex items-center gap-2">
    <button 
      onClick={() => {
        setModalType('post');
        setNewPost({...newPost, type: 'post', category: 'announcement'});
        setShowCreatePostModal(true);
      }}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2 transition shadow-lg">
      <Plus size={18} />
      {lang === 'en' ? 'Create Post' : 'إنشاء منشور'}
    </button>
    <button 
      onClick={() => {
        setModalType('training');
        setNewPost({...newPost, type: 'training', trainingType: 'training_session'});
        setShowCreatePostModal(true);
      }}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2 transition shadow-lg">
      <Plus size={18} />
      {lang === 'en' ? 'Create Session' : 'إنشاء جلسة'}
    </button>
    <button 
      onClick={() => setCurrentPage('analytics')}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 transition">
      <BarChart3 size={18} />
      {t.analytics}
    </button>
  </div>
</div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <Users size={32} />
                <TrendingUp size={20} />
              </div>
              <p className="text-blue-100 text-sm mb-1">{t.players}</p>
              <p className="text-4xl font-bold">{filteredPlayers.length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <Users size={32} />
                <Award size={20} />
              </div>
              <p className="text-green-100 text-sm mb-1">{t.trainingGroups}</p>
              <p className="text-4xl font-bold">{trainingGroups.length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <Calendar size={32} />
                <Clock size={20} />
              </div>
              <p className="text-purple-100 text-sm mb-1">{t.sessions}</p>
              <p className="text-4xl font-bold">{sessions.length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <FileText size={32} />
                <AlertCircle size={20} />
              </div>
              <p className="text-yellow-100 text-sm mb-1">{t.applications}</p>
              <p className="text-4xl font-bold">{applications.length}</p>
              {applications.filter(a => a.status === 'pending').length > 0 && (
                <p className="text-xs text-yellow-100 mt-1">
                  {applications.filter(a => a.status === 'pending').length} {lang === 'en' ? 'pending' : 'معلق'}
                </p>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={playerSearchQuery}
                    onChange={(e) => setPlayerSearchQuery(e.target.value)}
                    placeholder={t.searchPlayers}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <select
                  value={playerFilterStatus}
                  onChange={(e) => setPlayerFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="all">{t.allStatus}</option>
                  <option value="active">{t.active}</option>
                  <option value="inactive">{t.inactive}</option>
                </select>
              </div>
              
              <div>
                <select
                  value={playerSortBy}
                  onChange={(e) => setPlayerSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="name">{t.sortByName}</option>
                  <option value="email">{t.sortByEmail}</option>
                  <option value="sessions">{t.sortBySessions}</option>
                  <option value="joinDate">{lang === 'en' ? 'Sort by Join Date' : 'ترتيب بتاريخ الانضمام'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Players Table */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{t.players}</h3>
              <span className="text-sm text-gray-600">
                {t.showing} {filteredPlayers.length} {t.results}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      {lang === 'en' ? 'Name' : 'الاسم'}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      {t.email}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      {lang === 'en' ? 'Position' : 'المركز'}
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      {t.sessionsRemaining}
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      {lang === 'en' ? 'Status' : 'الحالة'}
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPlayers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        {t.noPlayersFound}
                      </td>
                    </tr>
                  ) : (
                    filteredPlayers.map(player => (
                      <tr key={player.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                              {(lang === 'en' ? player.name : player.nameAr).charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{lang === 'en' ? player.name : player.nameAr}</p>
                              <p className="text-xs text-gray-500">{player.age} {lang === 'en' ? 'years' : 'سنة'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{player.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{lang === 'en' ? player.position : player.positionAr}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                            {player.sessionsRemaining || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            (player.sessionsRemaining || 0) > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {(player.sessionsRemaining || 0) > 0 ? t.active : t.inactive}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button 
                            onClick={() => alert(`View player details: ${player.name}`)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition">
                            <Eye size={18} className="text-blue-600" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{lang === 'en' ? 'Recent Applications' : 'الطلبات الأخيرة'}</h3>
                <button onClick={() => setCurrentPage('applications')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  {lang === 'en' ? 'View All →' : 'عرض الكل ←'}
                </button>
              </div>
              {recentApplications.length === 0 ? (
                <p className="text-center py-4 text-gray-500 text-sm">{t.noApplicationsYet}</p>
              ) : (
                <div className="space-y-2">
                  {recentApplications.map(app => (
                    <div key={app.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition cursor-pointer"
                      onClick={() => {
                        setSelectedApplication(app);
                        setCurrentPage('applications');
                      }}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{app.fullName}</p>
                          <p className="text-xs text-gray-500">{app.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{lang === 'en' ? 'Upcoming Sessions' : 'التدريبات القادمة'}</h3>
                <button onClick={() => setCurrentPage('sessions-manage')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  {lang === 'en' ? 'View All →' : 'عرض الكل ←'}
                </button>
              </div>
              {upcomingSessions.length === 0 ? (
                <p className="text-center py-4 text-gray-500 text-sm">{t.noSessionsYet}</p>
              ) : (
                <div className="space-y-2">
                  {upcomingSessions.map(session => (
                    <div key={session.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{session.date}</p>
                            <p className="text-xs text-gray-500">{session.time} • {lang === 'en' ? session.location : session.locationAr}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-blue-600">{lang === 'en' ? session.type : session.typeAr}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CREATE POST MODAL */}
          {showCreatePostModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreatePostModal(false)}>
    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">
          {lang === 'en' ? 'Create New Post' : 'إنشاء منشور جديد'}
        </h3>
        <button 
          onClick={() => setShowCreatePostModal(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition">
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleCreatePost} className="p-6 space-y-6">
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
              rows={4}
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter content..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {lang === 'en' ? 'Content (Arabic)' : 'المحتوى (عربي)'}
            </label>
            <textarea
              rows={4}
              value={newPost.contentAr}
              onChange={(e) => setNewPost({...newPost, contentAr: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
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

        {/* Media URLs (for posts) */}
        {modalType === 'post' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {lang === 'en' ? 'Image URL' : 'رابط الصورة'}
              </label>
              <input
                type="url"
                value={newPost.imageUrl}
                onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {lang === 'en' ? 'YouTube URL' : 'رابط يوتيوب'}
              </label>
              <input
                type="url"
                value={newPost.videoUrl}
                onChange={(e) => setNewPost({...newPost, videoUrl: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="https://youtube.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {lang === 'en' ? 'Instagram URL' : 'رابط إنستغرام'}
              </label>
              <input
                type="url"
                value={newPost.instagramUrl}
                onChange={(e) => setNewPost({...newPost, instagramUrl: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
        )}

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

        {/* Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {lang === 'en' ? 'Image URL' : 'رابط الصورة'}
            </label>
            <input
              type="url"
              value={newPost.image || ''}
              onChange={(e) => setNewPost({...newPost, image: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {lang === 'en' ? 'Video URL (YouTube)' : 'رابط الفيديو (يوتيوب)'}
            </label>
            <input
              type="url"
              value={newPost.videoUrl}
              onChange={(e) => setNewPost({...newPost, videoUrl: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="https://youtube.com/embed/..."
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowCreatePostModal(false)}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
            {lang === 'en' ? 'Cancel' : 'إلغاء'}
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition shadow-lg">
            {lang === 'en' ? '✓ Create Post' : '✓ إنشاء المنشور'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
        </div>
      </div>
    );
  }


  // REGISTRATION REQUESTS PAGE (Admin/Coach)
  if (currentPage === 'registration-requests' && isAdmin) {
    // Get all posts with pending registrations
    const postsWithRequests = posts.filter(post => 
      post.registrations && post.registrations.length > 0
    );
    
    const pendingRequests = postsWithRequests.flatMap(post => 
      post.registrations
        .filter(reg => reg.status === 'pending')
        .map(reg => ({ ...reg, post }))
    );
    
    const handleApprove = (postId, playerId) => {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            registrations: post.registrations.map(reg => {
              if (reg.playerId === playerId) {
                return {
                  ...reg,
                  status: 'approved',
                  approvedBy: user.name,
                  approvedDate: new Date().toISOString()
                };
              }
              return reg;
            })
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      addNotification(
        lang === 'en' ? 'Registration approved successfully!' : 'تمت الموافقة على التسجيل بنجاح!',
        'success'
      );
    };
    
    const handleReject = (postId, playerId, reason) => {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            registrations: post.registrations.map(reg => {
              if (reg.playerId === playerId) {
                return {
                  ...reg,
                  status: 'rejected',
                  rejectedBy: user.name,
                  rejectedDate: new Date().toISOString(),
                  rejectionReason: reason || (lang === 'en' ? 'Request declined' : 'تم رفض الطلب')
                };
              }
              return reg;
            })
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      addNotification(
        lang === 'en' ? 'Registration rejected' : 'تم رفض التسجيل',
        'info'
      );
    };
    
    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {lang === 'en' ? 'Registration Requests' : 'طلبات التسجيل'}
            </h2>
            <div className="px-4 py-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-800 font-semibold">
                {pendingRequests.length} {lang === 'en' ? 'Pending' : 'قيد الانتظار'}
              </span>
            </div>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="bg-white rounded-xl p-12 shadow-lg text-center">
              <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {lang === 'en' ? 'All Caught Up!' : 'تم الانتهاء من كل شيء!'}
              </h3>
              <p className="text-gray-600">
                {lang === 'en' 
                  ? 'No pending registration requests at the moment.'
                  : 'لا توجد طلبات تسجيل معلقة في الوقت الحالي.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((req, index) => (
                <div key={`${req.post.id}-${req.playerId}`} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-400">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {req.playerName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {lang === 'en' ? req.playerName : (req.playerNameAr || req.playerName)}
                          </h3>
                          <p className="text-sm text-gray-500">{req.playerEmail}</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4 mb-3">
                        <p className="text-sm text-gray-600 mb-1">
                          {lang === 'en' ? 'Requesting to join:' : 'يطلب الانضمام إلى:'}
                        </p>
                        <h4 className="font-bold text-gray-800 mb-2">
                          {lang === 'en' ? req.post.title : (req.post.titleAr || req.post.title)}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {req.post.type === 'training_session' && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                              {lang === 'en' ? '📅 Training Session' : '📅 جلسة تدريب'}
                            </span>
                          )}
                          {req.post.type === 'training_group' && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                              {lang === 'en' ? '👥 Training Group' : '👥 مجموعة تدريب'}
                            </span>
                          )}
                          {req.post.date && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                              📅 {req.post.date}
                            </span>
                          )}
                          {req.post.time && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                              🕐 {req.post.time}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        {lang === 'en' ? 'Requested on: ' : 'تم الطلب في: '}
                        {new Date(req.requestDate).toLocaleDateString()} {new Date(req.requestDate).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(req.post.id, req.playerId)}
                      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                      <CheckCircle size={18} />
                      {lang === 'en' ? 'Approve' : 'موافقة'}
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt(lang === 'en' ? 'Rejection reason (optional):' : 'سبب الرفض (اختياري):');
                        handleReject(req.post.id, req.playerId, reason);
                      }}
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2">
                      <X size={18} />
                      {lang === 'en' ? 'Reject' : 'رفض'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Registrations */}
          {postsWithRequests.length > 0 && (
            <div className="mt-6 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {lang === 'en' ? 'All Registrations by Training' : 'جميع التسجيلات حسب التدريب'}
              </h3>
              <div className="space-y-4">
                {postsWithRequests.map(post => (
                  <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">
                      {lang === 'en' ? post.title : (post.titleAr || post.title)}
                    </h4>
                    <div className="flex gap-4 text-sm">
                      <span className="text-green-700 font-medium">
                        ✓ {post.registrations.filter(r => r.status === 'approved').length} {lang === 'en' ? 'Approved' : 'موافق عليه'}
                      </span>
                      <span className="text-yellow-700 font-medium">
                        ⏳ {post.registrations.filter(r => r.status === 'pending').length} {lang === 'en' ? 'Pending' : 'معلق'}
                      </span>
                      <span className="text-red-700 font-medium">
                        ✗ {post.registrations.filter(r => r.status === 'rejected').length} {lang === 'en' ? 'Rejected' : 'مرفوض'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // MANAGE GROUPS PAGE (Admin/Coach)
  if (currentPage === 'groups-manage' && isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {lang === 'en' ? 'Manage Training Groups' : 'إدارة المجموعات التدريبية'}
          </h2>
          <div className="bg-white rounded-xl p-12 shadow-lg text-center">
            <Users size={64} className="mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {lang === 'en' ? 'Training Groups' : 'المجموعات التدريبية'}
            </h3>
            <p className="text-gray-600 mb-6">
              {lang === 'en' 
                ? 'Manage your training groups here. Create groups from the "Manage Sessions" page.'
                : 'أدر مجموعاتك التدريبية هنا. أنشئ مجموعات من صفحة "إدارة الجلسات".'}
            </p>
            <button
              onClick={() => setCurrentPage('sessions-manage')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              {lang === 'en' ? 'Go to Manage Sessions' : 'انتقل إلى إدارة الجلسات'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PLAYER MANAGEMENT PAGE (Admin only)
  if (currentPage === 'player-management' && isAdmin) {
    const handlePromoteToCoach = (email) => {
      const updatedUsers = {...users};
      if (updatedUsers[email]) {
        updatedUsers[email].role = 'admin';
        setUsers(updatedUsers);
        addNotification(
          lang === 'en' ? 'Player promoted to coach successfully!' : 'تم ترقية اللاعب إلى مدرب بنجاح!',
          'success'
        );
      }
    };

    const handleDemoteToPlayer = (email) => {
      const updatedUsers = {...users};
      if (updatedUsers[email]) {
        updatedUsers[email].role = 'player';
        setUsers(updatedUsers);
        addNotification(
          lang === 'en' ? 'Coach demoted to player' : 'تم تخفيض رتبة المدرب إلى لاعب',
          'info'
        );
      }
    };

    const players = Object.entries(users).filter(([_, u]) => u.role === 'player');
    const coaches = Object.entries(users).filter(([_, u]) => u.role === 'admin');

    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {lang === 'en' ? 'Player & Coach Management' : 'إدارة اللاعبين والمدربين'}
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Users size={24} className="text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">{players.length}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Total Players' : 'إجمالي اللاعبين'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Star size={24} className="text-orange-600" />
                <span className="text-3xl font-bold text-orange-600">{coaches.length}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Total Coaches' : 'إجمالي المدربين'}
              </p>
            </div>
          </div>

          {/* Players List */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {lang === 'en' ? 'Players' : 'اللاعبون'}
            </h3>
            <div className="space-y-3">
              {players.map(([email, player]) => (
                <div key={email} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {player.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {lang === 'en' ? player.name : (player.nameAr || player.name)}
                      </p>
                      <p className="text-sm text-gray-500">{email}</p>
                      {player.position && (
                        <p className="text-xs text-gray-600">
                          {lang === 'en' ? player.position : (player.positionAr || player.position)}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handlePromoteToCoach(email)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition text-sm">
                    {lang === 'en' ? '⭐ Promote to Coach' : '⭐ ترقية لمدرب'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Coaches List */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {lang === 'en' ? 'Coaches' : 'المدربون'}
            </h3>
            <div className="space-y-3">
              {coaches.map(([email, coach]) => (
                <div key={email} className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {coach.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">
                          {lang === 'en' ? coach.name : (coach.nameAr || coach.name)}
                        </p>
                        <Star size={16} className="text-orange-600" />
                      </div>
                      <p className="text-sm text-gray-500">{email}</p>
                      <p className="text-xs text-orange-700 font-medium">
                        {lang === 'en' ? 'Coach' : 'مدرب'}
                      </p>
                    </div>
                  </div>
                  {email !== user.email && (
                    <button
                      onClick={() => handleDemoteToPlayer(email)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition text-sm">
                      {lang === 'en' ? 'Remove Coach Role' : 'إزالة دور المدرب'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MANAGE SESSIONS PAGE (Admin/Coach)
  if (currentPage === 'sessions-manage' && isAdmin) {
    const trainingSessions = posts.filter(p => p.type === 'training_session' || p.type === 'training_group');
    
    const upcomingSessions = trainingSessions.filter(s => {
      if (!s.date) return false;
      return new Date(s.date) >= new Date();
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const pastSessions = trainingSessions.filter(s => {
      if (!s.date) return false;
      return new Date(s.date) < new Date();
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const ongoingGroups = trainingSessions.filter(s => !s.date && s.type === 'training_group');

    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {lang === 'en' ? 'Manage Training Sessions' : 'إدارة الجلسات التدريبية'}
            </h2>
            <button
              onClick={() => {
                setModalType('training');
                setNewPost({
                  ...newPost,
                  type: 'training',
                  trainingType: 'training_session'
                });
                setShowCreatePostModal(true);
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2">
              <Plus size={20} />
              {lang === 'en' ? 'Create Session' : 'إنشاء جلسة'}
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <Calendar size={24} className="text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">{upcomingSessions.length}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Upcoming Sessions' : 'الجلسات القادمة'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-2">
                <Users size={24} className="text-green-600" />
                <span className="text-3xl font-bold text-green-600">{ongoingGroups.length}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Active Groups' : 'المجموعات النشطة'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-gray-500">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle size={24} className="text-gray-600" />
                <span className="text-3xl font-bold text-gray-600">{pastSessions.length}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Past Sessions' : 'الجلسات السابقة'}
              </p>
            </div>
          </div>

          {/* Upcoming Sessions */}
          {upcomingSessions.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-blue-600" />
                {lang === 'en' ? 'Upcoming Sessions' : 'الجلسات القادمة'}
              </h3>
              <div className="space-y-3">
                {upcomingSessions.map(session => {
                  const registrations = session.registrations || [];
                  const approved = registrations.filter(r => r.status === 'approved').length;
                  
                  return (
                    <div key={session.id} className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">
                            {lang === 'en' ? session.title : (session.titleAr || session.title)}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {lang === 'en' ? session.content : (session.contentAr || session.content)}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                              📅 {session.date}
                            </span>
                            {session.time && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                🕐 {session.time}
                              </span>
                            )}
                            {session.location && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                📍 {lang === 'en' ? session.location : (session.locationAr || session.location)}
                              </span>
                            )}
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                              👥 {approved} {lang === 'en' ? 'registered' : 'مسجل'}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setCurrentPage('session-attendance')}
                          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                          {lang === 'en' ? 'Mark Attendance' : 'تسجيل الحضور'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ongoing Groups */}
          {ongoingGroups.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users size={20} className="text-green-600" />
                {lang === 'en' ? 'Active Training Groups' : 'المجموعات التدريبية النشطة'}
              </h3>
              <div className="space-y-3">
                {ongoingGroups.map(group => {
                  const registrations = group.registrations || [];
                  const approved = registrations.filter(r => r.status === 'approved').length;
                  
                  return (
                    <div key={group.id} className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">
                            {lang === 'en' ? group.title : (group.titleAr || group.title)}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {lang === 'en' ? group.content : (group.contentAr || group.content)}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {group.sessionDays && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                📅 {group.sessionDays}
                              </span>
                            )}
                            {group.numberOfSessions && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                🔢 {group.numberOfSessions} {lang === 'en' ? 'sessions' : 'جلسات'}
                              </span>
                            )}
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                              👥 {approved} {lang === 'en' ? 'members' : 'عضو'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Past Sessions */}
          {pastSessions.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-gray-600" />
                {lang === 'en' ? 'Past Sessions' : 'الجلسات السابقة'}
              </h3>
              <div className="space-y-3">
                {pastSessions.slice(0, 5).map(session => {
                  const registrations = session.registrations || [];
                  const approved = registrations.filter(r => r.status === 'approved').length;
                  
                  return (
                    <div key={session.id} className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg opacity-75">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-700 mb-1">
                            {lang === 'en' ? session.title : (session.titleAr || session.title)}
                          </h4>
                          <div className="flex gap-2 text-xs text-gray-600">
                            <span>📅 {session.date}</span>
                            {session.time && <span>🕐 {session.time}</span>}
                            <span>👥 {approved} {lang === 'en' ? 'attended' : 'حضروا'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {trainingSessions.length === 0 && (
            <div className="bg-white rounded-xl p-12 shadow-lg text-center">
              <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {lang === 'en' ? 'No Training Sessions Yet' : 'لا توجد جلسات تدريبية بعد'}
              </h3>
              <p className="text-gray-600 mb-6">
                {lang === 'en' 
                  ? 'Create your first training session to get started!'
                  : 'أنشئ أول جلسة تدريبية لك للبدء!'}
              </p>
              <button
                onClick={() => {
                  setNewPost({...newPost, type: 'training_session'});
                  setShowCreatePostModal(true);
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                {lang === 'en' ? 'Create Session' : 'إنشاء جلسة'}
              </button>
            </div>
          )}
        </div>

        {/* Create Post Modal - Available on Manage Sessions page */}
        {showCreatePostModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreatePostModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  {lang === 'en' ? 'Create New Session' : 'إنشاء جلسة جديدة'}
                </h3>
                <button 
                  onClick={() => setShowCreatePostModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleCreatePost} className="p-6 space-y-6">
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
                      dir="rtl"
                    />
                  </div>
                </div>

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
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'en' ? 'Post Type' : 'نوع المنشور'} *
                    </label>
                    <select
                      value={newPost.type}
                      onChange={(e) => setNewPost({...newPost, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                      <option value="training_session">{lang === 'en' ? 'Training Session' : 'جلسة تدريب'}</option>
                      <option value="training_group">{lang === 'en' ? 'Training Group' : 'مجموعة تدريب'}</option>
                      <option value="announcement">{lang === 'en' ? 'Announcement' : 'إعلان'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'en' ? 'Visibility' : 'الظهور'} *
                    </label>
                    <select
                      value={newPost.visibility}
                      onChange={(e) => setNewPost({...newPost, visibility: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none">
                      <option value="public">{lang === 'en' ? 'Public' : 'عام'}</option>
                      <option value="members">{lang === 'en' ? 'Members Only' : 'للأعضاء فقط'}</option>
                    </select>
                  </div>
                </div>

                {(newPost.type === 'training_session' || newPost.type === 'training_group') && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition shadow-lg">
                    {lang === 'en' ? '✓ Create Post' : '✓ إنشاء منشور'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreatePostModal(false)}
                    className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition">
                    {lang === 'en' ? 'Cancel' : 'إلغاء'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // MANAGE NEWS PAGE (Admin/Coach)
  if (currentPage === 'news-manage' && isAdmin) {
    // Using component-level states: editingPost, setEditingPost, showDeleteConfirm, setShowDeleteConfirm

    const handleEditPost = (post) => {
      setEditingPost(post);
      setNewPost({
        title: post.title,
        titleAr: post.titleAr || '',
        content: post.content,
        contentAr: post.contentAr || '',
        type: post.type,
        visibility: post.visibility,
        date: post.date || '',
        time: post.time || '',
        location: post.location || '',
        locationAr: post.locationAr || '',
        maxParticipants: post.maxParticipants || '',
        numberOfSessions: post.numberOfSessions || '',
        sessionDays: post.sessionDays || '',
        imageUrl: post.imageUrl || '',
        videoUrl: post.videoUrl || ''
      });
      setShowCreatePostModal(true);
    };

    const handleUpdatePost = (e) => {
      e.preventDefault();
      
      const updatedPosts = posts.map(p => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            ...newPost,
            updatedAt: new Date().toISOString(),
            updatedBy: user.name
          };
        }
        return p;
      });
      
      setPosts(updatedPosts);
      setEditingPost(null);
      setShowCreatePostModal(false);
      setNewPost({
        title: '', titleAr: '', content: '', contentAr: '',
        type: 'announcement', visibility: 'public',
        date: '', time: '', location: '', locationAr: '',
        maxParticipants: '', numberOfSessions: '', sessionDays: '',
        imageUrl: '', videoUrl: ''
      });
      
      addNotification(
        lang === 'en' ? 'Post updated successfully!' : 'تم تحديث المنشور بنجاح!',
        'success'
      );
    };

    const handleDeletePost = (postId) => {
      const updatedPosts = posts.filter(p => p.id !== postId);
      setPosts(updatedPosts);
      setShowDeleteConfirm(null);
      
      addNotification(
        lang === 'en' ? 'Post deleted successfully!' : 'تم حذف المنشور بنجاح!',
        'success'
      );
    };

    // Using component-level state: newsFilterType
    const filteredPosts = newsFilterType === 'all' 
      ? posts 
      : posts.filter(p => p.type === newsFilterType);

    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {lang === 'en' ? 'Manage News & Posts' : 'إدارة الأخبار والمنشورات'}
            </h2>
            <button
              onClick={() => {
                setEditingPost(null);
                setModalType('post');
                setNewPost({...newPost, type: 'post', category: 'announcement'});
                setShowCreatePostModal(true);
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2">
              <Plus size={20} />
              {lang === 'en' ? 'Create New Post' : 'إنشاء منشور جديد'}
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <FileText size={24} className="text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">{posts.length}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Total Posts' : 'إجمالي المنشورات'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Bell size={24} className="text-purple-600" />
                <span className="text-3xl font-bold text-purple-600">
                  {posts.filter(p => p.type === 'announcement').length}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Announcements' : 'إعلانات'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Calendar size={24} className="text-green-600" />
                <span className="text-3xl font-bold text-green-600">
                  {posts.filter(p => p.type === 'training_session').length}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Sessions' : 'جلسات'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Users size={24} className="text-orange-600" />
                <span className="text-3xl font-bold text-orange-600">
                  {posts.filter(p => p.type === 'training_group').length}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {lang === 'en' ? 'Groups' : 'مجموعات'}
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">
                {lang === 'en' ? 'Filter by type:' : 'تصفية حسب النوع:'}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setNewsFilterType('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    newsFilterType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {lang === 'en' ? 'All' : 'الكل'}
                </button>
                <button
                  onClick={() => setNewsFilterType('announcement')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    newsFilterType === 'announcement'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {lang === 'en' ? 'Announcements' : 'إعلانات'}
                </button>
                <button
                  onClick={() => setNewsFilterType('training_session')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    newsFilterType === 'training_session'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {lang === 'en' ? 'Sessions' : 'جلسات'}
                </button>
                <button
                  onClick={() => setNewsFilterType('training_group')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    newsFilterType === 'training_group'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {lang === 'en' ? 'Groups' : 'مجموعات'}
                </button>
              </div>
            </div>
          </div>

          {/* Posts List */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 shadow-lg text-center">
              <FileText size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {lang === 'en' ? 'No Posts Yet' : 'لا توجد منشورات بعد'}
              </h3>
              <p className="text-gray-600 mb-6">
                {lang === 'en' 
                  ? 'Create your first post to get started!'
                  : 'أنشئ أول منشور لك للبدء!'}
              </p>
              <button
                onClick={() => setShowCreatePostModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                {lang === 'en' ? 'Create Post' : 'إنشاء منشور'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {post.type === 'announcement' && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            {lang === 'en' ? '📢 Announcement' : '📢 إعلان'}
                          </span>
                        )}
                        {post.type === 'training_session' && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {lang === 'en' ? '📅 Session' : '📅 جلسة'}
                          </span>
                        )}
                        {post.type === 'training_group' && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                            {lang === 'en' ? '👥 Group' : '👥 مجموعة'}
                          </span>
                        )}
                        {post.visibility === 'members' ? (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {lang === 'en' ? '🔒 Members Only' : '🔒 للأعضاء فقط'}
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            {lang === 'en' ? '🌐 Public' : '🌐 عام'}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {lang === 'en' ? post.title : (post.titleAr || post.title)}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {lang === 'en' ? post.content : (post.contentAr || post.content)}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        {post.date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                        )}
                        {post.time && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {post.time}
                          </span>
                        )}
                        {post.registrations && (
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {post.registrations.filter(r => r.status === 'approved').length} {lang === 'en' ? 'registered' : 'مسجل'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                        title={lang === 'en' ? 'Edit' : 'تعديل'}>
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(post.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        title={lang === 'en' ? 'Delete' : 'حذف'}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Delete Confirmation */}
                  {showDeleteConfirm === post.id && (
                    <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800 mb-3">
                        {lang === 'en' 
                          ? 'Are you sure you want to delete this post? This action cannot be undone.'
                          : 'هل أنت متأكد من حذف هذا المنشور؟ لا يمكن التراجع عن هذا الإجراء.'}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                          {lang === 'en' ? 'Yes, Delete' : 'نعم، احذف'}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
                          {lang === 'en' ? 'Cancel' : 'إلغاء'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Post Modal */}
        {showCreatePostModal && editingPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreatePostModal(false)}>
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {lang === 'en' ? 'Edit Post' : 'تعديل المنشور'}
              </h3>
              <form onSubmit={handleUpdatePost} className="space-y-4">
                {/* Same form fields as create post, but calls handleUpdatePost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Title (English)' : 'العنوان (بالإنجليزية)'}
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Title (Arabic)' : 'العنوان (بالعربية)'}
                  </label>
                  <input
                    type="text"
                    value={newPost.titleAr}
                    onChange={(e) => setNewPost({...newPost, titleAr: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Content (English)' : 'المحتوى (بالإنجليزية)'}
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                    {lang === 'en' ? 'Update Post' : 'تحديث المنشور'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreatePostModal(false);
                      setEditingPost(null);
                    }}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
                    {lang === 'en' ? 'Cancel' : 'إلغاء'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // SESSION ATTENDANCE PAGE (Admin/Coach)
  if (currentPage === 'session-attendance' && isAdmin) {
    // Get all approved training posts with registrations
    const trainingSessions = posts.filter(post => 
      (post.type === 'training_session' || post.type === 'training_group') &&
      post.registrations && 
      post.registrations.some(reg => reg.status === 'approved')
    );

    // Handle marking attendance
    const handleMarkAttendance = (postId, playerId, attended) => {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            registrations: post.registrations.map(reg => {
              if (reg.playerId === playerId) {
                return {
                  ...reg,
                  attendance: {
                    ...(reg.attendance || {}),
                    [new Date().toISOString().split('T')[0]]: {
                      attended,
                      markedBy: user.name,
                      markedAt: new Date().toISOString()
                    }
                  }
                };
              }
              return reg;
            })
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      addNotification(
        lang === 'en' 
          ? `Attendance marked as ${attended ? 'Present' : 'Absent'}`
          : `تم تسجيل الحضور كـ ${attended ? 'حاضر' : 'غائب'}`,
        'success'
      );
    };

    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {lang === 'en' ? 'Session Attendance' : 'حضور الجلسات'}
          </h2>

          {trainingSessions.length === 0 ? (
            <div className="bg-white rounded-xl p-12 shadow-lg text-center">
              <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {lang === 'en' ? 'No Active Sessions' : 'لا توجد جلسات نشطة'}
              </h3>
              <p className="text-gray-600">
                {lang === 'en' 
                  ? 'Create training sessions and approve registrations to mark attendance.'
                  : 'أنشئ جلسات تدريبية ووافق على التسجيلات لتسجيل الحضور.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {trainingSessions.map(session => {
                const approvedPlayers = session.registrations.filter(reg => reg.status === 'approved');
                const today = new Date().toISOString().split('T')[0];
                
                return (
                  <div key={session.id} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {lang === 'en' ? session.title : (session.titleAr || session.title)}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-sm mb-3">
                          {session.type === 'training_session' && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                              📅 {lang === 'en' ? 'Session' : 'جلسة'}
                            </span>
                          )}
                          {session.type === 'training_group' && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                              👥 {lang === 'en' ? 'Group' : 'مجموعة'}
                            </span>
                          )}
                          {session.date && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                              📅 {session.date}
                            </span>
                          )}
                          {session.time && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                              🕐 {session.time}
                            </span>
                          )}
                          {session.location && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                              📍 {lang === 'en' ? session.location : (session.locationAr || session.location)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {lang === 'en' ? 'Registered Players' : 'اللاعبون المسجلون'}
                        </p>
                        <p className="text-2xl font-bold text-blue-600">{approvedPlayers.length}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-700 mb-3">
                        {lang === 'en' ? 'Mark Attendance' : 'تسجيل الحضور'}
                      </h4>
                      
                      {approvedPlayers.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                          {lang === 'en' ? 'No registered players yet' : 'لا يوجد لاعبون مسجلون بعد'}
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {approvedPlayers.map(player => {
                            const todayAttendance = player.attendance?.[today];
                            const hasMarked = todayAttendance !== undefined;
                            const isPresent = todayAttendance?.attended;
                            
                            return (
                              <div key={player.playerId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {player.playerName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-800">
                                      {lang === 'en' ? player.playerName : (player.playerNameAr || player.playerName)}
                                    </p>
                                    <p className="text-sm text-gray-500">{player.playerEmail}</p>
                                  </div>
                                  {hasMarked && (
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                      isPresent 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {isPresent 
                                        ? (lang === 'en' ? '✓ Present' : '✓ حاضر')
                                        : (lang === 'en' ? '✗ Absent' : '✗ غائب')
                                      }
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleMarkAttendance(session.id, player.playerId, true)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                      hasMarked && isPresent
                                        ? 'bg-green-600 text-white'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    }`}>
                                    {lang === 'en' ? '✓ Present' : '✓ حاضر'}
                                  </button>
                                  <button
                                    onClick={() => handleMarkAttendance(session.id, player.playerId, false)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                      hasMarked && !isPresent
                                        ? 'bg-red-600 text-white'
                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                    }`}>
                                    {lang === 'en' ? '✗ Absent' : '✗ غائب'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Attendance Summary */}
                    {approvedPlayers.length > 0 && (() => {
                      const markedToday = approvedPlayers.filter(p => p.attendance?.[today] !== undefined).length;
                      const presentToday = approvedPlayers.filter(p => p.attendance?.[today]?.attended === true).length;
                      
                      return markedToday > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {lang === 'en' ? 'Today\'s Summary:' : 'ملخص اليوم:'}
                            </span>
                            <span className="font-semibold text-gray-800">
                              {presentToday} / {approvedPlayers.length} {lang === 'en' ? 'Present' : 'حاضر'}
                              {' '}({Math.round((presentToday / approvedPlayers.length) * 100)}%)
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // TRAINING CALENDAR PAGE (All users)
  if (currentPage === 'training-calendar') {
    // Using component-level states: selectedMonth, setSelectedMonth, selectedYear, setSelectedYear

    // Get training sessions for selected month
    const monthSessions = posts.filter(post => {
      if (post.type !== 'training_session' && post.type !== 'training_group') return false;
      if (!post.date) return false;
      
      const postDate = new Date(post.date);
      return postDate.getMonth() === selectedMonth && postDate.getFullYear() === selectedYear;
    });

    // Generate calendar days
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const getSessionsForDay = (day) => {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return monthSessions.filter(s => s.date === dateStr);
    };

    const monthNames = lang === 'en' 
      ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    
    const dayNames = lang === 'en'
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {lang === 'en' ? 'Training Calendar' : 'تقويم التدريبات'}
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (selectedMonth === 0) {
                    setSelectedMonth(11);
                    setSelectedYear(selectedYear - 1);
                  } else {
                    setSelectedMonth(selectedMonth - 1);
                  }
                }}
                className="p-2 bg-white rounded-lg hover:bg-gray-100 transition shadow">
                <ChevronLeft size={20} />
              </button>
              <span className="text-lg font-semibold min-w-[200px] text-center">
                {monthNames[selectedMonth]} {selectedYear}
              </span>
              <button
                onClick={() => {
                  if (selectedMonth === 11) {
                    setSelectedMonth(0);
                    setSelectedYear(selectedYear + 1);
                  } else {
                    setSelectedMonth(selectedMonth + 1);
                  }
                }}
                className="p-2 bg-white rounded-lg hover:bg-gray-100 transition shadow">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Day names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }
                
                const daySessions = getSessionsForDay(day);
                const isToday = 
                  day === new Date().getDate() && 
                  selectedMonth === new Date().getMonth() && 
                  selectedYear === new Date().getFullYear();
                
                return (
                  <div
                    key={day}
                    className={`aspect-square border-2 rounded-lg p-2 transition ${
                      isToday 
                        ? 'border-blue-500 bg-blue-50' 
                        : daySessions.length > 0
                        ? 'border-green-300 bg-green-50 hover:bg-green-100 cursor-pointer'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                    <div className="flex flex-col h-full">
                      <span className={`text-sm font-semibold ${isToday ? 'text-blue-700' : 'text-gray-700'}`}>
                        {day}
                      </span>
                      {daySessions.length > 0 && (
                        <div className="flex-1 flex flex-col justify-center gap-0.5 mt-1">
                          {daySessions.slice(0, 2).map((session, i) => (
                            <div
                              key={session.id}
                              className={`text-xs px-1 py-0.5 rounded truncate ${
                                session.type === 'training_session'
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-blue-200 text-blue-800'
                              }`}
                              title={lang === 'en' ? session.title : (session.titleAr || session.title)}>
                              {session.time} {session.type === 'training_session' ? '📅' : '👥'}
                            </div>
                          ))}
                          {daySessions.length > 2 && (
                            <div className="text-xs text-gray-600 text-center">
                              +{daySessions.length - 2}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sessions List for Selected Month */}
          {monthSessions.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {lang === 'en' ? 'Sessions This Month' : 'الجلسات هذا الشهر'} ({monthSessions.length})
              </h3>
              <div className="space-y-3">
                {monthSessions
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map(session => (
                  <div key={session.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {lang === 'en' ? session.title : (session.titleAr || session.title)}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className={`px-2 py-1 rounded-full font-medium ${
                            session.type === 'training_session'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {session.type === 'training_session' 
                              ? (lang === 'en' ? '📅 Session' : '📅 جلسة')
                              : (lang === 'en' ? '👥 Group' : '👥 مجموعة')
                            }
                          </span>
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                            📅 {session.date}
                          </span>
                          {session.time && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                              🕐 {session.time}
                            </span>
                          )}
                          {session.location && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                              📍 {lang === 'en' ? session.location : (session.locationAr || session.location)}
                            </span>
                          )}
                        </div>
                      </div>
                      {session.registrations && (
                        <div className="text-right ml-4">
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Registered' : 'مسجلون'}</p>
                          <p className="text-lg font-bold text-blue-600">
                            {session.registrations.filter(r => r.status === 'approved').length}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // APPLICATIONS PAGE (Admin)
  if (currentPage === 'applications' && isAdmin) {
    const filteredApps = getFilteredApplications();
    
    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{t.applications}</h2>
            <div className="flex items-center gap-2">
              <select
                value={applicationFilterStatus}
                onChange={(e) => setApplicationFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="all">{t.all}</option>
                <option value="pending">{t.pending}</option>
                <option value="accepted">{t.approved}</option>
                <option value="rejected">{t.rejected}</option>
              </select>
            </div>
          </div>

          {filteredApps.length === 0 ? (
            <div className="bg-white rounded-xl p-12 shadow text-center">
              <FileText size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">{t.noApplicationsYet}</h3>
              <p className="text-gray-500">{lang === 'en' ? 'New applications will appear here' : 'ستظهر الطلبات الجديدة هنا'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApps.map(app => (
                <div key={app.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        {app.fullName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{app.fullName}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Mail size={14} />
                            {app.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone size={14} />
                            {app.phone}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">{lang === 'en' ? 'Age' : 'العمر'}:</span>
                            <span className="font-medium text-gray-800 ml-1">
                              {new Date().getFullYear() - new Date(app.dateOfBirth).getFullYear()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">{t.position}:</span>
                            <span className="font-medium text-gray-800 ml-1">{lang === 'en' ? app.position : app.positionAr}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">{t.experience}:</span>
                            <span className="font-medium text-gray-800 ml-1">
                              {app.experience === 'beginner' ? t.beginner :
                               app.experience === 'intermediate' ? t.intermediate :
                               t.advanced}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">{t.status}:</span>
                            <span className={`font-medium ml-1 ${
                              app.status === 'pending' ? 'text-yellow-600' :
                              app.status === 'accepted' ? 'text-green-600' :
                              'text-red-600'
                            }`}>
                              {app.status === 'pending' ? t.pending :
                               app.status === 'accepted' ? t.approved :
                               t.rejected}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status === 'pending' && (lang === 'en' ? 'PENDING' : 'معلق')}
                      {app.status === 'accepted' && (lang === 'en' ? 'ACCEPTED' : 'مقبول')}
                      {app.status === 'rejected' && (lang === 'en' ? 'REJECTED' : 'مرفوض')}
                    </span>
                  </div>

                  {app.previousClubs && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">{t.previousClubs}</p>
                      <p className="text-sm text-gray-800">{app.previousClubs}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {lang === 'en' ? 'Submitted' : 'تاريخ التقديم'}: {app.submittedDate}
                    </span>
                    {app.processedDate && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {lang === 'en' ? 'Processed' : 'تاريخ المعالجة'}: {app.processedDate}
                      </span>
                    )}
                  </div>

                  {app.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => acceptApplication(app.id)}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2">
                        <CheckCircle size={20} />
                        ✅ {t.acceptApplication}
                      </button>
                      <button 
                        onClick={() => rejectApplication(app.id)}
                        className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg flex items-center justify-center gap-2">
                        <X size={20} />
                        ❌ {t.rejectApplication}
                      </button>
                    </div>
                  )}

                  {app.status !== 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => deleteApplication(app.id)}
                        className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition flex items-center justify-center gap-2">
                        <Trash2 size={18} />
                        {t.delete}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ATTENDANCE MANAGEMENT PAGE (Admin)
  if (currentPage === 'attendance-management' && isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{t.attendanceManagement}</h2>
            <button 
              onClick={exportAttendanceReport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2 transition shadow-lg">
              <FileDown size={18} />
              {t.exportReport}
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle size={32} />
              </div>
              <p className="text-blue-100 text-sm mb-1">{t.totalAttendance}</p>
              <p className="text-4xl font-bold">{attendance.filter(a => a.status === 'present').length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Calendar size={32} />
              </div>
              <p className="text-green-100 text-sm mb-1">{t.todaysAttendance}</p>
              <p className="text-4xl font-bold">
                {attendance.filter(a => {
                  const today = new Date().toISOString().split('T')[0];
                  return a.date === today && a.status === 'present';
                }).length}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp size={32} />
              </div>
              <p className="text-yellow-100 text-sm mb-1">{t.averageRate}</p>
              <p className="text-4xl font-bold">
                {attendance.length > 0 
                  ? Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100)
                  : 0
                }%
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <X size={32} />
              </div>
              <p className="text-red-100 text-sm mb-1">{t.absent}</p>
              <p className="text-4xl font-bold">{attendance.filter(a => a.status === 'absent').length}</p>
            </div>
          </div>

          {/* Sessions List with Attendance */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {lang === 'en' ? 'Mark Attendance by Session' : 'تسجيل الحضور حسب التدريب'}
            </h3>

            <div className="space-y-6">
              {sessions.map(session => {
                const sessionAttendance = attendance.filter(a => a.sessionId === session.id);
                const players = Object.values(users).filter(u => u.role === 'player');
                const presentCount = sessionAttendance.filter(a => a.status === 'present').length;
                
                return (
                  <div key={session.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Calendar className="text-white" size={32} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-xl mb-1">
                            {session.date} {lang === 'en' ? 'at' : 'في'} {session.time}
                          </h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin size={16} />
                            {lang === 'en' ? session.location : session.locationAr}
                          </p>
                          {session.type && (
                            <p className="text-xs text-gray-500 mt-1">{lang === 'en' ? session.type : session.typeAr}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">{t.present}</p>
                        <p className="text-3xl font-bold text-green-600">{presentCount} / {players.length}</p>
                        <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all"
                            style={{width: `${(presentCount / players.length) * 100}%`}}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Player List for Attendance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {players.map(player => {
                        const attended = sessionAttendance.find(a => a.playerId === player.id);
                        
                        return (
                          <div key={player.id} className={`flex items-center justify-between p-4 rounded-lg transition ${
                            attended ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                          }`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                                attended ? 'bg-green-500' : 'bg-gray-400'
                              }`}>
                                {attended ? '✓' : (lang === 'en' ? player.name : player.nameAr).charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{lang === 'en' ? player.name : player.nameAr}</p>
                                <p className="text-xs text-gray-500">{player.email}</p>
                              </div>
                            </div>
                            
                            {attended ? (
                              <div className="flex flex-col items-end gap-1">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow">
                                  {t.present}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(attended.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                              </div>
                            ) : (
                              <button
                                onClick={() => markAttendance(session.id, player.id, 'present', 'admin')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold transition shadow-lg flex items-center gap-1">
                                <CheckCircle size={16} />
                                {lang === 'en' ? 'Mark' : 'تسجيل'}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {sessions.length === 0 && (
                <div className="text-center py-12">
                  <Calendar size={64} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">{t.noSessionsYet}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ANALYTICS PAGE (Admin)
  if (currentPage === 'analytics' && isAdmin) {
    const revenueData = getRevenueAnalytics();
    const playerData = getPlayerAnalytics();
    const trainingData = getTrainingAnalytics();

    return (
      <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navigation />
        <NotificationToast />
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{t.reportsAnalytics}</h2>
            <div className="flex gap-2">
              <button 
                onClick={exportAnalyticsExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2 transition">
                <FileDown size={18} />
                {lang === 'en' ? 'Export CSV' : 'تصدير CSV'}
              </button>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2 transition">
                <Printer size={18} />
                {lang === 'en' ? 'Print' : 'طباعة'}
              </button>
            </div>
          </div>

          {/* Report Type Tabs */}
          <div className="bg-white rounded-xl p-2 shadow-lg mb-6 flex gap-2">
            <button
              onClick={() => setSelectedReportType('revenue')}
              className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
                selectedReportType === 'revenue'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}>
              💰 {t.revenue}
            </button>
            <button
              onClick={() => setSelectedReportType('players')}
              className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
                selectedReportType === 'players'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}>
              👥 {t.players}
            </button>
            <button
              onClick={() => setSelectedReportType('training')}
              className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
                selectedReportType === 'training'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}>
              🏋️ {lang === 'en' ? 'Training' : 'التدريب'}
            </button>
          </div>

          {/* REVENUE REPORT */}
          {selectedReportType === 'revenue' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign size={32} />
                    <TrendingUp size={20} />
                  </div>
                  <p className="text-green-100 text-sm mb-1">{t.totalRevenue}</p>
                  <p className="text-4xl font-bold">EGP {revenueData.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-100 mt-2">{lang === 'en' ? 'All time' : 'كل الأوقات'}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <Clock size={28} className="text-yellow-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{t.pendingRevenue}</p>
                  <p className="text-3xl font-bold text-yellow-600">EGP {revenueData.pendingRevenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {registrationRequests.filter(r => r.status === 'pending_approval').length} {lang === 'en' ? 'pending' : 'معلق'}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard size={28} className="text-blue-700" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{lang === 'en' ? 'Avg Transaction' : 'متوسط المعاملة'}</p>
                  <p className="text-3xl font-bold text-blue-700">EGP {revenueData.averageTransactionValue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-2">{lang === 'en' ? 'Per registration' : 'لكل تسجيل'}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <FileText size={28} className="text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{t.transactions}</p>
                  <p className="text-3xl font-bold text-purple-600">{revenueData.transactionCount}</p>
                  <p className="text-xs text-gray-500 mt-2">{lang === 'en' ? 'Completed' : 'مكتمل'}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{lang === 'en' ? 'Revenue Summary' : 'ملخص الإيرادات'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">{lang === 'en' ? 'By Payment Method' : 'حسب طريقة الدفع'}</h4>
                    <div className="space-y-2">
                      {Object.entries(revenueData.revenueByMethod).map(([method, amount]) => {
                        const percentage = Math.round((amount / revenueData.totalRevenue) * 100);
                        return (
                          <div key={method}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-gray-700 capitalize">{method.replace('_', ' ')}</span>
                              <span className="font-bold text-gray-800">EGP {amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{percentage}%</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">{lang === 'en' ? 'Top Training Groups' : 'أفضل مجموعات التدريب'}</h4>
                    <div className="space-y-2">
                      {Object.entries(revenueData.revenueByGroup)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([group, amount], index) => {
                          const percentage = Math.round((amount / revenueData.totalRevenue) * 100);
                          return (
                            <div key={group} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                                #{index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm">{group}</p>
                                <p className="text-xs text-gray-500">EGP {amount.toLocaleString()} • {percentage}%</p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PLAYER REPORT */}
          {selectedReportType === 'players' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <Users size={32} />
                  </div>
                  <p className="text-blue-100 text-sm mb-1">{t.totalPlayers}</p>
                  <p className="text-4xl font-bold">{playerData.totalPlayers}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{t.activePlayers}</p>
                  <p className="text-3xl font-bold text-green-600">{playerData.activePlayers}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {Math.round((playerData.activePlayers / playerData.totalPlayers) * 100) || 0}% {lang === 'en' ? 'of total' : 'من الإجمالي'}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp size={28} className="text-yellow-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{t.attendanceRate}</p>
                  <p className="text-3xl font-bold text-yellow-600">{playerData.attendanceRate}%</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <Activity size={28} className="text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{lang === 'en' ? 'Avg Sessions' : 'متوسط التدريبات'}</p>
                  <p className="text-3xl font-bold text-purple-600">{playerData.averageSessionsPerPlayer}</p>
                  <p className="text-xs text-gray-500 mt-2">{lang === 'en' ? 'Per player' : 'لكل لاعب'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">{lang === 'en' ? 'Position Distribution' : 'توزيع المراكز'}</h3>
                  <div className="space-y-3">
                    {Object.entries(playerData.positionDistribution)
                      .sort((a, b) => b[1] - a[1])
                      .map(([position, count]) => {
                        const percentage = Math.round((count / playerData.totalPlayers) * 100);
                        return (
                          <div key={position}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-gray-700">{position}</span>
                              <span className="font-bold text-gray-800">{count} {lang === 'en' ? 'players' : 'لاعب'}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{percentage}%</p>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">{lang === 'en' ? 'Age Distribution' : 'توزيع الأعمار'}</h3>
                  <div className="space-y-3">
                    {Object.entries(playerData.ageDistribution).map(([age, count]) => {
                      const percentage = Math.round((count / playerData.totalPlayers) * 100);
                      return (
                        <div key={age}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{age}</span>
                            <span className="font-bold text-gray-800">{count} {lang === 'en' ? 'players' : 'لاعب'}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{percentage}%</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TRAINING REPORT */}
          {selectedReportType === 'training' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <Users size={32} />
                  </div>
                  <p className="text-purple-100 text-sm mb-1">{lang === 'en' ? 'Training Groups' : 'مجموعات التدريب'}</p>
                  <p className="text-4xl font-bold">{trainingData.totalGroups}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar size={28} className="text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{lang === 'en' ? 'Total Sessions' : 'إجمالي التدريبات'}</p>
                  <p className="text-3xl font-bold text-blue-600">{trainingData.totalSessions}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <Users size={28} className="text-green-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{lang === 'en' ? 'Avg Group Size' : 'متوسط حجم المجموعة'}</p>
                  <p className="text-3xl font-bold text-green-600">{trainingData.averageGroupSize}</p>
                  <p className="text-xs text-gray-500 mt-2">{lang === 'en' ? 'Players' : 'لاعب'}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle size={28} className="text-yellow-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{lang === 'en' ? 'Total Attendance' : 'إجمالي الحضور'}</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {attendance.filter(a => a.status === 'present').length}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {lang === 'en' ? 'Most Popular Training Groups' : 'مجموعات التدريب الأكثر شعبية'}
                </h3>
                <div className="space-y-3">
                  {Object.entries(trainingData.groupPopularity)
                    .sort((a, b) => b[1] - a[1])
                    .map(([group, count], index) => (
                      <div key={group} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl hover:shadow-md transition">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-lg">{group}</p>
                          <p className="text-sm text-gray-600">{count} {lang === 'en' ? 'registrations' : 'تسجيل'}</p>
                        </div>
                        <div className="text-3xl font-bold text-purple-600">{count}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {lang === 'en' ? 'Attendance by Day of Week' : 'الحضور حسب يوم الأسبوع'}
                </h3>
                <div className="space-y-3">
                  {Object.entries(trainingData.attendanceByDay)
                    .sort((a, b) => b[1] - a[1])
                    .map(([day, count]) => {
                      const maxCount = Math.max(...Object.values(trainingData.attendanceByDay));
                      const percentage = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
                      return (
                        <div key={day}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{day}</span>
                            <span className="font-bold text-gray-800">{count} {lang === 'en' ? 'sessions' : 'تدريب'}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-4 rounded-full transition-all flex items-center justify-end px-2"
                              style={{ width: `${percentage}%` }}>
                              {percentage > 10 && (
                                <span className="text-white text-xs font-bold">{count}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* Info Note */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  {lang === 'en' ? '📊 Advanced Analytics' : '📊 تحليلات متقدمة'}
                </p>
                <p className="text-sm text-gray-700">
                  {lang === 'en' 
                    ? 'For more detailed analytics with charts and graphs, see the complete implementation documentation. This simplified version shows key metrics and statistics.'
                    : 'للحصول على تحليلات أكثر تفصيلاً مع الرسوم البيانية، راجع وثائق التطبيق الكامل. هذه النسخة المبسطة تعرض المقاييس والإحصائيات الرئيسية.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
// LANDING PAGE
if (currentPage === 'landing') {
  return (
    <LandingPage
      lang={lang}
      isRTL={isRTL}
      t={t}
      setLang={setLang}
      setCurrentPage={setCurrentPage}
      NotificationToast={NotificationToast}
      addNotification={addNotification}
      posts={posts}
      setPosts={setPosts}
      user={user}
      handleLogout={handleLogout}
    />
  );
}

  // DEFAULT FALLBACK
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center p-4">
      <NotificationToast />
      <div className="text-center text-white">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <span className="text-yellow-400 font-bold text-4xl">AMVA</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 animate-pulse">AMVA Complete App</h1>
        <p className="text-xl text-blue-100 mb-8">{lang === 'en' ? 'All features included - 2500+ lines!' : 'جميع الميزات متضمنة - أكثر من 2500 سطر!'}</p>
        <button 
          onClick={() => setCurrentPage('landing')}
          className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-xl font-bold text-lg hover:bg-yellow-300 transition transform hover:scale-105 shadow-2xl">
          {lang === 'en' ? 'Go to Landing Page' : 'الذهاب للصفحة الرئيسية'}
        </button>
      </div>
    </div>
  );
}
