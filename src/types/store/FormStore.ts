import type { ICategory, IWorkAddressDetails } from "@/types/steps/workDetails";
import type { IPersonalDetails } from "@/types/steps/personalDetals";
import type { ILoanDetails } from "@/types/steps/LoanDetails";

export interface FormData extends IPersonalDetails, IWorkAddressDetails, ILoanDetails {}
export interface FormState {
  formData: FormData;
  categories: ICategory[];
  isLoading: boolean;
  isSubmitting: boolean;
  setField: (field: keyof FormData, value: string | number) => void;
  fetchCategories: () => Promise<void>;
  submitForm: () => Promise<boolean>;
  resetForm: () => void;
}