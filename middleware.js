import checkCookies from "./app/extra-services/checkCookies";
import { NextResponse } from "next/server";

export default function middleware(context) {
  const Admin = ["/patients", "/doctors", "/add-doctor","/add-patient"];
  const AdminRegx=[/^\/[0-9]+\/add-shift/i,/^\/[0-9]+\/schedule/i,/^\/doctor\/[0-9]+/i,/^\/shift\/[0-9]+/i]
  const Doctor = [];
  const Patient = [];
  const PatientRegex=[/^\/department\/(Dental|Opthalmology|Internal_Medicine|Orthopedic|Analysis|Neurology)/i]
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
    (Admin.some((e) => e === context.nextUrl.pathname)||AdminRegx.some(x=>x.test(context.nextUrl.pathname))) &&
    checkCookies() !== "Adm"
  ) {
    return NextResponse.redirect(new URL("/", context.nextUrl.origin));
  }
  if (
    (Patient.some((e) => e === context.nextUrl.pathname)||PatientRegex.some(e=>e.test(context.nextUrl.pathname))) &&
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
