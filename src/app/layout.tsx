import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Providers from "@/components/Providers/Providers";
import { Toaster } from "sonner";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { verifyToken } from "@/features/auth/server/auth.actions";
import { getCartItems } from "@/features/cart/server/cart.action";
import {
  cartInitialValues,
  CartValuesTypes,
} from "@/features/cart/slices/cart.slice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const authStates = await verifyToken();

  let cartValues: CartValuesTypes = cartInitialValues;

  if (authStates.isAuthenticated === true) {
    const cartResponse = await getCartItems();

    if (cartResponse.status === "success") {
      cartValues = {
        status: cartResponse.status,
        message: cartResponse.message,
        numOfCartItems: cartResponse.numOfCartItems,
        cartId: cartResponse.cartId,
        data: {
          products: cartResponse.data.products,
          totalCartPrice: cartResponse.data.totalCartPrice,
        },
      };
    }
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers
          preloadedState={{ authReducer: authStates, cartReducer: cartValues }}
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}