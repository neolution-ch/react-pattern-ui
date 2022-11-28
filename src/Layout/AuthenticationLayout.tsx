import { PropsWithChildren, ReactNode } from "react";
import "../../styles/Layout/AuthenticationLayout.scss";

interface AuthenticationLayoutProps {
  logo?: ReactNode;
  footer?: ReactNode;
}

export const AuthenticationLayout = (props: PropsWithChildren<AuthenticationLayoutProps>) => {
  const { children, footer, logo } = props;

  return (
    <div className="auth__wrapper">
      <div className="container auth__container">
        <aside className="auth__sidebar-left" />
        <main className="auth__content">
          {logo && <div className="auth__logo mb-4">{logo}</div>}

          <article>{children}</article>
        </main>
        <aside className="auth__sidebar-right" />
        <footer className="auth__footer">{footer}</footer>
      </div>
    </div>
  );
};
