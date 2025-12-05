// // import { Button } from "@/components/ui/button";
// // import banner1 from "@/assets/banner1.png";

// // import bannerOne from "/src/assets/banner1.png";
// // // import bannerTwo from "../../assets/banner-2.webp";
// // // import bannerThree from "../../assets/banner-3.webp";
// // import {
// //   Airplay,
// //   BabyIcon,
// //   ChevronLeftIcon,
// //   ChevronRightIcon,
// //   CloudLightning,
// //   Heater,
// //   Images,
// //   Shirt,
// //   ShirtIcon,
// //   ShoppingBasket,
// //   UmbrellaIcon,
// //   WashingMachine,
// //   WatchIcon,
// // } from "lucide-react";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchAllFilteredProducts,
// //   fetchProductDetails,
// // } from "@/store/shop/products-slice";
// // import ShoppingProductTile from "@/components/shopping-view/product-tile";
// // import { useNavigate } from "react-router-dom";
// // import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// // import { useToast } from "@/components/ui/use-toast";
// // import ProductDetailsDialog from "@/components/shopping-view/product-details";
// // import { getFeatureImages } from "@/store/common-slice";

// // const categoriesWithIcon = [
// //   { id: "Diwali", label: "Diwali", icon: ShirtIcon },
// //   { id: "Ganesh Pooja", label: "Ganesh Pooja", icon: CloudLightning },
// //   { id: "Holi", label: "Holi", icon: BabyIcon },
// //   { id: "Rakhsa Bandhan", label: "Rakhsa Bandhan", icon: WatchIcon },
// //   { id: "Gifts", label: "Gifts", icon: UmbrellaIcon },
// // ];

