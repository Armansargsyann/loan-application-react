import { create } from "zustand";
import { persist } from "zustand/middleware"; // Обоснование: Используем persist для сохранения данных в localStorage

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  workplace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
}

interface FormState {
  formData: FormData;
  setField: (field: keyof FormData, value: string | number) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      formData: {
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        workplace: "",
        address: "",
        loanAmount: 200000,
        loanTerm: 10,
      },

      /**
       * Обоснование выбора Zustand:
       * Мы используем Zustand, так как это легковесное и производительное решение для управления состоянием
       * в многошаговых формах. В отличие от Context API, Zustand предотвращает лишние ререндеры,
       * а использование middleware 'persist' позволяет сохранять прогресс пользователя даже при перезагрузке страницы.
       */
      setField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      resetForm: () =>
        set({
          formData: {
            firstName: "",
            lastName: "",
            phone: "",
            gender: "",
            workplace: "",
            address: "",
            loanAmount: 200000,
            loanTerm: 10,
          },
        }),
    }),
    {
      name: "loan-app-storage", // Ключ в localStorage
    },
  ),
);
