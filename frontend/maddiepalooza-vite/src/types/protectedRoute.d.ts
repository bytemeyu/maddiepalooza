import { RouteProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}
//(?) ver depois