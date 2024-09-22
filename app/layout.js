import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapComponent from "./components/BootstrapComponent";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ReduxProvider from "./Redux-Toolkit/ReduxProviderComponent/ReduxProvider";
import RecaptchProvider from "./components/RecaptchProvider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "S.C Hospital",
  description:
    "Find professional doctors or clinc for you ,Book Appointment with the doctor you want",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RecaptchProvider>
          <ReduxProvider>
            <Navbar />
            {children}
          </ReduxProvider>
        </RecaptchProvider>
        <Footer />
        <BootstrapComponent />
      </body>
    </html>
  );
}
