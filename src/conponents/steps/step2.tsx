import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "../../store/useFormStore";
import type { Step2Inputs } from "../../types/step2";

const Step2 = () => {
  const navigate = useNavigate();

  const { formData, setField, categories, isLoading, fetchCategories } =
    useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Step2Inputs>({
    defaultValues: {
      workplace: formData.workplace,
      address: formData.address,
    },
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onSubmit = (data: Step2Inputs) => {
    setField("workplace", data.workplace);
    setField("address", data.address);
    navigate("/step3");
  };

  const handleBack = () => {
    const currentValues = getValues();
    setField("workplace", currentValues.workplace);
    setField("address", currentValues.address);
    navigate(-1);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Место работы и адрес
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-500 ml-1">
            Место работы
          </label>

          <select
            {...register("workplace", { required: "Выберите место работы" })}
            disabled={isLoading}
            className={`
      w-full p-3.5 bg-gray-50 border-2 rounded-xl transition-all duration-200 outline-none
      cursor-pointer hover:bg-gray-100
      ${
        errors.workplace
          ? "border-red-200 focus:border-red-400 text-red-900"
          : "border-gray-50 focus:border-blue-500 focus:bg-white shadow-sm"
      }
    `}
          >
            <option value="">
              {isLoading ? "Загрузка..." : "Выберите категорию..."}
            </option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {errors.workplace && (
            <span className="text-red-500 text-xs mt-1 ml-1">
              {errors.workplace.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Адрес проживания
          </label>
          <input
            type="text"
            {...register("address", { required: "Адрес обязателен" })}
            placeholder="Улица, дом, квартира"
            className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition ${
              errors.address ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Назад
          </button>
          <button
            type="submit"
            className="flex-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 shadow-lg transition transform active:scale-95"
          >
            Далее
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
