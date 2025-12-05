// 

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent
      className="
        sm:max-w-md 
        bg-neutral-900 
        text-white 
        border-l border-neutral-800
      "
    >
      {/* Header */}
      <SheetHeader>
        <SheetTitle className="text-white font-bold">
          Your Cart
        </SheetTitle>
      </SheetHeader>

      {/* Cart Items */}
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent key={item?.productId} cartItem={item} />
            ))
          : null}
      </div>

      {/* Total Section */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between text-neutral-200">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="
          w-full mt-6 
          bg-blue-600 
          hover:bg-blue-700 
          text-white 
          transition-all 
          duration-200 
          hover:scale-[1.02]
          active:scale-95
        "
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
