import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

/* helper to split description into pages */
function chunkText(text = "", size = 240) {
  if (!text) return [];
  const parts = [];
  let remaining = text.trim();

  while (remaining.length) {
    if (remaining.length <= size) {
      parts.push(remaining.trim());
      break;
    }

    const slice = remaining.slice(0, size);
    let lastBreak = Math.max(
      slice.lastIndexOf("."),
      slice.lastIndexOf("!"),
      slice.lastIndexOf("?"),
      slice.lastIndexOf("\n"),
      slice.lastIndexOf(",")
    );

    if (lastBreak <= Math.floor(size * 0.5)) lastBreak = size;
    parts.push(remaining.slice(0, lastBreak).trim());
    remaining = remaining.slice(lastBreak).trim();
  }

  return parts;
}

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  // responsive: page size lower on small screens
  const PAGE_SIZE = 240;
  const descriptionPages = useMemo(
    () => chunkText(productDetails?.description || "", PAGE_SIZE),
    [productDetails?.description]
  );

  const [descIndex, setDescIndex] = useState(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  // ensure index reset when product changes
  useEffect(() => {
    setDescIndex(0);
  }, [productDetails?._id]);

  // NOTE: keyboard & touch swipe handlers removed per request.
  // Only Prev/Next buttons will control the slider.

  // load reviews when product changes
  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails, dispatch]);

  // clear local states on dialog close
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // Async, defensive review submit
  async function handleAddReview() {
    if (!reviewMsg.trim() && (!rating || rating === 0)) {
      toast({
        title: "Please add a rating or a review message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingReview(true);

    try {
      const action = await dispatch(
        addReview({
          productId: productDetails?._id,
          userId: user?.id,
          userName: user?.userName,
          reviewMessage: reviewMsg,
          reviewValue: rating,
        })
      );

      console.log("addReview result:", action);

      if (action?.meta?.requestStatus === "fulfilled" && action?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({ title: "Review added successfully!" });
      } else {
        const serverMsg =
          action?.payload?.message ||
          action?.payload?.error ||
          (action?.error && action.error.message);
        console.error("Review submit failed:", action);
        toast({
          title: serverMsg || "Failed to submit review — try again",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Unexpected error while submitting review:", err);
      toast({
        title: "Something went wrong while submitting review",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingReview(false);
    }
  }

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + (reviewItem?.reviewValue || 0), 0) /
        reviews.length
      : 0;

  const canSubmit = !(
    isSubmittingReview ||
    (reviewMsg.trim() === "" && (!rating || rating === 0))
  );

  // slider controls
  const nextDesc = useCallback(() => {
    if (!descriptionPages || descriptionPages.length <= 1) return;
    setDescIndex((i) => (i + 1 < descriptionPages.length ? i + 1 : i));
  }, [descriptionPages]);
  const prevDesc = useCallback(() => {
    if (!descriptionPages || descriptionPages.length <= 1) return;
    setDescIndex((i) => Math.max(0, i - 1));
  }, [descriptionPages]);

  // keep slider transform in sync
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 300ms ease";
      sliderRef.current.style.transform = `translateX(${ -descIndex * 100 }%)`;
    }
  }, [descIndex]);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:p-10 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] bg-neutral-900 text-white border border-neutral-800 rounded-lg overflow-hidden">
        {/* Left: Image */}
        <div className="relative overflow-hidden rounded-lg bg-neutral-800 border border-neutral-700">
          {productDetails?.image ? (
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="aspect-square w-full flex items-center justify-center text-neutral-500">
              No Image
            </div>
          )}
        </div>

        {/* Right: Details (scrollable) */}
        <div className="max-h-[80vh] overflow-auto pr-2">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              {productDetails?.title}
            </h1>
            <p className="text-neutral-300 text-base mb-3 mt-2">
              {productDetails?.shortDescription ?? ""}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-neutral-100 ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-neutral-200">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} readOnly />
            </div>
            <span className="text-neutral-300">({averageReview.toFixed(2)})</span>
          </div>

          <div className="mt-4 mb-4">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full bg-neutral-800 text-neutral-400 cursor-not-allowed opacity-70">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white transition duration-200"
                onClick={() =>
                  handleAddToCart(productDetails?._id, productDetails?.totalStock)
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator className="border-neutral-800" />

          {/* Reviews */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4 text-neutral-100">Reviews</h2>

            <div className="grid gap-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, idx) => (
                  <div
                    key={reviewItem?._id ?? idx}
                    className="flex gap-4 bg-neutral-800 p-3 rounded-lg border border-neutral-700"
                  >
                    <Avatar className="w-10 h-10 border border-neutral-700 bg-neutral-700">
                      <AvatarFallback className="text-white">
                        {reviewItem?.userName?.[0]?.toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-neutral-100">
                          {reviewItem?.userName}
                        </h3>
                        <div className="text-sm text-neutral-400">
                          {reviewItem?.createdAt
                            ? new Date(reviewItem.createdAt).toISOString().split("T")[0]
                            : ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent
                          rating={reviewItem?.reviewValue || 0}
                          readOnly
                        />
                      </div>
                      <p className="text-neutral-300">{reviewItem.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-neutral-400">No Reviews</div>
              )}
            </div>
          </div>

          {/* Add Review */}
          <div className="mt-6 flex flex-col gap-2">
            <Label className="text-neutral-200">Write a review</Label>

            <div className="flex gap-1">
              <StarRatingComponent rating={rating} onChange={(v) => setRating(v)} />
            </div>

            <Input
              name="reviewMsg"
              value={reviewMsg}
              onChange={(event) => setReviewMsg(event.target.value)}
              placeholder="Write a review..."
              className="bg-neutral-800 text-white border border-neutral-700 placeholder:text-neutral-500"
            />

            <Button
              onClick={handleAddReview}
              disabled={!canSubmit}
              className="bg-neutral-800 hover:bg-neutral-700 text-white transition duration-200 disabled:opacity-50"
            >
              {isSubmittingReview ? "Submitting..." : "Submit"}
            </Button>
          </div>

          <Separator className="border-neutral-800 mt-6" />

          {/* DESCRIPTION SLIDER — moved to very last */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-neutral-100 mb-2">Description</h3>

            <div
              ref={containerRef}
              className="relative bg-neutral-800 border border-neutral-700 rounded-lg p-0 overflow-hidden"
              style={{ minHeight: "110px" }}
            >
              {/* Prev button */}
              {descriptionPages && descriptionPages.length > 1 && (
                <button
                  aria-label="Previous description"
                  onClick={prevDesc}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-neutral-700 hover:bg-neutral-600 p-2 rounded z-20"
                >
                  &#9664;
                </button>
              )}

              {/* Slider track (no scrollbar) */}
              <div
                ref={sliderRef}
                className="flex w-full"
                style={{
                  width: `${descriptionPages.length * 100}%`,
                  transform: `translateX(${-descIndex * 100}%)`,
                }}
              >
                {descriptionPages && descriptionPages.length > 0 ? (
                  descriptionPages.map((page, i) => (
                    <div
                      key={i}
                      className="w-full p-4 text-neutral-300"
                      style={{ flex: "0 0 100%", minHeight: "110px" }}
                    >
                      <p className="whitespace-pre-line">{page}</p>
                    </div>
                  ))
                ) : (
                  <div className="w-full p-4 text-neutral-500">No description provided.</div>
                )}
              </div>

              {/* Next button */}
              {descriptionPages && descriptionPages.length > 1 && (
                <button
                  aria-label="Next description"
                  onClick={nextDesc}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-700 hover:bg-neutral-600 p-2 rounded z-20"
                >
                  &#9654;
                </button>
              )}

              {/* Dots — dark/black style */}
              <div className="flex items-center justify-center gap-2 mt-3 p-2">
                {descriptionPages &&
                  descriptionPages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setDescIndex(i)}
                      className={`w-2 h-2 rounded-full ${
                        i === descIndex ? "bg-neutral-900" : "bg-neutral-600"
                      }`}
                      aria-label={`Go to description page ${i + 1}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
