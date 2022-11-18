import { Navigate } from "react-router-dom";

interface Props {
  user: any;
  children: any;
}

export default function ProtectedRoute({ user, children }: Props) {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}