import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({children}) => {

  const loggedIn = useSelector(state => state.login.token)

  if(!loggedIn) {
    return <Navigate to="/" replace />
  }

  return children

}