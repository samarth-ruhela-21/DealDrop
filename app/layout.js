import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Deal Drop",
  description: "Price Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors />
        </body>
    </html>
  );
}
