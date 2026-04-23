import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "@/store/useFormStore";
import SuccessModal from "@/conponents/SuccsesModal";
import { Button } from "@/ui/button/button";
import type { ILoanDetails } from "@/types/steps/LoanDetails";

const LoanDetailsForm = () => {
  const navigate = useNavigate();
  const { formData, setField, resetForm, submitForm, isSubmitting } =
    useFormStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<ILoanDetails>({
    values: {
      loanAmount: formData.loanAmount,
      loanTerm: formData.loanTerm,
    },
  });

  const amount = watch("loanAmount");
  const term = watch("loanTerm");

  const onSubmit = async (data: ILoanDetails) => {
    setField("loanAmount", data.loanAmount);
    setField("loanTerm", data.loanTerm);

    const success = await submitForm();
    if (success) {
      setIsModalOpen(true);
    }
  };

  const handleFinish = () => {
    resetForm();
    navigate("/step1");
  };

  const handleBack = () => {
    const currentValues = getValues();
    setField("loanAmount", currentValues.loanAmount);
    setField("loanTerm", currentValues.loanTerm);
    navigate(-1);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Параметры займа
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold text-gray-400 uppercase">
              Сумма займа
            </label>
            <span className="text-2xl font-black text-gray-800">${amount}</span>
          </div>
          <input
            type="range"
            {...register("loanAmount", {
              required: "Выберите сумму займа",
              min: { value: 200, message: "Сумма не может быть меньше $200" },
              max: { value: 1000, message: "Сумма не может быть больше $1000" },
            })}
            min="200"
            max="1000"
            step="100"
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          {errors.loanAmount && (
            <p className="text-red-500 text-xs mt-1">
              {errors.loanAmount.message}
            </p>
          )}
          <div className="flex justify-between text-xs text-gray-400 font-bold">
            <span>$200</span>
            <span>$1000</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold text-gray-400 uppercase">
              Срок займа
            </label>
            <span className="text-2xl font-black text-gray-800">
              {term} дней
            </span>
          </div>
          <input
            type="range"
            {...register("loanTerm", {
              required: "Выберите срок займа",
              min: { value: 10, message: "Срок не может быть меньше 10 дней" },
              max: { value: 30, message: "Срок не может быть больше 30 дней" },
            })}
            min="10"
            max="30"
            step="1"
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          {errors.loanTerm && (
            <p className="text-red-500 text-xs mt-1">
              {errors.loanTerm.message}
            </p>
          )}
          <div className="flex justify-between text-xs text-gray-400 font-bold">
            <span>10 дней</span>
            <span>30 дней</span>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={handleBack}
            className="flex-1 py-4 rounded-xl active:scale-95"
          >
            Назад
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="flex-2 py-4 px-8 rounded-xl shadow-lg shadow-blue-100 transform active:scale-95"
          >
            Подать заявку
          </Button>
        </div>
      </form>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleFinish}
        firstName={formData.firstName}
        amount={amount}
        lastName={formData.lastName}
        term={term}
      />
    </div>
  );
};

export default LoanDetailsForm;
