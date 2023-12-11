import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function LayOut({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="wrap">{children}</div>
    </>
  );
}
