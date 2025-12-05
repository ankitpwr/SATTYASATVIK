import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="rounded-lg shadow-sm bg-neutral-900 border border-neutral-800 text-neutral-100">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800">
        <h2 className="text-lg font-extrabold text-neutral-100">Filters</h2>
      </div>

      {/* Filter Sections */}
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-semibold text-neutral-200">
                {keyItem}
              </h3>

              <div className="grid gap-2 mt-3">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 text-neutral-300 hover:text-white transition"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        filters[keyItem] &&
                        filters[keyItem].includes(option.id)
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="border-neutral-600 data-[state=checked]:bg-neutral-700 data-[state=checked]:border-neutral-400"
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>

            <Separator className="bg-neutral-800" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
