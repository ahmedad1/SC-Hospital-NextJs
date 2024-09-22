import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapComponent from "./components/BootstrapComponent";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ReduxProvider from "./Redux-Toolkit/ReduxProviderComponent/ReduxProvider";
import RecaptchProvider from "./components/RecaptchProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
      <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleOAuthProvider clientId="600346872733-fb3driupuhka65aoenlv2ssh88pp5nui.apps.googleusercontent.com">
          <RecaptchProvider>
            <ReduxProvider>
              <Navbar />
              {children}
            </ReduxProvider>
          </RecaptchProvider>
        </GoogleOAuthProvider>
        <Footer />
        <BootstrapComponent />
      </body>
    </html>
  );
}
