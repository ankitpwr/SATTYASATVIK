import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  const formatDate = (d) => {
    if (!d) return "-";
    return typeof d === "string" ? d.split("T")[0] : new Date(d).toISOString().split("T")[0];
  };

  return (
    <DialogContent className="sm:max-w-[600px] bg-neutral-900 text-white border border-neutral-800 rounded-lg">
      <div className="grid gap-6 p-4">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-neutral-200">Order ID</p>
            <Label className="text-neutral-300">{orderDetails?._id ?? "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-neutral-200">Order Date</p>
            <Label className="text-neutral-300">{formatDate(orderDetails?.orderDate)}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-neutral-200">Order Price</p>
            <Label className="text-neutral-300">${orderDetails?.totalAmount ?? "0.00"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-neutral-200">Payment Method</p>
            <Label className="text-neutral-300">{orderDetails?.paymentMethod ?? "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-neutral-200">Payment Status</p>
            <Label className="text-neutral-300">{orderDetails?.paymentStatus ?? "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-neutral-200">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 rounded text-white capitalize ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-700"
                    : "bg-neutral-700"
                }`}
              >
                {orderDetails?.orderStatus ?? "-"}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator className="border-neutral-800" />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-neutral-200">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
                orderDetails.cartItems.map((item, idx) => (
                  <li
                    key={item.productId ?? item.title ?? idx}
                    className="flex items-center justify-between text-neutral-300"
                  >
                    <span className="truncate">Title: {item.title}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                  </li>
                ))
              ) : (
                <li className="text-neutral-400">No items found</li>
              )}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-neutral-200">Shipping Info</div>
            <div className="grid gap-0.5 text-neutral-300">
              <span>{user?.userName ?? "-"}</span>
              <span>{orderDetails?.addressInfo?.address ?? "-"}</span>
              <span>{orderDetails?.addressInfo?.city ?? "-"}</span>
              <span>{orderDetails?.addressInfo?.pincode ?? "-"}</span>
              <span>{orderDetails?.addressInfo?.phone ?? "-"}</span>
              <span>{orderDetails?.addressInfo?.notes ?? "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
