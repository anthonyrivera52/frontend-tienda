import OrderStatus from "./orders/status/page";
import DashboardSummary from "./summary/page";

export default function Page() {
  return (
    <>
      <DashboardSummary />
      <OrderStatus />
    </>
  );
}