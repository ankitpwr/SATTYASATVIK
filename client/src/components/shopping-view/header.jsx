import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useMemo, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";

/**
 * Clean, text-only hover header:
 * - Hover affects text color only (no boxes)
 * - Active item has expanding underline
 * - Icons change tint on hover
 * - Keeps animated dark background
 *
 * Paste over src/components/ShoppingHeader.jsx
 */

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeKey = useMemo(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) return categoryParam;
    const path = location.pathname || "";
    const match = shoppingViewHeaderMenuItems.find((m) =>
      path.includes(m.path.replace(/^\//, ""))
    );
    return match ? match.id : "home";
  }, [location.pathname, searchParams]);

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
    } else {
      navigate(getCurrentMenuItem.path);
    }
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-4 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const isActive = String(activeKey) === String(menuItem.id);

        return (
          <button
            key={menuItem.id}
            onClick={() => handleNavigate(menuItem)}
            aria-current={isActive ? "page" : undefined}
            className="relative px-2 py-1 rounded-md focus:outline-none"
            title={menuItem.label}
          >
            {/* TEXT - hover changes color only (no box) */}
            <span
              className={`text-sm font-semibold inline-block transition-all duration-250 ${
                isActive
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-[#FFD57A] via-[#FFB86B] to-[#FF7A6B]"
                  : "bg-clip-text text-transparent bg-gradient-to-r from-[#E7E7E7] via-[#C8BDAE] to-[#EBD8B2] hover:from-[#FFF1D6] hover:via-[#FFD9B3] hover:to-[#FFAA8C]"
              }`}
              style={{ WebkitBackgroundClip: "text" }}
            >
              {menuItem.label}
            </span>

            {/* Expanding underline (text-only hover shows short underline via CSS) */}
            <span
              aria-hidden
              className={`absolute left-0 -bottom-1 h-[3px] rounded-full transition-all duration-300 ${
                isActive
                  ? "w-full bg-gradient-to-r from-[#FFD57A] via-[#FFB86B] to-[#FF7A6B] shadow-[0_8px_30px_rgba(255,120,40,0.12)]"
                  : "w-0 group-hover:w-8"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth || {});
  const { cartItems } = useSelector((state) => state.shopCart || {});
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) dispatch(fetchCartItems(user.id));
  }, [dispatch, user?.id]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-3 lg:gap-4">
      {/* Cart (icon tint changes on hover) */}
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <SheetTrigger asChild>
          <button
            onClick={() => setOpenCartSheet(true)}
            className="relative inline-flex items-center justify-center p-2 rounded-full bg-transparent hover:bg-transparent focus:outline-none"
            aria-label="Open cart"
            title="Cart"
          >
            <ShoppingCart
              className="w-6 h-6 transition-colors duration-200"
              style={{ color: "#FFD57A" }}
            />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black bg-amber-400 rounded-full shadow-md">
              {cartItems?.items?.length || 0}
            </span>
          </button>
        </SheetTrigger>

        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems && cartItems.items ? cartItems.items : []}
        />
      </Sheet>

      {/* User dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#3a1f08]/10 to-[#ffd57a]/6 hover:scale-105 transition-transform focus:outline-none"
            aria-label="User menu"
            title="Account"
          >
            <Avatar className="bg-transparent">
              <AvatarFallback className="bg-[#FFD57A] text-black font-bold">
                {user?.userName ? user.userName[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="right"
          className="w-56 bg-[#070707] border border-[#3b2a10]/20 text-gray-100 shadow-xl"
        >
          <DropdownMenuLabel className="text-sm text-[#ffd57a]">
            {user ? `Welcome, ${user.userName}` : "Not signed in"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="flex items-center gap-3 text-gray-300 hover:text-[#FFD57A] transition-colors"
          >
            <UserCog className="mr-2 h-4 w-4 transition-colors" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4 transition-colors" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <>
      {/* background animation CSS (kept) */}
      <style>{`
        .header-animated-bg {
          background-image:
            radial-gradient(600px 200px at 10% 10%, rgba(120,60,10,0.06), transparent 8%),
            radial-gradient(700px 260px at 90% 80%, rgba(255,140,60,0.05), transparent 8%),
            linear-gradient(180deg, #000 0%, #020202 40%, #070707 100%);
          background-size: 200% 200%, 200% 200%, 100% 100%;
          animation: bg-pan 14s linear infinite;
        }
        @keyframes bg-pan {
          0% { background-position: 0% 50%, 100% 50%, 0% 0%; }
          50% { background-position: 100% 50%, 0% 50%, 0% 0%; }
          100% { background-position: 0% 50%, 100% 50%, 0% 0%; }
        }
      `}</style>

      <header className="sticky top-0 z-50 w-full border-b border-[#2b1a0a]/10 header-animated-bg backdrop-blur-[2px]">
        <div className="relative flex h-16 items-center justify-between px-4 md:px-8">
          {/* Brand */}
          <Link
            to="/shop/home"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400/25 rounded-md"
            aria-label="Go to homepage"
            title="Satyasatvik"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-[#080400] to-[#000000] border border-[#6b3d0a]/20 transition-all">
              <img src="/public/logo.png" alt="" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#ffd57a] via-[#ffc280] to-[#ff8a6b] tracking-wide">
              Satyasatvik
            </span>
          </Link>

          {/* Mobile: sheet */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-md bg-transparent hover:bg-transparent transition focus:outline-none focus:ring-2 focus:ring-amber-400/25"
                  aria-label="Open menu"
                  title="Menu"
                >
                  <Menu className="h-6 w-6 text-[#FFD57A]" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full max-w-xs bg-[#080808] text-white border-r border-[#5c3b0b]/20"
              >
                <div className="px-4 py-6">
                  <MenuItems />
                  <div className="mt-6">
                    <HeaderRightContent />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <MenuItems />
          </div>

          {/* Right */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <HeaderRightContent />
          </div>
        </div>
      </header>
    </>
  );
}

export default ShoppingHeader;
