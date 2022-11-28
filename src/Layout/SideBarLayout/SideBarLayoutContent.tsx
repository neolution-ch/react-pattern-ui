import { FC, PropsWithChildren } from "react";

const SideBarLayoutContent: FC<PropsWithChildren> = ({ children }) => (
  <div id="layoutSidenav_content">
    <main>
      <div className="container-fluid px-4">{children}</div>
    </main>
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright © Your Website 2022</div>
          <div>
            <a href="#">Privacy Policy</a>·<a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export { SideBarLayoutContent };
