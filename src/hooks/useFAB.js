import { MessageOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function useFAB() {
  return (
    <div className="fab">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 100,
        }}
      >
        {/* <a className="plus-icon" href="https://zalo.me/0975244131" target='_blank'>
          <MessageOutlined
            style={{ fontSize: 30, color: "#fff", width: "100%" }}
          />
        </a> */}

        {process.env.NEXT_PUBLIC_ENV !== 'DUMUC' && (
          <a className="plus-icon" href="https://zalo.me/0975244131" target='_blank'>
            <Image width={0} height={0} sizes="100vw" src="/images/support-zalo.svg" style={{ height: 64 }} alt="Hỗ trợ qua Zalo" />
          </a>
        )}

        {process.env.NEXT_PUBLIC_ENV === 'DUMUC' && (
          <a className="plus-icon" href="https://zalo.me/0357828299" target='_blank'>
            <Image width={0} height={0} sizes="100vw" src="/images/support-zalo.svg" style={{ height: 64 }} alt="Hỗ trợ qua Zalo" />
          </a>
        )}
      </div>
    </div>
  );
}
