// import { Minus, Plus, Trash } from "lucide-react";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
// import { useToast } from "../ui/use-toast";

// function UserCartItemsContent({ cartItem }) {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { productList } = useSelector((state) => state.shopProducts);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function handleUpdateQuantity(getCartItem, typeOfAction) {
//     if (typeOfAction == "plus") {
//       let getCartItems = cartItems.items || [];

//       if (getCartItems.length) {
//         const indexOfCurrentCartItem = getCartItems.findIndex(
//           (item) => item.productId === getCartItem?.productId
//         );

//         const getCurrentProductIndex = productList.findIndex(
//           (product) => product._id === getCartItem?.productId
//         );
//         const getTotalStock = productList[getCurrentProductIndex].totalStock;

//         console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

//         if (indexOfCurrentCartItem > -1) {
//           const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
//           if (getQuantity + 1 > getTotalStock) {
//             toast({
//               title: `Only ${getQuantity} quantity can be added for this item`,
//               variant: "destructive",
//             });

//             return;
//           }
//         }
//       }
//     }

//     dispatch(
//       updateCartQuantity({
//         userId: user?.id,
//         productId: getCartItem?.productId,
//         quantity:
//           typeOfAction === "plus"
//             ? getCartItem?.quantity + 1
//             : getCartItem?.quantity - 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: "Cart item is updated successfully",
//         });
//       }
//     });
//   }

//   function handleCartItemDelete(getCartItem) {
//     dispatch(
//       deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: "Cart item is deleted successfully",
//         });
//       }
//     });
//   }

//   return (
//     <div className="flex items-center space-x-4">
//       <img
//         src={cartItem?.image}
//         alt={cartItem?.title}
//         className="w-20 h-20 rounded object-cover"
//       />
//       <div className="flex-1">
//         <h3 className="font-extrabold">{cartItem?.title}</h3>
//         <div className="flex items-center gap-2 mt-1">
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             disabled={cartItem?.quantity === 1}
//             onClick={() => handleUpdateQuantity(cartItem, "minus")}
//           >
//             <Minus className="w-4 h-4" />
//             <span className="sr-only">Decrease</span>
//           </Button>
//           <span className="font-semibold">{cartItem?.quantity}</span>
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             onClick={() => handleUpdateQuantity(cartItem, "plus")}
//           >
//             <Plus className="w-4 h-4" />
//             <span className="sr-only">Decrease</span>
//           </Button>
//         </div>
//       </div>
//       <div className="flex flex-col items-end">
//         <p className="font-semibold">
//           $
//           {(
//             (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
//             cartItem?.quantity
//           ).toFixed(2)}
//         </p>
//         <Trash
//           onClick={() => handleCartItemDelete(cartItem)}
//           className="cursor-pointer mt-1"
//           size={20}
//         />
//       </div>
//     </div>
//   );
// }

// export default UserCartItemsContent;

import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item updated successfully" });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item deleted successfully" });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4 p-3 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm text-white">
      {/* Image */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover border border-neutral-700"
      />

      {/* Title + Quantity */}
      <div className="flex-1">
        <h3 className="font-bold text-white">{cartItem?.title}</h3>

        <div className="flex items-center gap-2 mt-2">
          {/* Minus Button */}
          <Button
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            className="
              h-8 w-8 rounded-full 
              bg-neutral-800 
              border border-neutral-700 
              text-white 
              hover:bg-neutral-700 
              disabled:opacity-40 
              transition-all 
              duration-200 
              hover:scale-105
              active:scale-95
            "
          >
            <Minus className="w-4 h-4" />
          </Button>

          {/* Quantity Number */}
          <span className="font-semibold text-neutral-200">
            {cartItem?.quantity}
          </span>

          {/* Plus Button */}
          <Button
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
            className="
              h-8 w-8 rounded-full 
              bg-neutral-800 
              border border-neutral-700 
              text-white 
              hover:bg-neutral-700 
              transition-all 
              duration-200 
              hover:scale-105
              active:scale-95
            "
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Price + Trash */}
      <div className="flex flex-col items-end text-right">
        <p className="font-semibold text-neutral-100">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>

        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="
            cursor-pointer 
            mt-2 
            text-red-400 
            hover:text-red-500 
            hover:scale-110 
            transition-all 
            duration-200
          "
          size={22}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;

