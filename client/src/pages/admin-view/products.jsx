// import ProductImageUpload from "@/components/admin-view/image-upload";
// import AdminProductTile from "@/components/admin-view/product-tile";
// import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useToast } from "@/components/ui/use-toast";
// import { addProductFormElements } from "@/config";
// import {
//   addNewProduct,
//   deleteProduct,
//   editProduct,
//   fetchAllProducts,
// } from "@/store/admin/products-slice";
// import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const initialFormData = {
//   image: null,
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: "",
//   averageReview: 0,
// };

// function AdminProducts() {
//   const [openCreateProductsDialog, setOpenCreateProductsDialog] =
//     useState(false);
//   const [formData, setFormData] = useState(initialFormData);
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const [currentEditedId, setCurrentEditedId] = useState(null);

//   const { productList } = useSelector((state) => state.adminProducts);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();

//     currentEditedId !== null
//       ? dispatch(
//           editProduct({
//             id: currentEditedId,
//             formData,
//           })
//         ).then((data) => {
//           console.log(data, "edit");

//           if (data?.payload?.success) {
//             dispatch(fetchAllProducts());
//             setFormData(initialFormData);
//             setOpenCreateProductsDialog(false);
//             setCurrentEditedId(null);
//           }
//         })
//       : dispatch(
//           addNewProduct({
//             ...formData,
//             image: uploadedImageUrl,
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllProducts());
//             setOpenCreateProductsDialog(false);
//             setImageFile(null);
//             setFormData(initialFormData);
//             toast({
//               title: "Product add successfully",
//             });
//           }
//         });
//   }

//   function handleDelete(getCurrentProductId) {
//     dispatch(deleteProduct(getCurrentProductId)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllProducts());
//       }
//     });
//   }

//   function isFormValid() {
//     return Object.keys(formData)
//       .filter((currentKey) => currentKey !== "averageReview")
//       .map((key) => formData[key] !== "")
//       .every((item) => item);
//   }

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   console.log(formData, "productList");

//   return (
//     <Fragment>
//       <div className="mb-5 w-full flex justify-end">
//         <Button onClick={() => setOpenCreateProductsDialog(true)}>
//           Add New Product
//         </Button>
//       </div>
//       <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {productList && productList.length > 0
//           ? productList.map((productItem) => (
//               <AdminProductTile
//                 setFormData={setFormData}
//                 setOpenCreateProductsDialog={setOpenCreateProductsDialog}
//                 setCurrentEditedId={setCurrentEditedId}
//                 product={productItem}
//                 handleDelete={handleDelete}
//               />
//             ))
//           : null}
//       </div>
//       <Sheet
//         open={openCreateProductsDialog}
//         onOpenChange={() => {
//           setOpenCreateProductsDialog(false);
//           setCurrentEditedId(null);
//           setFormData(initialFormData);
//         }}
//       >
//         <SheetContent side="right" className="overflow-auto">
//           <SheetHeader>
//             <SheetTitle>
//               {currentEditedId !== null ? "Edit Product" : "Add New Product"}
//             </SheetTitle>
//           </SheetHeader>
//           <ProductImageUpload
//             imageFile={imageFile}
//             setImageFile={setImageFile}
//             uploadedImageUrl={uploadedImageUrl}
//             setUploadedImageUrl={setUploadedImageUrl}
//             setImageLoadingState={setImageLoadingState}
//             imageLoadingState={imageLoadingState}
//             isEditMode={currentEditedId !== null}
//           />
//           <div className="py-6">
//             <CommonForm
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               buttonText={currentEditedId !== null ? "Edit" : "Add"}
//               formControls={addProductFormElements}
//               isBtnDisabled={!isFormValid()}
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   );
// }

// export default AdminProducts;



import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  Festival: "",
  Idols: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // ✅ Form validation
  const isFormValid = () => {
    const validity = Object.keys(formData)
      .filter((key) => key !== "averageReview")
      .every((key) => {
        const value = formData[key];
        if (key === "image") return uploadedImageUrl !== "";
        if (typeof value === "number") return true;
        return value && value.toString().trim() !== "";
      });

    console.log("✅ FormData:", formData);
    console.log("✅ uploadedImageUrl:", uploadedImageUrl);
    console.log("✅ isFormValid:", validity);
    return validity;
  };

  // ✅ Submit handler — must be defined BEFORE return()
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast({
        title: "Please fill all product details",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      ...formData,
      image: uploadedImageUrl,
    };

    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData: payload })).then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchAllProducts());
          setCurrentEditedId(null);
          setFormData(initialFormData);
          toast({ title: "Product updated successfully" });
        }
      });
    } else {
      dispatch(addNewProduct(payload)).then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setImageFile(null);
          setUploadedImageUrl("");
          toast({ title: "Product added successfully" });
        }
      });
    }
  };

  // ✅ Load products initially
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // ✅ JSX
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add New Product</Button>
          </SheetTrigger>

          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {currentEditedId ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>

            
            <ProductImageUpload
  imageFile={imageFile}
  setImageFile={setImageFile}
  uploadedImageUrl={uploadedImageUrl}
  setUploadedImageUrl={setUploadedImageUrl}
  setImageLoadingState={setImageLoadingState}
  imageLoadingState={imageLoadingState}
  isEditMode={currentEditedId !== null}
/>


            <div className="py-6">
              <CommonForm
                onSubmit={handleSubmit} // ✅ now defined above
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId ? "Edit" : "Add"}
                formControls={addProductFormElements}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.length > 0 &&
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem.id}
              product={productItem}
              setFormData={setFormData}
              setCurrentEditedId={setCurrentEditedId}
              handleDelete={(id) =>
                dispatch(deleteProduct(id)).then((res) => {
                  if (res?.payload?.success) dispatch(fetchAllProducts());
                })
              }
            />
          ))}
      </div>
    </Fragment>
  );
}
export default AdminProducts