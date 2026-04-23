import { create } from "zustand";
import { persist } from "zustand/middleware";
import Axios from "@/api/axios.config";
import type { FormState } from "@/types/store/FormStore";

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
        loanAmount: 200,
        loanTerm: 10,
      },
      categories: [],
      isLoading: false,
      isSubmitting: false,

      /**
       * Rationale for using an async action in Zustand:
       * We move the request logic into the store to ensure "result reuse" (caching).
       * If categories are already loaded, the request will not be executed again.
       */
      fetchCategories: async () => {
        if (get().categories.length > 0) return;

        set({ isLoading: true });
        try {
          const response = await Axios.get("/products/categories");
          set({ categories: response.data, isLoading: false });
        } catch (error) {
          console.error("Ошибка при загрузке категорий:", error);
          set({ isLoading: false });
        }
      },

      submitForm: async () => {
        set({ isSubmitting: true });
        try {
          const state = get();
          await Axios.post("/products/add", {
            title: `${state.formData.firstName} ${state.formData.lastName}`,
          });
          set({ isSubmitting: false });
          return true;
        } catch (error) {
          console.error("Ошибка при отправке заявки:", error);
          set({ isSubmitting: false });
          return false;
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
            loanAmount: 200,
            loanTerm: 10,
          },
          categories: [],
        }),
    }),
    {
      name: "loan-app-storage",
    },
  ),
);
