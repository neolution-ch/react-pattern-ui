import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import "../../../styles/Layout/AuthenticationLayout.scss";

interface AuthenticationLayoutProps {
  className?: string;
  footer?: ReactNode;
  logo?: ReactNode;
}

const AuthenticationLayout = (props: PropsWithChildren<AuthenticationLayoutProps>) => {
  const { children, className, footer, logo } = props;

  return (
    <div className={classNames("auth__wrapper", className)}>
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

export { AuthenticationLayout, AuthenticationLayoutProps };
