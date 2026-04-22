import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios"; // Обоснование: Используем axios для выполнения HTTP-запросов к API
import type { ICategory } from "../conponents/steps/types/step2";

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
  categories: ICategory[];
  isLoading: boolean; // Обоснование: Состояние загрузки для улучшения UX
  setField: (field: keyof FormData, value: string | number) => void;
  fetchCategories: () => Promise<void>;
  resetForm: () => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
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
      categories: [],
      isLoading: false,

      /**
       * Обоснование использования асинхронного экшена в Zustand:
       * Мы выносим логику запроса в store для обеспечения "переиспользования результата" (кэширования).
       * Если категории уже загружены, запрос не выполняется повторно.
       */
      fetchCategories: async () => {
        // Переиспользование данных: если категории уже есть, выходим
        if (get().categories.length > 0) return;

        set({ isLoading: true });
        try {
          const response = await axios.get(
            "https://dummyjson.com/products/categories",
          );
          set({ categories: response.data, isLoading: false });
        } catch (error) {
          console.error("Ошибка при загрузке категорий:", error);
          set({ isLoading: false });
        }
      },

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
          categories: [], // Опционально: очищать ли категории при сбросе
        }),
    }),
    {
      name: "loan-app-storage",
    },
  ),
);
