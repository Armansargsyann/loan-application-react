import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "@/store/useFormStore";
import { Input } from "@/ui/input/input";
import { Button } from "@/ui/button/button";
import type { IWorkAddressDetails } from "@/types/steps/workDetails";

const WorkAddressForm = () => {
  const navigate = useNavigate();

  const { formData, setField, categories, isLoading, fetchCategories } =
    useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IWorkAddressDetails>({
    defaultValues: {
      workplace: formData.workplace,
      address: formData.address,
    },
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onSubmit = (data: IWorkAddressDetails) => {
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

        <Input
          label="Адрес проживания"
          type="text"
          placeholder="Улица, дом, квартира"
          {...register("address", { required: "Адрес обязателен" })}
          error={errors.address?.message}
        />

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleBack}
            className="flex-1 py-3"
          >
            Назад
          </Button>
          <Button
            type="submit"
            className="flex-2 py-3 px-8 shadow-lg transform active:scale-95"
          >
            Далее
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkAddressForm;
