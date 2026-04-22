import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { Step1Inputs } from "./types/step1";
import { useFormStore } from "../../store/useFormStore";
const Step1 = () => {
  const navigate = useNavigate();
  const { formData, setField } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Inputs>({
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      gender: formData.gender,
    },
  });

  const onSubmit = (data: Step1Inputs) => {
    setField("firstName", data.firstName);
    setField("lastName", data.lastName);
    setField("phone", data.phone);
    setField("gender", data.gender);

    navigate("/step2");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Личные данные</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Имя
          </label>
          <input
            type="text"
            {...register("firstName", { required: "Имя обязательно" })}
            className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition ${
              errors.firstName
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:ring-blue-500"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Фамилия
          </label>
          <input
            type="text"
            {...register("lastName", { required: "Фамилия обязательно" })}
            className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition ${
              errors.lastName
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:ring-blue-500"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Телефон
          </label>
          <input
            type="tel"
            {...register("phone", {
              required: "Телефонный номер обязателен",
              pattern: {
                value: /^0\d{9}$/,
                message: "Введите корректный номер (10 цифр, начиная с 0)",
              },
            })}
            placeholder="89001234567"
            className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition ${
              errors.phone
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:ring-blue-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Секс
          </label>
          <select
            {...register("gender", {
              required: "Пожалуйста, выберите ваш пол",
            })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Выберите ваш пол</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-blue-200 transition-all transform active:scale-95"
        >
          Далее
        </button>
      </form>
    </div>
  );
};

export default Step1;
