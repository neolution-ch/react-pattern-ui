import { PropsWithChildren, ReactNode } from "react";
import "../../styles/Layout/LoginLayout.scss";

interface LoginLayoutProps {
  logo?: ReactNode;
  footer?: ReactNode;
}

export const LoginLayout = (props: PropsWithChildren<LoginLayoutProps>) => {
  const { children, footer, logo } = props;

  return (
    <div className="login__wrapper">
      <div className="container login__container">
        <aside className="login__sidebar-left" />
        <main className="login__content">
          {logo && <div className="login__logo mb-4">{logo}</div>}

          <article>{children}</article>
        </main>
        <aside className="login__sidebar-right" />
        <footer className="login__footer">{footer}</footer>
      </div>
    </div>
  );
};
