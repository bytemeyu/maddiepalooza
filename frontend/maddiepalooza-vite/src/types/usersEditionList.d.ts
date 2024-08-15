import { ComponentProps } from "react";

export interface UsersEditionListProps extends ComponentProps<"div"> {
  divAddUserClassName?: string;
  labelAddUserClassName?: string;
  inputAddUserClassName?: string;
  inputRoleAddUserClassName?: string;
  buttonAddUserClassName?: string;
  liClassName?: string;
  buttonEditUserClassName?: string;
  buttonRemoveUserClassName?: string;
}
