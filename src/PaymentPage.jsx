import React, { useState } from 'react';
import { Upload, X, CheckCircle, Camera, CreditCard, Building2, Smartphone } from 'lucide-react';

const PaymentPage = ({ 
  registrationData,
  onPaymentSubmit,
  onCancel,
  lang = 'en'
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [proofType, setProofType] = useState(''); // 'image' or 'transaction'
  const [proofImage, setProofImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [transactionNumber, setTransactionNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = lang === 'ar';

  const t = {
    title: lang === 'en' ? 'Complete Your Payment' : 'أكمل الدفع',
    trainingGroup: lang === 'en' ? 'Training Group' : 'مجموعة التدريب',
    trainingSession: lang === 'en' ? 'Training Session' : 'جلسة التدريب',
    amount: lang === 'en' ? 'Amount' : 'المبلغ',
    sessions: lang === 'en' ? 'Sessions' : 'جلسات',
    paymentMethod: lang === 'en' ? 'Payment Method' : 'طريقة الدفع',
    selectMethod: lang === 'en' ? 'Select your payment method' : 'اختر طريقة الدفع',
    bankTransfer: lang === 'en' ? 'Bank Transfer' : 'تحويل بنكي',
    instapay: lang === 'en' ? 'Instapay' : 'إنستاباي',
    bankDetails: lang === 'en' ? 'Bank Transfer Details' : 'تفاصيل التحويل البنكي',
    instapayDetails: lang === 'en' ? 'Instapay Details' : 'تفاصيل إنستاباي',
    bankName: lang === 'en' ? 'Bank' : 'البنك',
    accountName: lang === 'en' ? 'Account Name' : 'اسم الحساب',
    accountNumber: lang === 'en' ? 'Account Number' : 'رقم الحساب',
    branch: lang === 'en' ? 'Branch' : 'الفرع',
    instapayNumber: lang === 'en' ? 'Instapay Number' : 'رقم إنستاباي',
    uploadProof: lang === 'en' ? 'Upload Payment Proof' : 'رفع إثبات الدفع',
    uploadImage: lang === 'en' ? 'Upload Receipt/Screenshot' : 'رفع الإيصال/لقطة الشاشة',
    orEnterTransaction: lang === 'en' ? 'OR Enter Transaction Number' : 'أو أدخل رقم المعاملة',
    transactionNumber: lang === 'en' ? 'Transaction Number' : 'رقم المعاملة',
    transactionPlaceholder: lang === 'en' ? 'Enter transaction/reference number' : 'أدخل رقم المعاملة/المرجع',
    changeImage: lang === 'en' ? 'Change Image' : 'تغيير الصورة',
    removeImage: lang === 'en' ? 'Remove' : 'إزالة',
    instructions: lang === 'en' 
      ? 'Please complete the payment and upload proof or enter transaction number'
      : 'يرجى إتمام الدفع ورفع الإثبات أو إدخال رقم المعاملة',
    confirm: lang === 'en' ? 'Confirm Payment' : 'تأكيد الدفع',
    cancel: lang === 'en' ? 'Cancel' : 'إلغاء',
    selectMethodError: lang === 'en' ? 'Please select a payment method' : 'يرجى اختيار طريقة الدفع',
    uploadProofError: lang === 'en' ? 'Please upload payment proof or enter transaction number' : 'يرجى رفع إثبات الدفع أو إدخال رقم المعاملة',
    dragDrop: lang === 'en' ? 'Drag & drop or click to upload' : 'اسحب وأفلت أو انقر للرفع',
    imageFormats: lang === 'en' ? 'JPG, PNG, PDF (Max 5MB)' : 'JPG, PNG, PDF (حد أقصى 5 ميجابايت)',
    pleaseTransfer: lang === 'en' ? 'Please transfer' : 'يرجى تحويل',
    andUpload: lang === 'en' ? 'and upload your receipt or enter transaction number' : 'ورفع الإيصال أو إدخال رقم المعاملة',
    pleaseSend: lang === 'en' ? 'Please send' : 'يرجى إرسال',
    andUploadScreenshot: lang === 'en' ? 'and upload screenshot or enter transaction ID' : 'ورفع لقطة شاشة أو إدخال رقم المعاملة'
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
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({...errors, proofImage: lang === 'en' ? 'File size must be less than 5MB' : 'يجب أن يكون حجم الملف أقل من 5 ميجابايت'});
      return;
    }

    // Check file type
    if (!['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type)) {
      setErrors({...errors, proofImage: lang === 'en' ? 'Only JPG, PNG, PDF formats are supported' : 'الصيغ المدعومة فقط: JPG, PNG, PDF'});
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setProofImage(reader.result);
      setProofType('image');
      setErrors({...errors, proofImage: null});
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setProofImage(null);
    if (!transactionNumber) setProofType('');
  };

  const handleTransactionChange = (e) => {
    const value = e.target.value;
    setTransactionNumber(value);
    if (value && !proofImage) {
      setProofType('transaction');
    } else if (!value && proofImage) {
      setProofType('image');
    } else if (!value && !proofImage) {
      setProofType('');
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = t.selectMethodError;
    }

    if (!proofImage && !transactionNumber) {
      newErrors.proof = t.uploadProofError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSubmitting(true);

    const paymentData = {
      id: `pay_${Date.now()}`,
      playerId: registrationData.playerId,
      playerName: registrationData.playerName,
      playerEmail: registrationData.playerEmail,
      trainingGroupId: registrationData.trainingGroupId,
      trainingGroupName: registrationData.trainingGroupName,
      trainingSessionId: registrationData.trainingSessionId,
      trainingSessionName: registrationData.trainingSessionName,
      amount: registrationData.amount,
      paymentMethod: paymentMethod,
      proofType: proofType,
      proofImage: proofImage,
      transactionNumber: transactionNumber,
      status: 'pending_approval',
      submittedDate: new Date().toISOString().split('T')[0],
      reviewedBy: null,
      reviewedDate: null,
      rejectionReason: null
    };

    setTimeout(() => {
      onPaymentSubmit(paymentData);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-6 shadow-xl">
          <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
          <div className="space-y-2">
            {registrationData.trainingGroupName && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="font-semibold">{t.trainingGroup}:</span>
                <span>{registrationData.trainingGroupName}</span>
              </div>
            )}
            {registrationData.trainingSessionName && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="font-semibold">{t.trainingSession}:</span>
                <span>{registrationData.trainingSessionName}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="font-semibold">{t.amount}:</span>
              <span className="text-2xl font-bold">{registrationData.amount}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t.paymentMethod}</h2>
          <p className="text-gray-600 mb-4">{t.selectMethod}</p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Bank Transfer */}
            <button
              type="button"
              onClick={() => setPaymentMethod('bank_transfer')}
              className={`p-6 rounded-xl border-2 transition ${
                paymentMethod === 'bank_transfer'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
              <Building2 size={32} className={`mx-auto mb-3 ${paymentMethod === 'bank_transfer' ? 'text-blue-600' : 'text-gray-400'}`} />
              <p className="font-bold text-gray-800">{t.bankTransfer}</p>
            </button>

            {/* Instapay */}
            <button
              type="button"
              onClick={() => setPaymentMethod('instapay')}
              className={`p-6 rounded-xl border-2 transition ${
                paymentMethod === 'instapay'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
              <Smartphone size={32} className={`mx-auto mb-3 ${paymentMethod === 'instapay' ? 'text-purple-600' : 'text-gray-400'}`} />
              <p className="font-bold text-gray-800">{t.instapay}</p>
            </button>
          </div>
          {errors.paymentMethod && <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>}
        </div>

        {/* Payment Details */}
        {paymentMethod === 'bank_transfer' && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Building2 size={20} />
              {t.bankDetails}
            </h3>
            <div className="space-y-2 text-blue-900">
              <div className="flex justify-between">
                <span className="font-semibold">{t.bankName}:</span>
                <span>Bank Misr</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">{t.accountName}:</span>
                <span>AMVA Academy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">{t.accountNumber}:</span>
                <span className="font-mono">1234567890123456</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">{t.branch}:</span>
                <span>Cairo Main Branch</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-700">
                💡 {t.pleaseTransfer} <strong>{registrationData.amount}</strong> {t.andUpload}
              </p>
            </div>
          </div>
        )}

        {paymentMethod === 'instapay' && (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
              <Smartphone size={20} />
              {t.instapayDetails}
            </h3>
            <div className="space-y-2 text-purple-900">
              <div className="flex justify-between">
                <span className="font-semibold">{t.instapayNumber}:</span>
                <span className="font-mono text-xl">+20 111 110 8484</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">{t.accountName}:</span>
                <span>AMVA Academy</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-700">
                💡 {t.pleaseSend} <strong>{registrationData.amount}</strong> {t.andUploadScreenshot}
              </p>
            </div>
          </div>
        )}

        {/* Upload Proof */}
        {paymentMethod && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t.uploadProof}</h2>
            
            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t.uploadImage}
              </label>
              
              {!imagePreview ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer"
                  onClick={() => document.getElementById('payment-proof-upload').click()}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    onChange={handleImageChange}
                    className="hidden"
                    id="payment-proof-upload"
                  />
                  <Camera size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-700 font-semibold mb-1">{t.dragDrop}</p>
                  <p className="text-xs text-gray-500">{t.imageFormats}</p>
                </div>
              ) : (
                <div className="relative">
                  <img src={imagePreview} alt="Payment Proof" className="w-full h-64 object-contain bg-gray-100 rounded-xl" />
                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => document.getElementById('payment-proof-change').click()}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                      {t.changeImage}
                    </button>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={handleImageChange}
                      className="hidden"
                      id="payment-proof-change"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition">
                      {t.removeImage}
                    </button>
                  </div>
                </div>
              )}
              {errors.proofImage && <p className="text-red-500 text-xs mt-1">{errors.proofImage}</p>}
            </div>

            {/* OR Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm font-semibold text-gray-500">
                  {t.orEnterTransaction}
                </span>
              </div>
            </div>

            {/* Transaction Number */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t.transactionNumber}
              </label>
              <input
                type="text"
                value={transactionNumber}
                onChange={handleTransactionChange}
                placeholder={t.transactionPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {errors.proof && <p className="text-red-500 text-sm mt-3">{errors.proof}</p>}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition">
            {t.cancel}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {lang === 'en' ? 'Submitting...' : 'جاري الإرسال...'}
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                {t.confirm}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
