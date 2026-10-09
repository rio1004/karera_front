import { Operator } from "./Operator";
import { Accounting } from "./Accounting";
import { Pagcor } from "./Pagcor";

interface Props {
  activeReportType: string;
}

export const ReportsGGR = ({ activeReportType }: Props) => {
  switch (activeReportType) {
    case "ggrOperator":
      return <Operator />;
    case "ggrAccounting":
      return <Accounting />;
    case "ggrPagcor":
      return <Pagcor />;
    default:
      return null
  }
};
