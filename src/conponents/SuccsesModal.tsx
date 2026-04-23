import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  amount: number;
  term: number;
  lastName: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  firstName,
  amount,
  term,
  lastName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center animate-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 className="text-xl font-black text-gray-800 mb-2">
          Заявка одобрена!
        </h3>

        <p className="text-gray-500 mb-6">
          Поздравляем,{" "}
          <b>
            {firstName} {lastName}
          </b>
          ! Ваша заявка на сумму <b>${amount}</b> сроком на <b>{term} дней</b>{" "}
          успешно принята.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition transform active:scale-95"
        >
          Отлично
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
