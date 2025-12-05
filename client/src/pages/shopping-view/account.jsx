// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import accImg from "../../assets/account.jpg";
// import Address from "@/components/shopping-view/address";
// import ShoppingOrders from "@/components/shopping-view/orders";

// function ShoppingAccount() {
//   return (
//     <div className="flex flex-col">
//       <div className="relative h-[300px] w-full overflow-hidden">
//         <img
//           src={accImg}
//           className="h-full w-full object-cover object-center"
//         />
//       </div>
//       <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
//         <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
//           <Tabs defaultValue="orders">
//             <TabsList>
//               <TabsTrigger value="orders">Orders</TabsTrigger>
//               <TabsTrigger value="address">Address</TabsTrigger>
//             </TabsList>
//             <TabsContent value="orders">
//               <ShoppingOrders />
//             </TabsContent>
//             <TabsContent value="address">
//               <Address />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingAccount;


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      
      {/* Banner */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center opacity-70"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
          
          <Tabs defaultValue="orders" className="w-full">
            {/* Tab Buttons */}
            <TabsList className="bg-neutral-800 border border-neutral-700 text-white">
              <TabsTrigger
                value="orders"
                className="
                  data-[state=active]:bg-neutral-700 
                  data-[state=active]:text-white 
                  text-neutral-300
                "
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="
                  data-[state=active]:bg-neutral-700 
                  data-[state=active]:text-white 
                  text-neutral-300
                "
              >
                Address
              </TabsTrigger>
            </TabsList>

            {/* Orders Section */}
            <TabsContent
              value="orders"
              className="mt-6 bg-neutral-900 text-white rounded-lg p-4 border border-neutral-800"
            >
              <ShoppingOrders />
            </TabsContent>

            {/* Address Section */}
            <TabsContent
              value="address"
              className="mt-6 bg-neutral-900 text-white rounded-lg p-4 border border-neutral-800"
            >
              <Address />
            </TabsContent>

          </Tabs>

        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
