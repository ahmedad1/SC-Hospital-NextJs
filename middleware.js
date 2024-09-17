import checkCookies from "./app/extra-services/checkCookies";
import { NextResponse } from "next/server";

export default function middleware(context) {
  const Admin = ["/patients", "/doctors", "/add-doctor","/add-patient"];
  const Doctor = [];
  const Patient = [];
  const SharedAuth = ["/profile-settings"];
  const UnAuth = ["/email-confirmation"];

  if (
    SharedAuth.some((e) => e === context.nextUrl.pathname) &&
    !checkCookies()
  ) {
    return NextResponse.redirect(new URL("/", context.nextUrl.origin));
  }
  if (context.nextUrl.pathname === "/" && checkCookies() === "Adm") {
    return NextResponse.redirect(new URL("/patients", context.nextUrl.origin));
  }
  if (UnAuth.some((e) => e === context.nextUrl.pathname) && checkCookies()) {
    return NextResponse.redirect(new URL("/", context.nextUrl.origin));
  }
  if (
    Admin.some((e) => e === context.nextUrl.pathname) &&
    checkCookies() !== "Adm"
  ) {
    return NextResponse.redirect(new URL("/", context.nextUrl.origin));
  }
  if (
    Patient.some((e) => e === context.nextUrl.pathname) &&
    checkCookies() !== "Pat"
  ) {
    return NextResponse.redirect(new URL("/", context.nextUrl.origin));
  }
  if (
    Doctor.some((e) => e === context.nextUrl.pathname) &&
    checkCookies() !== "Doc"
  ) {
    return NextResponse.redirect(new URL("/", context.nextUrl.origin));
  }

  return NextResponse.next();
}