// // const brandsWithIcon = [
// //   { id: "Lakshmi Mata", label: "Lakshmi Mata", icon: Shirt },
// //   { id: "Ganesha", label: "Ganesha", icon: WashingMachine },
// //   { id: "Adiyogi", label: "Adiyogi", icon: ShoppingBasket },
// //   { id: "Lakshmi & Ganesha", label: "Lakshmi & Ganesha", icon: Airplay },
// //   { id: "Saraswati Mata", label: "Saraswati Mata", icon: Images },
// //   { id: "Lakshmi & Saraswati", label: "Lakshmi & Saraswati", icon: Heater },
// // ];
// // function ShoppingHome() {
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const { productList, productDetails } = useSelector(
// //     (state) => state.shopProducts
// //   );
// //   const { featureImageList } = useSelector((state) => state.commonFeature);

// //   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

// //   const { user } = useSelector((state) => state.auth);

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { toast } = useToast();

// //   function handleNavigateToListingPage(getCurrentItem, section) {
// //     sessionStorage.removeItem("filters");
// //     const currentFilter = {
// //       [section]: [getCurrentItem.id],
// //     };

// //     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
// //     navigate(`/shop/listing`);
// //   }

// //   function handleGetProductDetails(getCurrentProductId) {
// //     dispatch(fetchProductDetails(getCurrentProductId));
// //   }

// //   function handleAddtoCart(getCurrentProductId) {
// //     dispatch(
// //       addToCart({
// //         userId: user?.id,
// //         productId: getCurrentProductId,
// //         quantity: 1,
// //       })
// //     ).then((data) => {
// //       if (data?.payload?.success) {
// //         dispatch(fetchCartItems(user?.id));
// //         toast({
// //           title: "Product is added to cart",
// //         });
// //       }
// //     });
// //   }

// //   useEffect(() => {
// //     if (productDetails !== null) setOpenDetailsDialog(true);
// //   }, [productDetails]);

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
// //     }, 15000);

// //     return () => clearInterval(timer);
// //   }, [featureImageList]);

// //   useEffect(() => {
// //     dispatch(
// //       fetchAllFilteredProducts({
// //         filterParams: {},
// //         sortParams: "price-lowtohigh",
// //       })
// //     );
// //   }, [dispatch]);

// //   console.log(productList, "productList");

// //   useEffect(() => {
// //     dispatch(getFeatureImages());
// //   }, [dispatch]);

// //   return (
// //     <div className="flex flex-col min-h-screen">
// //       <div className="relative w-full h-[600px] overflow-hidden">
// //         {featureImageList && featureImageList.length > 0
// //           ? featureImageList.map((slide, index) => (
// //               <img
// //                 src={slide?.image}
// //                 key={index}
// //                 className={`${
// //                   index === currentSlide ? "opacity-100" : "opacity-0"
// //                 } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
// //               />
// //             ))
// //           : null}
// //         <Button
// //           variant="outline"
// //           size="icon"
// //           onClick={() =>
// //             setCurrentSlide(
// //               (prevSlide) =>
// //                 (prevSlide - 1 + featureImageList.length) %
// //                 featureImageList.length
// //             )
// //           }
// //           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
// //         >
// //           <ChevronLeftIcon className="w-4 h-4" />
// //         </Button>
// //         <Button
// //           variant="outline"
// //           size="icon"
// //           onClick={() =>
// //             setCurrentSlide(
// //               (prevSlide) => (prevSlide + 1) % featureImageList.length
// //             )
// //           }
// //           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
// //         >
// //           <ChevronRightIcon className="w-4 h-4" />
// //         </Button>
// //       </div>
// //       <section className="py-12 bg-gray-50">
// //         <div className="container mx-auto px-4">
// //           <h2 className="text-3xl font-bold text-center mb-8">
// //             Shop by category
// //           </h2>
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
// //             {categoriesWithIcon.map((categoryItem) => (
// //               <Card
// //                 onClick={() =>
// //                   handleNavigateToListingPage(categoryItem, "category")
// //                 }
// //                 className="cursor-pointer hover:shadow-lg transition-shadow"
// //               >
// //                 <CardContent className="flex flex-col items-center justify-center p-6">
// //                   <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
// //                   <span className="font-bold">{categoryItem.label}</span>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <section className="py-12 bg-gray-50">
// //         <div className="container mx-auto px-4">
// //           <h2 className="text-3xl font-bold text-center mb-8"></h2>
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
// //             {brandsWithIcon.map((brandItem) => (
// //               <Card
// //                 onClick={() => handleNavigateToListingPage(brandItem, "brand")}
// //                 className="cursor-pointer hover:shadow-lg transition-shadow"
// //               >
// //                 <CardContent className="flex flex-col items-center justify-center p-6">
// //                   <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
// //                   <span className="font-bold">{brandItem.label}</span>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <section className="py-12">
// //         <div className="container mx-auto px-4">
// //           <h2 className="text-3xl font-bold text-center mb-8">
// //             Feature Products
// //           </h2>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //             {productList && productList.length > 0
// //               ? productList.map((productItem) => (
// //                   <ShoppingProductTile
// //                     handleGetProductDetails={handleGetProductDetails}
// //                     product={productItem}
// //                     handleAddtoCart={handleAddtoCart}
// //                   />
// //                 ))
// //               : null}
// //           </div>
// //         </div>
// //       </section>
// //       <ProductDetailsDialog
// //         open={openDetailsDialog}
// //         setOpen={setOpenDetailsDialog}
// //         productDetails={productDetails}
// //       />
// //     </div>
// //   );
// // }

// // export default ShoppingHome;

// import { Button } from "@/components/ui/button";
// import banner1 from "@/assets/banner1.png";
// import banner2 from "@/assets/banner2.png";
// import banner3 from "@/assets/banner3.png";

// import {
//   Airplay,
//   BabyIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   CloudLightning,
//   Heater,
//   Images,
//   Shirt,
//   ShirtIcon,
//   ShoppingBasket,
//   UmbrellaIcon,
//   WashingMachine,
//   WatchIcon,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { getFeatureImages } from "@/store/common-slice";

// const categoriesWithIcon = [
//   { id: "Diwali", label: "Diwali", icon: ShirtIcon },
//   { id: "Ganesh Pooja", label: "Ganesh Pooja", icon: CloudLightning },
//   { id: "Holi", label: "Holi", icon: BabyIcon },
//   { id: "Rakhsa Bandhan", label: "Rakhsa Bandhan", icon: WatchIcon },
//   { id: "Gifts", label: "Gifts", icon: UmbrellaIcon },
// ];

// const brandsWithIcon = [
//   { id: "Lakshmi Mata", label: "Lakshmi Mata", icon: Shirt },
//   { id: "Ganesha", label: "Ganesha", icon: WashingMachine },
//   { id: "Adiyogi", label: "Adiyogi", icon: ShoppingBasket },
//   { id: "Lakshmi & Ganesha", label: "Lakshmi & Ganesha", icon: Airplay },
//   { id: "Saraswati Mata", label: "Saraswati Mata", icon: Images },
//   { id: "Lakshmi & Saraswati", label: "Lakshmi & Saraswati", icon: Heater },
// ];

// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { productList, productDetails } = useSelector((state) => state.shopProducts);
//   const { featureImageList } = useSelector((state) => state.commonFeature || {});

//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [autoplayPaused, setAutoplayPaused] = useState(false);

//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // Build slides array with multiple local images as fallback (with captions and links)
//   const slides = useMemo(() => {
//     if (featureImageList && Array.isArray(featureImageList) && featureImageList.length > 0) {
//       // normalize remote slides to have { image, title, subtitle, link }
//       return featureImageList.map((it) => ({
//         image: it.image,
//         title: it.title || "",
//         subtitle: it.subtitle || "",
//         link: it.link || "/shop/listing",
//       }));
//     }

//     return [
//       { image: banner1, title: "Organic Gift Hampers", subtitle: "Handmade — Cowdung, Herbs & Natural Colours", link: "/shop/listing" },
//       { image: banner2, title: "Natural Dhoop & Agarbatti", subtitle: "Pure jadi-booti blends", link: "/shop/listing" },
//       { image: banner3, title: "Eco Holi Colours", subtitle: "Non-toxic, skin-friendly", link: "/shop/listing" },
//     ];
//   }, [featureImageList]);

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters");
//     const currentFilter = { [section]: [getCurrentItem.id] };
//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     navigate(`/shop/listing`);
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   function handleAddtoCart(getCurrentProductId) {
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({ title: "Product is added to cart" });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   // Carousel auto-advance + pause on hover
//   useEffect(() => {
//     if (!slides || slides.length <= 1 || autoplayPaused) return;
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 2500);
//     return () => clearInterval(timer);
//   }, [slides, autoplayPaused]);

//   useEffect(() => {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: {},
//         sortParams: "price-lowtohigh",
//       })
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   // keyboard navigation
//   useEffect(() => {
//     const onKey = (e) => {
//       if (!slides || slides.length <= 1) return;
//       if (e.key === "ArrowLeft") setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
//       if (e.key === "ArrowRight") setCurrentSlide((p) => (p + 1) % slides.length);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [slides]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div
//         className="relative w-full h-[600px] overflow-hidden"
//         onMouseEnter={() => setAutoplayPaused(true)}
//         onMouseLeave={() => setAutoplayPaused(false)}
//       >
//         {slides.map((slide, index) => (
//           <img
//             src={slide?.image}
//             key={index}
//             alt={slide?.title || `slide-${index}`}
//             loading="lazy"
//             onError={(e) => {
//               if (e.currentTarget.src !== banner1) e.currentTarget.src = banner1;
//             }}
//             className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 filter brightness-75`}
//           />
//         ))}

//         {/* dark overlay for consistent dark-theme */}
//         <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />

//         {/* caption + CTA */}
//         <div className="absolute left-6 bottom-12 z-20 text-white max-w-xl">
//           <h3 className="text-3xl md:text-4xl font-bold">{slides[currentSlide]?.title}</h3>
//           <p className="mt-2">{slides[currentSlide]?.subtitle}</p>
//           <Button
//             onClick={() => navigate(slides[currentSlide]?.link || "/shop/listing")}
//             className="mt-4 pointer-events-auto"
//           >
//             Shop Now
//           </Button>
//         </div>

//         {/* nav buttons - always visible but disabled if single slide */}
//         {slides.length > 1 && (
//           <>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
//               className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white/80"
//             >
//               <ChevronLeftIcon className="w-4 h-4" />
//             </Button>

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
//               className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white/80"
//             >
//               <ChevronRightIcon className="w-4 h-4" />
//             </Button>

//             {/* indicators */}
//             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
//               {slides.map((_, i) => (
//                 <button
//                   key={i}
//                   aria-label={`Go to slide ${i + 1}`}
//                   onClick={() => setCurrentSlide(i)}
//                   className={`w-3 h-3 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/40"}`}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {categoriesWithIcon.map((categoryItem) => (
//               <Card
//                 onClick={() => handleNavigateToListingPage(categoryItem, "category")}
//                 key={categoryItem.id}
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{categoryItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8"></h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {brandsWithIcon.map((brandItem) => (
//               <Card
//                 onClick={() => handleNavigateToListingPage(brandItem, "brand")}
//                 key={brandItem.id}
//                 className="cursor-pointer hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{brandItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList && productList.length > 0
//               ? productList.map((productItem) => (
//                   <ShoppingProductTile
//                     key={productItem.id}
//                     handleGetProductDetails={handleGetProductDetails}
//                     product={productItem}
//                     handleAddtoCart={handleAddtoCart}
//                   />
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>

//       <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
//     </div>
//   );
// }

// export default ShoppingHome;



// import { Button } from "@/components/ui/button";
// import banner1 from "@/assets/banner1.png";
// import banner2 from "@/assets/banner2.png";
// import banner3 from "@/assets/banner3.png";

// import {
//   Airplay,
//   BabyIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   CloudLightning,
//   Heater,
//   Images,
//   Shirt,
//   ShirtIcon,
//   ShoppingBasket,
//   UmbrellaIcon,
//   WashingMachine,
//   WatchIcon,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { getFeatureImages } from "@/store/common-slice";

// const categoriesWithIcon = [
//   { id: "Diwali", label: "Diwali", icon: ShirtIcon },
//   { id: "Ganesh Pooja", label: "Ganesh Pooja", icon: CloudLightning },
//   { id: "Holi", label: "Holi", icon: BabyIcon },
//   { id: "Rakhsa Bandhan", label: "Rakhsa Bandhan", icon: WatchIcon },
//   { id: "Gifts", label: "Gifts", icon: UmbrellaIcon },
// ];

// const brandsWithIcon = [
//   { id: "Lakshmi Mata", label: "Lakshmi Mata", icon: Shirt },
//   { id: "Ganesha", label: "Ganesha", icon: WashingMachine },
//   { id: "Adiyogi", label: "Adiyogi", icon: ShoppingBasket },
//   { id: "Lakshmi & Ganesha", label: "Lakshmi & Ganesha", icon: Airplay },
//   { id: "Saraswati Mata", label: "Saraswati Mata", icon: Images },
//   { id: "Lakshmi & Saraswati", label: "Lakshmi & Saraswati", icon: Heater },
// ];

// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { productList, productDetails } = useSelector((state) => state.shopProducts);
//   const { featureImageList } = useSelector((state) => state.commonFeature || {});

//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [autoplayPaused, setAutoplayPaused] = useState(false);

//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // Build slides array (remote feature images fallback to local banners)
//   const slides = useMemo(() => {
//     if (featureImageList && Array.isArray(featureImageList) && featureImageList.length > 0) {
//       return featureImageList.map((it) => ({
//         image: it.image,
//         title: it.title || "",
//         subtitle: it.subtitle || "",
//         link: it.link || "/shop/listing",
//       }));
//     }

//     return [
//       { image: banner1, title: "Organic Gift Hampers", subtitle: "Handmade — Cowdung, Herbs & Natural Colours", link: "/shop/listing" },
//       { image: banner2, title: "Natural Dhoop & Agarbatti", subtitle: "Pure jadi-booti blends", link: "/shop/listing" },
//       { image: banner3, title: "Eco Holi Colours", subtitle: "Non-toxic, skin-friendly", link: "/shop/listing" },
//     ];
//   }, [featureImageList]);

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters");
//     const currentFilter = { [section]: [getCurrentItem.id] };
//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     navigate(`/shop/listing`);
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   function handleAddtoCart(getCurrentProductId) {
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({ title: "Product is added to cart" });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   // Carousel auto-advance + pause on hover/touch
//   useEffect(() => {
//     if (!slides || slides.length <= 1 || autoplayPaused) return;
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides, autoplayPaused]);

//   useEffect(() => {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: {},
//         sortParams: "price-lowtohigh",
//       })
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   // keyboard navigation for slides
//   useEffect(() => {
//     const onKey = (e) => {
//       if (!slides || slides.length <= 1) return;
//       if (e.key === "ArrowLeft") setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
//       if (e.key === "ArrowRight") setCurrentSlide((p) => (p + 1) % slides.length);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [slides]);

//   return (
//     <div className="flex flex-col min-h-screen bg-black text-white">
//       {/* HERO / SLIDER */}
//       <div
//         className="relative w-full h-[600px] overflow-hidden"
//         onMouseEnter={() => setAutoplayPaused(true)}
//         onMouseLeave={() => setAutoplayPaused(false)}
//       >
//         {slides.map((slide, index) => (
//           <img
//             src={slide?.image}
//             key={index}
//             alt={slide?.title || `slide-${index}`}
//             loading="lazy"
//             onError={(e) => {
//               if (e.currentTarget.src !== banner1) e.currentTarget.src = banner1;
//             }}
//             className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute inset-0 w-full h-full object-cover transition-opacity duration-700 filter brightness-60`}
//           />
//         ))}

//         {/* dark overlay for readable text */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10 pointer-events-none" />

//         {/* caption + CTA */}
//         <div className="absolute left-6 bottom-12 z-20 text-white max-w-xl">
//           <h3 className="text-3xl md:text-4xl font-bold">{slides[currentSlide]?.title}</h3>
//           <p className="mt-2 text-neutral-300">{slides[currentSlide]?.subtitle}</p>
//           <Button
//             onClick={() => navigate(slides[currentSlide]?.link || "/shop/listing")}
//             className="mt-4 bg-neutral-800 hover:bg-neutral-700 text-white"
//           >
//             Shop Now
//           </Button>
//         </div>

//         {/* nav buttons */}
//         {slides.length > 1 && (
//           <>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
//               className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-neutral-800 text-white border border-neutral-700"
//             >
//               <ChevronLeftIcon className="w-4 h-4" />
//             </Button>

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
//               className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-neutral-800 text-white border border-neutral-700"
//             >
//               <ChevronRightIcon className="w-4 h-4" />
//             </Button>

//             {/* indicators */}
//             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
//               {slides.map((_, i) => (
//                 <button
//                   key={i}
//                   aria-label={`Go to slide ${i + 1}`}
//                   onClick={() => setCurrentSlide(i)}
//                   className={`w-3 h-3 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/30"}`}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* CATEGORIES */}
//       <section className="py-12 bg-neutral-900 border-t border-neutral-800">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8 text-neutral-100">Shop by category</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {categoriesWithIcon.map((categoryItem) => (
//               <Card
//                 onClick={() => handleNavigateToListingPage(categoryItem, "category")}
//                 key={categoryItem.id}
//                 className="cursor-pointer hover:shadow-lg transition-shadow bg-neutral-900 border border-neutral-800"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <categoryItem.icon className="w-12 h-12 mb-4 text-neutral-200" />
//                   <span className="font-bold text-neutral-100">{categoryItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* BRANDS */}
//       <section className="py-12 bg-neutral-900 border-t border-neutral-800">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {brandsWithIcon.map((brandItem) => (
//               <Card
//                 onClick={() => handleNavigateToListingPage(brandItem, "brand")}
//                 key={brandItem.id}
//                 className="cursor-pointer hover:shadow-lg transition-shadow bg-neutral-900 border border-neutral-800"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <brandItem.icon className="w-12 h-12 mb-4 text-neutral-200" />
//                   <span className="font-bold text-neutral-100">{brandItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURE PRODUCTS */}
//       <section className="py-12 bg-black border-t border-neutral-800">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8 text-neutral-100">Feature Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList && productList.length > 0
//               ? productList.map((productItem) => (
//                   <div key={productItem?._id || productItem?.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-3">
//                     <ShoppingProductTile
//                       handleGetProductDetails={handleGetProductDetails}
//                       product={productItem}
//                       handleAddtoCart={handleAddtoCart}
//                     />
//                   </div>
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>

//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// }

// export default ShoppingHome;


// import { Button } from "@/components/ui/button";
// import banner1 from "@/assets/banner1.png";
// import banner2 from "@/assets/banner2.png";
// import banner3 from "@/assets/banner3.png";

// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { getFeatureImages } from "@/store/common-slice";

// /**
//  * IMPORTANT: Replace placeholder image imports/paths below with your own images.
//  * Option A (local): put images in src/assets and import them above (like banner1).
//  * Option B (remote): use a full URL string in the `image` field of arrays below.
//  */

// // Example local placeholders (you can import your real images here)
// import catDiwali from "@/assets/cat-diwali.png"; // replace with your file
// import catGanesh from "@/assets/cat-ganesh.png";
// import catHoli from "@/assets/cat-holi.png";
// import catRakhi from "@/assets/cat-rakhi.png";
// import catGifts from "@/assets/cat-gifts.png";

// import brandLakshmi from "@/assets/brand-lakshmi.png";
// import brandGanesha from "@/assets/brand-ganesha.png";
// import brandAdiyogi from "@/assets/brand-adiyogi.png";
// import brandLakshmiGanesha from "@/assets/brand-lakshmi-ganesha.png";
// import brandSaraswati from "@/assets/brand-saraswati.png";
// import brandLakshmiSaraswati from "@/assets/brand-lakshmi-saraswati.png";

// const categoriesWithImage = [
//   { id: "Diwali", label: "Diwali", image: catDiwali },
//   { id: "Ganesh Pooja", label: "Ganesh Pooja", image: catGanesh },
//   { id: "Holi", label: "Holi", image: catHoli },
//   { id: "Rakhsa Bandhan", label: "Rakhsa Bandhan", image: catRakhi },
//   { id: "Gifts", label: "Gifts", image: catGifts },
// ];

// const brandsWithImage = [
//   { id: "Lakshmi Mata", label: "Lakshmi Mata", image: brandLakshmi },
//   { id: "Ganesha", label: "Ganesha", image: brandGanesha },
//   { id: "Adiyogi", label: "Adiyogi", image: brandAdiyogi },
//   { id: "Lakshmi & Ganesha", label: "Lakshmi & Ganesha", image: brandLakshmiGanesha },
//   { id: "Saraswati Mata", label: "Saraswati Mata", image: brandSaraswati },
//   { id: "Lakshmi & Saraswati", label: "Lakshmi & Saraswati", image: brandLakshmiSaraswati },
// ];

// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { productList, productDetails } = useSelector((state) => state.shopProducts);
//   const { featureImageList } = useSelector((state) => state.commonFeature || {});

//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [autoplayPaused, setAutoplayPaused] = useState(false);

//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // Build slides array (remote feature images fallback to local banners)
//   const slides = useMemo(() => {
//     if (featureImageList && Array.isArray(featureImageList) && featureImageList.length > 0) {
//       return featureImageList.map((it) => ({
//         image: it.image,
//         title: it.title || "",
//         subtitle: it.subtitle || "",
//         link: it.link || "/shop/listing",
//       }));
//     }

//     return [
//       { image: banner1, title: "Organic Gift Hampers", subtitle: "Handmade — Cowdung, Herbs & Natural Colours", link: "/shop/listing" },
//       { image: banner2, title: "Natural Dhoop & Agarbatti", subtitle: "Pure jadi-booti blends", link: "/shop/listing" },
//       { image: banner3, title: "Eco Holi Colours", subtitle: "Non-toxic, skin-friendly", link: "/shop/listing" },
//     ];
//   }, [featureImageList]);

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters");
//     const currentFilter = { [section]: [getCurrentItem.id] };
//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     navigate(`/shop/listing`);
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   function handleAddtoCart(getCurrentProductId) {
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({ title: "Product is added to cart" });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   // Carousel auto-advance + pause on hover/touch
//   useEffect(() => {
//     if (!slides || slides.length <= 1 || autoplayPaused) return;
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides, autoplayPaused]);

