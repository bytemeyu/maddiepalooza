import { ComponentProps } from "react";

export interface StagesEditionListProps extends ComponentProps<"div"> {
  divAddStageClassName?: string;
  labelAddStageClassName?: string;
  inputAddStageClassName?: string;
  inputLocationAddStageClassName?: string;
  buttonAddStageClassName?: string;
  liClassName?: string;
  buttonEditStageClassName?: string;
  buttonRemoveStageClassName?: string;
}
