import { ShoppingBag } from "lucide-react";

const OrderDetailPlaceholder = () => {
  return (
    <div className="bg-card border border-border rounded-[24px] shadow-sm min-h-[220px] flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <ShoppingBag size={64} className="mx-auto mb-4" />
        <p className="text-[16px]">Select an order to view details</p>
      </div>
    </div>
  );
};

export default OrderDetailPlaceholder;