//   useEffect(() => {
//     dispatch(
//       fetchAllFilteredProducts({
//         filterParams: {},
//         sortParams: "price-lowtohigh",
//       })
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   // keyboard navigation for slides
//   useEffect(() => {
//     const onKey = (e) => {
//       if (!slides || slides.length <= 1) return;
//       if (e.key === "ArrowLeft") setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
//       if (e.key === "ArrowRight") setCurrentSlide((p) => (p + 1) % slides.length);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [slides]);

//   return (
//     <div className="flex flex-col min-h-screen bg-black text-white">
//       {/* HERO / SLIDER */}
//       <div
//         className="relative w-full h-[600px] overflow-hidden"
//         onMouseEnter={() => setAutoplayPaused(true)}
//         onMouseLeave={() => setAutoplayPaused(false)}
//       >
//         {slides.map((slide, index) => (
//           <img
//             src={slide?.image}
//             key={index}
//             alt={slide?.title || `slide-${index}`}
//             loading="lazy"
//             onError={(e) => {
//               if (e.currentTarget.src !== banner1) e.currentTarget.src = banner1;
//             }}
//             className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute inset-0 w-full h-full object-cover transition-opacity duration-700 filter brightness-60`}
//           />
//         ))}

//         {/* dark overlay for readable text */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10 pointer-events-none" />

