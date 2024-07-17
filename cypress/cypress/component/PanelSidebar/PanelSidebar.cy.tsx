import React, { PropsWithChildren, ReactNode } from "react";
import { PanelSideBarProvider, PanelSideBarLayout, PanelItem, PanelLinkRendererProps, usePanelSideBarContext } from "react-pattern-ui";
import { faBars, faCogs } from "@fortawesome/free-solid-svg-icons";

type AppRoutes = "home" | "settings" | "dropdownTest" | "dropdown-test1" | "dropdown-test2";
type TSideBarMenuItem = PanelItem<AppRoutes>;

// Configuration object for avoiding duplicated code
interface PanelSideBarConfiguration extends PropsWithChildren {
  renderFirstItemsLevelAsTiles?: boolean;
  useToggleButton?: boolean;
}

const getPanelSidebarInternal = (items: TSideBarMenuItem[], config?: PanelSideBarConfiguration) => {
  const { renderFirstItemsLevelAsTiles = true, useToggleButton = false, children } = config ?? {};
  return (
    <PanelSideBarProvider
      menuItems={items}
      renderFirstItemsLevelAsTiles={renderFirstItemsLevelAsTiles}
      LinkRenderer={(elem: PanelLinkRendererProps<AppRoutes, Record<string, unknown>>) => (
        <div
          id={elem.item.id}
          onClick={() => {
            const pageContent = document.getElementById("pageContent");
            if (pageContent) {
              pageContent.innerText = elem.item.id;
            }
          }}
        >
          <>{elem.item.title}</>
        </div>
      )}
    >
      <PanelSideBarLayout useToggleButton={useToggleButton}>
        <div id="pageContent">{children ?? "Cypress"}</div>
      </PanelSideBarLayout>
    </PanelSideBarProvider>
  );
};

