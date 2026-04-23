import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "@/store/useFormStore";
import { Input } from "@/conponents/ui/input/input";
import { Button } from "@/conponents/ui/button/button";
import type { IPersonalDetails } from "@/types/steps/personalDetals";
const PersonalInfoForm = () => {
  const navigate = useNavigate();
  const { formData, setField } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPersonalDetails>({
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      gender: formData.gender,
    },
  });

  const onSubmit = (data: IPersonalDetails) => {
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
        <Input
          label="Имя"
          type="text"
          {...register("firstName", { required: "Имя обязательно" })}
          error={errors.firstName?.message}
        />

        <Input
          label="Фамилия"
          type="text"
          {...register("lastName", { required: "Фамилия обязательно" })}
          error={errors.lastName?.message}
        />

        <Input
          label="Телефон"
          type="tel"
          placeholder="89001234567"
          {...register("phone", {
            required: "Телефонный номер обязателен",
            pattern: {
              value: /^0\d{9}$/,
              message: "Введите корректный номер (10 цифр, начиная с 0)",
            },
          })}
          error={errors.phone?.message}
        />
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Пол
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

        <Button type="submit" className="w-full py-3 shadow-lg hover:shadow-blue-200 transform active:scale-95">
          Далее
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
