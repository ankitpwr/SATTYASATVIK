import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`
        cursor-pointer 
        bg-neutral-900 
        text-white 
        border 
        rounded-xl 
        transition-all 
        duration-200 
        hover:border-neutral-600 
        ${
          isSelected
            ? "border-red-600 shadow-md shadow-red-900"
            : "border-neutral-800"
        }
      `}
    >
      <CardContent className="grid p-4 gap-2">
        <Label className="text-neutral-300">Address: {addressInfo?.address}</Label>
        <Label className="text-neutral-300">City: {addressInfo?.city}</Label>
        <Label className="text-neutral-300">Pincode: {addressInfo?.pincode}</Label>
        <Label className="text-neutral-300">Phone: {addressInfo?.phone}</Label>
        <Label className="text-neutral-300">Notes: {addressInfo?.notes}</Label>
      </CardContent>

      <CardFooter className="p-3 flex justify-between border-t border-neutral-800">
        {/* EDIT BUTTON */}
        <Button
          className="
            bg-neutral-800 
            border border-neutral-700 
            text-white 
            hover:bg-neutral-700 
            hover:scale-[1.05]
            active:scale-95
            transition-all 
            duration-200
          "
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>

        {/* DELETE BUTTON */}
        <Button
          className="
            bg-neutral-800 
            border border-neutral-700 
            text-white 
            hover:bg-black-600 
            hover:black
            hover:scale-[1.05]
            active:scale-95
            transition-all 
            duration-200
          "
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
