import { MapPin, User, Clock3, Truck, Package } from "lucide-react";

const statusMap = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
    icon: <Clock3 size={15} />,
  },
  confirmed: {
    label: "Preparing",
    className: "bg-blue-100 text-blue-700",
    icon: <Package size={15} />,
  },
  ready_for_pickup: {
    label: "Ready for Pickup",
    className: "bg-violet-100 text-violet-700",
    icon: <Package size={15} />,
  },
  assigned_to_agent: {
    label: "Assigned to Agent",
    className: "bg-sky-100 text-sky-700",
    icon: <Truck size={15} />,
  },
  picked_from_restaurant: {
    label: "Picked from Restaurant",
    className: "bg-orange-100 text-orange-700",
    icon: <Truck size={15} />,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    className: "bg-orange-100 text-orange-700",
    icon: <Truck size={15} />,
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-700",
    icon: <Package size={15} />,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700",
    icon: <Clock3 size={15} />,
  },
};

const OrderCard = ({ order, onAction, isUpdating = false }) => {
  const status = statusMap[order.status] || statusMap.pending;

  return (
    <div className="bg-card border border-border rounded-[24px] p-7 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[18px] font-semibold">{order.id}</h3>

        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${status.className}`}>
          {status.icon}
          {status.label}
        </span>
      </div>

      <p className="text-muted-foreground mb-5">{order.time}</p>

      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <User size={18} className="mt-1 text-muted-foreground" />
          <div>
            <p className="font-medium">{order.customer}</p>
            <p className="text-muted-foreground">{order.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin size={18} className="mt-1 text-muted-foreground" />
          <p className="text-muted-foreground">{order.address}</p>
        </div>
      </div>

      <hr className="border-border mb-5" />

      <div className="mb-5">
        <p className="font-medium mb-3">Order Items:</p>

        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-muted-foreground">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border mb-5" />

      <div className="flex justify-between items-center mb-5">
        <span className="text-[18px] font-medium">Total:</span>
        <span className="text-[18px] font-semibold">{order.total}</span>
      </div>

      {order.action && (
        <button
          onClick={() => onAction && onAction(order)}
          disabled={isUpdating}
          className={`w-full py-4 rounded-2xl text-white font-semibold ${order.actionClass} ${isUpdating ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {isUpdating ? "Updating..." : order.action}
        </button>
      )}
    </div>
  );
};

export default OrderCard;
