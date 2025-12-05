// import { StarIcon } from "lucide-react";
// import { Button } from "../ui/button";

// function StarRatingComponent({ rating, handleRatingChange }) {
//   console.log(rating, "rating");

//   return [1, 2, 3, 4, 5].map((star) => (
//     <Button
//       className={`p-2 rounded-full transition-colors ${
//         star <= rating
//           ? "text-yellow-500 hover:bg-black"
//           : "text-black hover:bg-primary hover:text-primary-foreground"
//       }`}
//       variant="outline"
//       size="icon"
//       onClick={handleRatingChange ? () => handleRatingChange(star) : null}
//     >
//       <StarIcon
//         className={`w-6 h-6 ${
//           star <= rating ? "fill-yellow-500" : "fill-black"
//         }`}
//       />
//     </Button>
//   ));
// }

// export default StarRatingComponent;



import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating = 0, onChange, readOnly = false }) {
  const current = Number(rating) || 0;

  function handleSet(value) {
    if (readOnly) return;
    if (typeof onChange === "function") onChange(value);
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= current;

        return (
          <Button
            key={star}
            size="icon"
            variant="ghost"
            onClick={() => handleSet(star)}
            className={`
              p-1 rounded-full transition-transform
              ${filled ? "text-yellow-400" : "text-neutral-500"}
              ${!readOnly && "hover:scale-110 hover:text-yellow-300"}
            `}
          >
            <StarIcon
              className="w-6 h-6"
              fill={filled ? "currentColor" : "transparent"}
            />
          </Button>
        );
      })}
    </div>
  );
}

export default StarRatingComponent;
