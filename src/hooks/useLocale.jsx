import { useRouter } from "next/router";
import en from "@locales/en";
import vn from "@locales/vn";

export default function useLocale() {
  const router = useRouter();
  const { locale } = router;

  switch (locale) {
    case "en":
      return { t: en, locale };
    case "vn":
      return { t: vn, locale };
    default:
      return { t: vn, locale };
  }
}
