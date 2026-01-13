
import React, { useRef } from 'react';
import { CheckCircle, Download, X } from 'lucide-react';
// import html2canvas from 'html2canvas'; // For future PDF download

const ReceiptModal = ({ payment, onClose }) => {
  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 print:bg-white print:p-0">
      <div className="mc-card w-full max-w-sm bg-surface-dark border border-white/10 rounded-2xl overflow-hidden print:border-none print:shadow-none print:w-full print:max-w-none print:text-black">

        {/* Header */}
        <div className="bg-emerald-600 p-6 text-center relative print:bg-white print:text-black print:border-b">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white print:hidden"
          >
            <X size={20} />
          </button>

          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg print:border-2 print:border-emerald-600">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-white print:text-black">Payment Successful!</h2>
          <p className="text-emerald-100 text-sm print:text-gray-600">Thank you for riding with Ma-3 Connect</p>
        </div>

        {/* Receipt Details */}
        <div className="p-6 space-y-4 print:p-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-4 print:border-gray-200">
            <span className="text-text-muted print:text-gray-600">Amount Paid</span>
            <span className="text-xl font-bold text-white print:text-black">KES {payment.amount}</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted print:text-gray-600">Date</span>
              <span className="text-white font-medium print:text-black">{new Date(payment.date).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted print:text-gray-600">M-Pesa Ref</span>
              <span className="text-white font-medium font-mono uppercase print:text-black">{payment.reference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted print:text-gray-600">Booking ID</span>
              <span className="text-white font-medium print:text-black">#{payment.booking_id}</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mt-6 print:border print:border-gray-200 print:bg-gray-50">
            <p className="text-xs text-center text-text-muted print:text-gray-500">
              This is an electronically generated receipt.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors"
          >
            <Download size={18} /> Download
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 border border-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