//         {/* caption + CTA */}
//         <div className="absolute left-6 bottom-12 z-20 text-white max-w-xl">
//           <h3 className="text-3xl md:text-4xl font-bold">{slides[currentSlide]?.title}</h3>
//           <p className="mt-2 text-neutral-300">{slides[currentSlide]?.subtitle}</p>
//           <Button
//             onClick={() => navigate(slides[currentSlide]?.link || "/shop/listing")}
//             className="mt-4 bg-neutral-800 hover:bg-neutral-700 text-white"
//           >
//             Shop Now
//           </Button>
//         </div>

//         {/* nav buttons */}
//         {slides.length > 1 && (
//           <>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
//               className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-neutral-800 text-white border border-neutral-700"
//             >
//               <ChevronLeftIcon className="w-4 h-4" />
//             </Button>

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
//               className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-neutral-800 text-white border border-neutral-700"
//             >
//               <ChevronRightIcon className="w-4 h-4" />
//             </Button>

//             {/* indicators */}
//             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
//               {slides.map((_, i) => (
//                 <button
//                   key={i}
//                   aria-label={`Go to slide ${i + 1}`}
//                   onClick={() => setCurrentSlide(i)}
//                   className={`w-3 h-3 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/30"}`}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* CATEGORIES - pure black cards with images */}
//       <section className="py-12 bg-black border-t border-neutral-800">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8 text-neutral-100">Shop by category</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {categoriesWithImage.map((categoryItem) => (
//               <Card
//                 key={categoryItem.id}
//                 onClick={() => handleNavigateToListingPage(categoryItem, "category")}
//                 className="cursor-pointer hover:shadow-lg transition-shadow !bg-black !text-white border border-neutral-800"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6 bg-transparent">
//                   <div className="w-20 h-20 mb-4 rounded-md overflow-hidden flex items-center justify-center bg-black">
//                     <img src={categoryItem.image} alt={categoryItem.label} className="w-full h-full object-contain" />
//                   </div>
//                   <span className="font-bold text-neutral-100">{categoryItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* BRANDS - pure black cards with images */}
//       <section className="py-12 bg-black border-t border-neutral-800">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {brandsWithImage.map((brandItem) => (
//               <Card
//                 key={brandItem.id}
//                 onClick={() => handleNavigateToListingPage(brandItem, "brand")}
//                 className="cursor-pointer hover:shadow-lg transition-shadow !bg-black !text-white border border-neutral-800"
//               >
//                 <CardContent className="flex flex-col items-center justify-center p-6 bg-transparent">
//                   <div className="w-20 h-20 mb-4 rounded-md overflow-hidden flex items-center justify-center bg-black">
//                     <img src={brandItem.image} alt={brandItem.label} className="w-full h-full object-contain" />
//                   </div>
//                   <span className="font-bold text-neutral-100">{brandItem.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURE PRODUCTS */}
//       <section className="py-12 bg-black border-t border-neutral-800">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8 text-neutral-100">Feature Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList && productList.length > 0
//               ? productList.map((productItem) => (
//                   <div key={productItem?._id || productItem?.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-3">
//                     <ShoppingProductTile
//                       handleGetProductDetails={handleGetProductDetails}
//                       product={productItem}
//                       handleAddtoCart={handleAddtoCart}
//                     />
//                   </div>
//                 ))
//               : null}
//           </div>
//         </div>
//       </section>

