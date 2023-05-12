import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

function ProtectedRoute(WrappedComponent: any) {
  function HOC(props: any) {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const isAuthLoading = useSelector((state: any) => state.auth.isAuthLoading);

    if (isAuthLoading) {
      return (
        <div className="loading-page">
          <CircularProgress />
        </div>
      );
    }

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/dang-nhap" />;
    }
  }

  return HOC;
}

export default ProtectedRoute;
