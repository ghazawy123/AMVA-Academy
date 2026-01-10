import React, { useState } from 'react';
import { CheckCircle, X, Eye, Clock, CreditCard, FileText, AlertCircle, Building2, Smartphone, Image as ImageIcon } from 'lucide-react';

const PendingPaymentsPage = ({
  pendingPayments = [],
  onApprove,
  onReject,
  onBack,
  lang = 'en'
}) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'

  const isRTL = lang === 'ar';

  const t = {
    title: lang === 'en' ? 'Pending Payments' : 'المدفوعات المعلقة',
    back: lang === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم',
    filterAll: lang === 'en' ? 'All' : 'الكل',
    filterPending: lang === 'en' ? 'Pending' : 'معلق',
    filterApproved: lang === 'en' ? 'Approved' : 'موافق عليه',
    filterRejected: lang === 'en' ? 'Rejected' : 'مرفوض',
    noPayments: lang === 'en' ? 'No payment requests found' : 'لا توجد طلبات دفع',
    playerName: lang === 'en' ? 'Player' : 'اللاعب',
    trainingGroup: lang === 'en' ? 'Training Group' : 'مجموعة التدريب',
    trainingSession: lang === 'en' ? 'Training Session' : 'جلسة التدريب',
    amount: lang === 'en' ? 'Amount' : 'المبلغ',
    method: lang === 'en' ? 'Method' : 'الطريقة',
    date: lang === 'en' ? 'Date' : 'التاريخ',
    status: lang === 'en' ? 'Status' : 'الحالة',
    actions: lang === 'en' ? 'Actions' : 'الإجراءات',
    review: lang === 'en' ? 'Review' : 'مراجعة',
    approve: lang === 'en' ? 'Approve' : 'قبول',
    reject: lang === 'en' ? 'Reject' : 'رفض',
    pending: lang === 'en' ? 'Pending' : 'معلق',
    approved: lang === 'en' ? 'Approved' : 'موافق عليه',
    rejected: lang === 'en' ? 'Rejected' : 'مرفوض',
    bankTransfer: lang === 'en' ? 'Bank Transfer' : 'تحويل بنكي',
    instapay: lang === 'en' ? 'Instapay' : 'إنستاباي',
    paymentDetails: lang === 'en' ? 'Payment Details' : 'تفاصيل الدفع',
    paymentProof: lang === 'en' ? 'Payment Proof' : 'إثبات الدفع',
    transactionNumber: lang === 'en' ? 'Transaction Number' : 'رقم المعاملة',
    uploadedImage: lang === 'en' ? 'Uploaded Receipt/Screenshot' : 'الإيصال/لقطة الشاشة المرفوعة',
    close: lang === 'en' ? 'Close' : 'إغلاق',
    confirmApprove: lang === 'en' ? 'Approve this payment?' : 'الموافقة على هذا الدفع؟',
    confirmReject: lang === 'en' ? 'Reject this payment?' : 'رفض هذا الدفع؟',
    rejectionReasonLabel: lang === 'en' ? 'Rejection Reason' : 'سبب الرفض',
    rejectionReasonPlaceholder: lang === 'en' ? 'Enter reason for rejection...' : 'أدخل سبب الرفض...',
    cancel: lang === 'en' ? 'Cancel' : 'إلغاء',
    confirmApproveBtn: lang === 'en' ? 'Yes, Approve' : 'نعم، وافق',
    confirmRejectBtn: lang === 'en' ? 'Yes, Reject' : 'نعم، ارفض',
    reviewedBy: lang === 'en' ? 'Reviewed by' : 'تمت المراجعة بواسطة',
    reviewedDate: lang === 'en' ? 'Review Date' : 'تاريخ المراجعة',
    submittedDate: lang === 'en' ? 'Submitted' : 'تم الإرسال',
    viewProof: lang === 'en' ? 'View Proof' : 'عرض الإثبات'
  };

  const filteredPayments = filter === 'all' 
    ? pendingPayments 
    : pendingPayments.filter(p => p.status === filter);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending_approval':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">{t.pending}</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{t.approved}</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">{t.rejected}</span>;
      default:
        return null;
    }
  };

  const getMethodDisplay = (method) => {
    return method === 'bank_transfer' ? t.bankTransfer : t.instapay;
  };

  const handleReviewClick = (payment) => {
    setSelectedPayment(payment);
    setShowReviewModal(true);
  };

  const handleApproveClick = (payment) => {
    if (window.confirm(t.confirmApprove)) {
      onApprove(payment.id);
      setShowReviewModal(false);
      setSelectedPayment(null);
    }
  };

  const handleRejectClick = (payment) => {
    setSelectedPayment(payment);
    setShowReviewModal(false);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectionReason.trim()) {
      alert(lang === 'en' ? 'Please enter a rejection reason' : 'يرجى إدخال سبب الرفض');
      return;
    }
    onReject(selectedPayment.id, rejectionReason);
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedPayment(null);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{t.title}</h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition">
            {t.back}
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-2 shadow-lg mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}>
            {t.filterAll} ({pendingPayments.length})
          </button>
          <button
            onClick={() => setFilter('pending_approval')}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
              filter === 'pending_approval'
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}>
            ⏳ {t.filterPending} ({pendingPayments.filter(p => p.status === 'pending_approval').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
              filter === 'approved'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}>
            ✅ {t.filterApproved} ({pendingPayments.filter(p => p.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition ${
              filter === 'rejected'
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}>
            ❌ {t.filterRejected} ({pendingPayments.filter(p => p.status === 'rejected').length})
          </button>
        </div>

        {/* Payments List */}
        {filteredPayments.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-lg">
            <Clock size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">{t.noPayments}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.playerName}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.trainingGroup}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.amount}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.method}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.date}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.status}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map(payment => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{payment.playerName}</div>
                        <div className="text-xs text-gray-500">{payment.playerEmail}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {payment.trainingGroupName || payment.trainingSessionName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600">{payment.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {payment.paymentMethod === 'bank_transfer' ? (
                            <Building2 size={16} className="text-blue-600" />
                          ) : (
                            <Smartphone size={16} className="text-purple-600" />
                          )}
                          <span className="text-sm text-gray-700">{getMethodDisplay(payment.paymentMethod)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{payment.submittedDate}</td>
                      <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleReviewClick(payment)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition flex items-center gap-2">
                          <Eye size={16} />
                          {t.review}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowReviewModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex items-center justify-between sticky top-0">
              <h2 className="text-2xl font-bold">{t.paymentDetails}</h2>
              <button onClick={() => setShowReviewModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Payment Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.playerName}</h3>
                  <p className="text-lg font-bold text-gray-900">{selectedPayment.playerName}</p>
                  <p className="text-sm text-gray-600">{selectedPayment.playerEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    {selectedPayment.trainingGroupName ? t.trainingGroup : t.trainingSession}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedPayment.trainingGroupName || selectedPayment.trainingSessionName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.amount}</h3>
                  <p className="text-2xl font-bold text-green-600">{selectedPayment.amount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.method}</h3>
                  <div className="flex items-center gap-2">
                    {selectedPayment.paymentMethod === 'bank_transfer' ? (
                      <>
                        <Building2 size={20} className="text-blue-600" />
                        <span className="font-semibold text-gray-900">{t.bankTransfer}</span>
                      </>
                    ) : (
                      <>
                        <Smartphone size={20} className="text-purple-600" />
                        <span className="font-semibold text-gray-900">{t.instapay}</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.submittedDate}</h3>
                  <p className="text-lg font-semibold text-gray-900">{selectedPayment.submittedDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.status}</h3>
                  {getStatusBadge(selectedPayment.status)}
                </div>
              </div>

              {/* Payment Proof */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{t.paymentProof}</h3>
                
                {selectedPayment.proofImage && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">{t.uploadedImage}</p>
                    <img 
                      src={selectedPayment.proofImage} 
                      alt="Payment Proof" 
                      className="w-full max-h-96 object-contain bg-gray-100 rounded-xl border-2 border-gray-200"
                    />
                  </div>
                )}

                {selectedPayment.transactionNumber && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-600 mb-1">{t.transactionNumber}</p>
                    <p className="text-xl font-mono font-bold text-gray-900">{selectedPayment.transactionNumber}</p>
                  </div>
                )}
              </div>

              {/* Review Info (if already reviewed) */}
              {selectedPayment.status !== 'pending_approval' && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.reviewedBy}</h3>
                      <p className="text-lg font-semibold text-gray-900">{selectedPayment.reviewedBy || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.reviewedDate}</h3>
                      <p className="text-lg font-semibold text-gray-900">{selectedPayment.reviewedDate || 'N/A'}</p>
                    </div>
                  </div>
                  {selectedPayment.rejectionReason && (
                    <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-red-800 mb-1">{t.rejectionReasonLabel}</p>
                      <p className="text-red-900">{selectedPayment.rejectionReason}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {selectedPayment.status === 'pending_approval' && (
                <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleApproveClick(selectedPayment)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition flex items-center justify-center gap-2">
                    <CheckCircle size={20} />
                    {t.approve}
                  </button>
                  <button
                    onClick={() => handleRejectClick(selectedPayment)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition flex items-center justify-center gap-2">
                    <X size={20} />
                    {t.reject}
                  </button>
                </div>
              )}

              {selectedPayment.status !== 'pending_approval' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition">
                    {t.close}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{t.confirmReject}</h3>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {t.rejectionReasonLabel} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows="4"
                placeholder={t.rejectionReasonPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">
                {t.cancel}
              </button>
              <button
                onClick={handleRejectConfirm}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                {t.confirmRejectBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingPaymentsPage;