//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// }

// export default ShoppingHome;



import { Button } from "@/components/ui/button";
import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.png";
import banner3 from "@/assets/banner3.png";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

/**
 * IMPORTANT: Replace placeholder image imports/paths below with your own images.
 * Option A (local): put images in src/assets and import them above (like banner1).
 * Option B (remote): use a full URL string in the `image` field of arrays below.
 */

// Example local placeholders (you can import your real images here)
import catDiwali from "@/assets/cat-diwali.png"; // replace with your file
import catGanesh from "@/assets/cat-ganesh.png";
import catHoli from "@/assets/cat-holi.png";
import catRakhi from "@/assets/cat-rakhi.png";
import catGifts from "@/assets/cat-gifts.png";

import brandLakshmi from "@/assets/brand-lakshmi.png";
import brandGanesha from "@/assets/brand-ganesha.png";
import brandAdiyogi from "@/assets/brand-adiyogi.png";
import brandLakshmiGanesha from "@/assets/brand-lakshmi-ganesha.png";
import brandSaraswati from "@/assets/brand-saraswati.png";
import brandLakshmiSaraswati from "@/assets/brand-lakshmi-saraswati.png";

const categoriesWithImage = [
  { id: "Diwali", label: "Diwali", image: catDiwali },
  { id: "Ganesh Pooja", label: "Ganesh Pooja", image: catGanesh },
  { id: "Holi", label: "Holi", image: catHoli },
  { id: "Rakhsa Bandhan", label: "Rakhsa Bandhan", image: catRakhi },
  { id: "Gifts", label: "Gifts", image: catGifts },
];

