
import { ReCaptchaProvider } from "next-recaptcha-v3"

export default function RecaptchProvider({children}) {
  return (
    <ReCaptchaProvider reCaptchaKey="6Leu2UsqAAAAAO5sAkvg5oro3ysC5SecKLgV1QCB">
        {children}
    </ReCaptchaProvider>

  )
}