const getSidebarItems = (active?: boolean, disabled?: boolean, expanded?: boolean): TSideBarMenuItem[] => [
  {
    id: "home",
    title: "Home",
    icon: faBars,
    disabled,
    display: true,
    children: [
      {
        title: "Home",
        id: "home",
        active,
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: faCogs,
    disabled,
    display: true,
    children: [
      {
        title: "Settings",
        id: "settings",
      },
      {
        title: "Dropdown",
        id: "dropdownTest",
        expanded,
        children: [
          {
            title: "Dropdown test 1",
            id: "dropdown-test1",
          },
          {
            title: "Dropdown test 2",
            id: "dropdown-test2",
            active,
          },
        ],
      },
    ],
  },
];

interface PanelSideBarProps extends PropsWithChildren {
  active?: boolean;
  disabled?: boolean;
  expanded?: boolean;
}

const PanelSideBarWithTiles = (props: PanelSideBarProps) => {
  const { active, disabled, expanded, children } = props;
  return getPanelSidebarInternal(getSidebarItems(active, disabled, expanded), { children });
};

const PanelSideBarNoTiles = (props: PanelSideBarProps) => {
  const { active, disabled } = props;
  return getPanelSidebarInternal(getSidebarItems(active, disabled), { renderFirstItemsLevelAsTiles: false, useToggleButton: true });
};

describe("PanelSidebar.cy.tsx", () => {
  it("icon and titles rendered correctly", () => {
    cy.mount(<PanelSideBarWithTiles />);

    // Check if icon are rendered
    cy.get('[data-icon="bars"]').should("be.visible");
    cy.get('[data-icon="gears"]').should("be.visible");

    // Check if is titles are rendered
    cy.get("#home").invoke("text").should("equal", "Home");
    cy.get("button[title=Settings]").click();
    cy.get("#settings").invoke("text").should("equal", "Settings");
  });

  it("flat menu entry", () => {
    cy.mount(<PanelSideBarWithTiles />);

    // Check page content changes
    cy.get("#home").click();
    cy.get("#pageContent").invoke("text").should("equal", "home");
    cy.get("button[title=Settings]").click();
    cy.get("#settings").click();
    cy.get("#pageContent").invoke("text").should("equal", "settings");
  });

  it("nested menu entries", () => {
    cy.mount(<PanelSideBarWithTiles />);

    // Check page content changes
    cy.get("button[title=Settings]").click();
    cy.get("#settings").click();
    cy.get(".dropdown-toggle").click();
    cy.get("#dropdown-test1").click();
    cy.get("#pageContent").invoke("text").should("equal", "dropdown-test1");
    cy.get("#dropdown-test2").click();
    cy.get("#pageContent").invoke("text").should("equal", "dropdown-test2");
  });

  it("disabled entries", () => {
    cy.mount(<PanelSideBarWithTiles disabled />);

    // Check are disabled and page content not doesn't change
    cy.get("button[title=Home]").should("have.attr", "disabled");
    cy.get("button[title=Home]").click({ force: true });
    cy.get("#pageContent").invoke("text").should("equal", "Cypress");
    cy.get("button[title=Settings]").should("have.attr", "disabled");
    cy.get("button[title=Settings]").click({ force: true });
    cy.get("#pageContent").invoke("text").should("equal", "Cypress");
  });

  it("toggle sidebar", () => {
    cy.mount(<PanelSideBarWithTiles />);

    // Check toggle sidebar
    cy.get('[data-icon="angle-left"]').should("be.visible");
    cy.get("#side-nav-toggle").click();
    cy.get('[data-icon="angle-right"]').should("be.visible");
    cy.get(".toggled").should("exist");
    cy.get(".side-nav__items").should("not.be.visible");
  });

  it("selected flat entry", () => {
    cy.mount(<PanelSideBarWithTiles active />);

    // Check active entries
    cy.get("#home").parent("div").parent("li").should("have.class", "active");
  });

  it("render correctly menu without tiles", () => {
    cy.mount(<PanelSideBarNoTiles />);
    cy.get("#main-section").should("have.class", "section-no-tiles");
    cy.get(".side.nav__tiles").should("not.exist");
  });

  it("render correctly toggle button", () => {
    cy.mount(<PanelSideBarNoTiles />);
    cy.get("#sidebar-toggle").click();
    cy.get("#side-nav").should("have.css", "width", "0px");
  });

  it("check dropdown correctly pre-expanded", () => {
    cy.mount(<PanelSideBarWithTiles expanded />);
    cy.get("button[title=Settings]").click();
    cy.get("#dropdown-test1").should("be.visible");
    cy.get("#dropdown-test2").should("be.visible");
  });

  it("dynamically toggle menu item", () => {
    const Button = () => {
      const { toggleMenuItem } = usePanelSideBarContext();
      return (
        <button id="test-toggle" onClick={() => toggleMenuItem("dropdownTest")}>
          Toggle
        </button>
      );
    };

    cy.mount(<PanelSideBarWithTiles expanded children={<Button />} />);
    cy.get("button[title=Settings]").click();
    cy.get("li:has(.dropdown-toggle)").should("be.visible").should("have.class", "menu-open");
    cy.get("#test-toggle").click();
    cy.get("li:has(.dropdown-toggle)").should("be.visible").should("not.have.class", "menu-open");
    cy.get("#test-toggle").click();
    cy.get("li:has(.dropdown-toggle)").should("be.visible").should("have.class", "menu-open");
  });

  it("dynamically hide menu items", () => {
    const Button = () => {
      const { setHiddenMenuItemsIds } = usePanelSideBarContext();
      return (
        <button id="test-hide" onClick={() => setHiddenMenuItemsIds(["dropdown-test1", "dropdown-test2"])}>
          Hide
        </button>
      );
    };

    cy.mount(<PanelSideBarWithTiles expanded children={<Button />} />);
    cy.get("button[title=Settings]").click();
    cy.get("#dropdown-test1").should("be.visible");
    cy.get("#dropdown-test2").should("be.visible");
    cy.get("#test-hide").click();
    cy.get("#dropdown-test1").should("not.be.visible");
    cy.get("#dropdown-test2").should("not.be.visible");
  });

  it("dynamically open and close menu item", () => {
    const Button = () => {
      const { openMenuItems, closeMenuItems } = usePanelSideBarContext();
      return (
        <>
          <button id="test-open-item" onClick={() => openMenuItems(["dropdownTest"])}>
            Open
          </button>
          <button id="test-close-item" onClick={() => closeMenuItems(["dropdownTest"])}>
            Close
          </button>
        </>
      );
    };

    cy.mount(<PanelSideBarWithTiles children={<Button />} />);
    cy.get("button[title=Settings]").click();
    cy.get("li:has(.dropdown-toggle)").should("be.visible").should("not.have.class", "menu-open");
    cy.get("#test-open-item").click();
    cy.get("li:has(.dropdown-toggle)").should("be.visible").should("have.class", "menu-open");
    cy.get("#test-close-item").click();
    cy.get("li:has(.dropdown-toggle)").should("be.visible").should("not.have.class", "menu-open");
  });
});