const brandsWithImage = [
  { id: "Lakshmi Mata", label: "Lakshmi Mata", image: brandLakshmi },
  { id: "Ganesha", label: "Ganesha", image: brandGanesha },
  { id: "Adiyogi", label: "Adiyogi", image: brandAdiyogi },
  { id: "Lakshmi & Ganesha", label: "Lakshmi & Ganesha", image: brandLakshmiGanesha },
  { id: "Saraswati Mata", label: "Saraswati Mata", image: brandSaraswati },
  { id: "Lakshmi & Saraswati", label: "Lakshmi & Saraswati", image: brandLakshmiSaraswati },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature || {});

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Build slides array (remote feature images fallback to local banners)
  const slides = useMemo(() => {
    if (featureImageList && Array.isArray(featureImageList) && featureImageList.length > 0) {
      return featureImageList.map((it) => ({
        image: it.image,
        title: it.title || "",
        subtitle: it.subtitle || "",
        link: it.link || "/shop/listing",
      }));
    }

    return [
      { image: banner1, title: "Organic Gift Hampers", subtitle: "Handmade — Cowdung, Herbs & Natural Colours", link: "/shop/listing" },
      { image: banner2, title: "Natural Dhoop & Agarbatti", subtitle: "Pure jadi-booti blends", link: "/shop/listing" },
      { image: banner3, title: "Eco Holi Colours", subtitle: "Non-toxic, skin-friendly", link: "/shop/listing" },
    ];
  }, [featureImageList]);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [getCurrentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product is added to cart" });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Carousel auto-advance + pause on hover/touch
  useEffect(() => {
    if (!slides || slides.length <= 1 || autoplayPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides, autoplayPaused]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // keyboard navigation for slides
  useEffect(() => {
    const onKey = (e) => {
      if (!slides || slides.length <= 1) return;
      if (e.key === "ArrowLeft") setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
      if (e.key === "ArrowRight") setCurrentSlide((p) => (p + 1) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* HERO / SLIDER */}
      <div
        className="relative w-full h-[600px] overflow-hidden"
        onMouseEnter={() => setAutoplayPaused(true)}
        onMouseLeave={() => setAutoplayPaused(false)}
      >
        {slides.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            alt={slide?.title || `slide-${index}`}
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== banner1) e.currentTarget.src = banner1;
            }}
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute inset-0 w-full h-full object-cover transition-opacity duration-700 filter brightness-60`}
          />
        ))}

        {/* dark overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10 pointer-events-none" />

        {/* caption + CTA */}
        <div className="absolute left-6 bottom-12 z-20 text-white max-w-xl">
          <h3 className="text-3xl md:text-4xl font-bold">{slides[currentSlide]?.title}</h3>
          <p className="mt-2 text-neutral-300">{slides[currentSlide]?.subtitle}</p>
          <Button
            onClick={() => navigate(slides[currentSlide]?.link || "/shop/listing")}
            className="mt-4 bg-neutral-800 hover:bg-neutral-700 text-white"
          >
            Shop Now
          </Button>
        </div>

        {/* nav buttons */}
        {slides.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-neutral-800 text-white border border-neutral-700"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-neutral-800 text-white border border-neutral-700"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>

            {/* indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/30"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* CATEGORIES - pure black cards with slightly larger images */}
      <section className="py-12 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-neutral-100">Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithImage.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="cursor-pointer hover:shadow-lg transition-shadow !bg-black !text-white border border-neutral-800"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 bg-transparent">
                  <div className="w-24 h-24 mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-neutral-900 border border-neutral-700 transform transition-transform hover:scale-105">
                    <img src={categoryItem.image} alt={categoryItem.label} className="w-full h-full object-contain p-2" />
                  </div>
                  <span className="font-bold text-neutral-100">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS - pure black cards with slightly larger images */}
      <section className="py-12 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithImage.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow !bg-black !text-white border border-neutral-800"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 bg-transparent">
                  <div className="w-24 h-24 mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-neutral-900 border border-neutral-700 transform transition-transform hover:scale-105">
                    <img src={brandItem.image} alt={brandItem.label} className="w-full h-full object-contain p-2" />
                  </div>
                  <span className="font-bold text-neutral-100">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE PRODUCTS */}
      <section className="py-12 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-neutral-100">Feature Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <div key={productItem?._id || productItem?.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-3">
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
