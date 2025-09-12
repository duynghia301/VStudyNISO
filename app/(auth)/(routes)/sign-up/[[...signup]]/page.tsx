import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Đăng ký | VStudy",
  description: "Đồ Án Group 12 Nghĩa",
};
export default function Page() {
  return <SignUp />
}