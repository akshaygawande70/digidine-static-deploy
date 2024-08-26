import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import {
  Navbar,
  Typography,
  IconButton,
  Badge,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartProvider"; // Import useCart hook

export function CustomerNavbar() {
  const { cart } = useCart(); // Use cart from CartProvider
  const navigate = useNavigate();
  const fixedNavbar = true;

  const handleCartClick = () => {
    navigate("../cart", {
      state: { cart }
    });
    setTimeout(() => {
      console.log(window.location.href);
    }, 0);
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "z-40 p-4 shadow-none"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center">
          <img src={"/img/logo/DigiDineLight.png"} className="w-20" alt="Brand" />
        </div>
        <div className="flex items-center">
          {cart.length > 0 ? (
            <Badge content={cart.length}>
              <IconButton className="bg-green-500" onClick={handleCartClick}>
                <ShoppingBagIcon className="h-4 w-4" />
              </IconButton>
            </Badge>
          ) : (
            <IconButton className="bg-green-500">
              <ShoppingBagIcon className="h-4 w-4" />
            </IconButton>
          )}
        </div>
      </div>
      <div className="mr-auto md:mr-4 mt-2">
        <Typography
          variant="lead"
          color="blue-gray"
          className="font-bold"
        >
          Bon appétit, Captain!
        </Typography>
        <Typography variant="small" color="blue-gray">
          Ready to set sail on a flavor voyage?
        </Typography>
      </div>
    </Navbar>
  );
}

CustomerNavbar.displayName = "/src/widgets/layout/customer-navbar.jsx";

export default CustomerNavbar;
