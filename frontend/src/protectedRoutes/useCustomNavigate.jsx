import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* Stores previous pathname in state */
const useCustomNavigate = () => {
  const { pathname, search } = useLocation();

  const currentPath = useMemo(() => {
    return `${pathname}${search}`;
  }, [pathname, search]);

  const navigate = useNavigate();

  const customNavigate = (
    navigateParams,
    resetPreviousRouteState,
    extraState
  ) => {
    if (resetPreviousRouteState) {
      navigate(navigateParams, {
        state: { previousRoute: null, ...extraState },
      });
    } else {
      navigate(navigateParams, {
        state: { previousRoute: currentPath, ...extraState },
      });
    }
  };

  return customNavigate;
};

export default useCustomNavigate;
