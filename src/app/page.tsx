import { redirect } from "next/navigation";

// 루트는 로그인으로 즉시 이동.
// 컴포넌트 시연 페이지는 /dev로 분리되어 있다.
export default function RootPage() {
  redirect("/login");
}
