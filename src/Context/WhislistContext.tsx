"use client";

import { createContext, useEffect, useState } from "react";
import { getWhislistData } from "@/action/addToWhislist.action";

type WishlistContextType = {
  wishlistCount: number;
  setWishlistCount: React.Dispatch<React.SetStateAction<number>>;
  setWishlistArr: React.Dispatch<React.SetStateAction<string[]>>;
  wishlistArr: string[];
};

type WishlistResponse = {
  status?: string;
  count?: number;
  data?: any[]; // البيانات القادمة عبارة عن مصفوفة أوبجيكتس
};

export const WishlistContext = createContext<WishlistContextType>({
  wishlistCount: 0,
  setWishlistCount: () => {},
  wishlistArr: [],
  setWishlistArr: () => {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [wishlistArr, setWishlistArr] = useState<string[]>([]);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const res = (await getWhislistData()) as WishlistResponse | null;

        if (res?.status === "success" && res.data) {
          setWishlistCount(res.count ?? res.data.length);
          
          const idsOnly = res.data.map((item) => item._id );
          setWishlistArr(idsOnly);
        }
      } catch (error) {
        console.error("Could not load wishlist:", error);
      }
    }

    loadWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlistCount, setWishlistCount, wishlistArr, setWishlistArr }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
