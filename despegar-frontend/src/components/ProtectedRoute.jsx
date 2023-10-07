
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({user, children}) => {

  if(!user || user == 'null'){
    return <Navigate to="/login" />
  }

  return children;
}