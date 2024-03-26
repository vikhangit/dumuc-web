import Script from 'next/script'
import { Inter, Mulish, Saira_Stencil_One } from 'next/font/google'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import './layout.css'
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "@smastrom/react-rating/style.css";
const inter = Inter({subsets: ['latin']})
const saira = Saira_Stencil_One({ subsets: ['latin'], weight: ["400"], variable: "--font-saira_stencil_one" })
export const metadata = {
  title: 'Đồng hành vạn dặm | DuMuc.me',
  description: 'Cung cấp các sản phẩm vỏ lốp xe Kumho chính hãng cho nhiều dòng xe khác nhau.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={saira.className}>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js" />
        <Script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0.13/dist/fancybox/fancybox.umd.js" />
        <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>
        {children}
      </body>
      <Script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly"
      defer
    ></Script>
    </html>
  );
}
