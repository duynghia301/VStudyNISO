import { SignIn } from '@clerk/nextjs'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Đăng Nhập | VStudy",
  description: "Đồ Án Group 12 Nghĩa, Sơn",
};
export default function Page() {
  return <SignIn/>
}