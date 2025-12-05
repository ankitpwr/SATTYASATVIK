import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ShoppingCart } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const isOutOfStock = product?.totalStock === 0;
  const isLowStock = product?.totalStock > 0 && product?.totalStock < 10;

  return (
    <>
      <style>{`
        /* Card hover animations and dark theme tweaks */
        .dark-card {
          background: linear-gradient(180deg, #0a0a0a 0%, #111 100%);
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.35s ease-in-out;
          box-shadow: 0 0 0 rgba(255,215,122,0);
        }
        .dark-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(255,215,122,0.3);
          box-shadow: 0 0 25px rgba(255,215,122,0.1);
        }
        .dark-card img {
          transition: transform 0.4s ease, filter 0.3s ease;
        }
        .dark-card:hover img {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
        .dark-title {
          color: #f5f5f5;
          transition: color 0.25s ease;
        }
        .dark-title:hover {
          color: #ffd57a;
        }
        .dark-text {
          color: #c2c2c2;
        }
        .dark-price {
          color: #ffd57a;
        }
        .dark-button {
          background: linear-gradient(90deg, #ffb64c, #ffd57a);
          color: #000;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .dark-button:hover {
          transform: scale(1.04);
          box-shadow: 0 0 15px rgba(255,215,122,0.3);
        }
      `}</style>

      <Card className="dark-card w-full max-w-sm mx-auto rounded-lg overflow-hidden flex flex-col">
        {/* Image area with fixed aspect ratio (4:3). Change '4/3' to '16/9' or '1/1' as needed */}
        <div
          onClick={() => handleGetProductDetails(product?._id)}
          className="cursor-pointer"
        >
          <div
            className="relative w-full"
            // inline style is safe here for cross-browser aspect-ratio support
            style={{ aspectRatio: "4 / 3", minHeight: 0 }}
          >
            <img
              src={product?.image}
              alt={product?.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Stock badges */}
            {isOutOfStock ? (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
                Out Of Stock
              </Badge>
            ) : isLowStock ? (
              <Badge className="absolute top-2 left-2 bg-amber-500 text-black hover:bg-amber-400">
                {`Only ${product?.totalStock} left`}
              </Badge>
            ) : null}
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="p-4 flex-1">
          <h2 className="text-xl font-bold mb-2 dark-title truncate">
            {product?.title}
          </h2>

          <div className="flex justify-between items-center mb-2 text-sm dark-text">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold dark-price">${product?.price}</span>
            {/* optional small metadata */}
          </div>
        </CardContent>

        {/* Footer / Add to Cart */}
        <CardFooter className="p-4">
          {isOutOfStock ? (
            <Button className="w-full opacity-60 cursor-not-allowed">
              Out Of Stock
            </Button>
          ) : (
            <Button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="dark-button w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export default ShoppingProductTile;
