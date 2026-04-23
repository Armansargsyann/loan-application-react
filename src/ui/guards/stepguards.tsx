import { Navigate, Outlet } from 'react-router-dom';
import { useFormStore } from '@/store/useFormStore';
/**
 * Rationale for canAccessStep:
 * Ensures application security by preventing users from bypassing 
 * form steps via direct URL manipulation. It validates the presence 
 * of required data from previous steps before granting access.
 */
interface Props {
  step: 2 | 3;
}

export const StepGuard = ({ step }: Props) => {
  const canAccess = useFormStore((state) => state.canAccessStep(step));

  if (!canAccess) {
    const redirectPath = step === 3 ? "/step2" : "/step1";
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />; 
};