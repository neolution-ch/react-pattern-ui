import { Paging } from "react-pattern-ui";
import { faker } from "@faker-js/faker";
import { mount } from "cypress/react18";

describe("Paging.cy.tsx", () => {
  it("basic paging works", () => {
    const itemsPerPage = faker.datatype.number({ min: 1, max: 999 });
    const pages = faker.datatype.number({ min: 3, max: 999 });
    const currentPage = faker.datatype.number({ min: 2, max: pages - 1 });
    const translations = { showedItemsText: "Item {from} to {to} from {total}", itemsPerPageDropdown: "Items per page" };

    mount(
      <Paging
        currentItemsPerPage={itemsPerPage}
        currentPage={currentPage}
        currentRecordCount={itemsPerPage}
        setCurrentPage={cy.spy().as("setCurrentPage")}
        totalRecords={pages * itemsPerPage}
        setItemsPerPage={cy.spy().as("setItemsPerPage")}
        translations={translations}
      />,
    );

    // Check pages per item dropdown
    cy.get("[data-cy-root] > .container-fluid > .row > .col-6:first-of-type > .btn-group > button.dropdown-toggle")
      .should("have.text", itemsPerPage.toString())
      .click();
    cy.get("[data-cy-root] > .container-fluid > .row > .col-6:first-of-type > .btn-group > .dropdown-menu > h6").should(
      "have.text",
      translations.itemsPerPageDropdown,
    );
    cy.get("[data-cy-root] > .container-fluid > .row > .col-6:first-of-type > .btn-group > .dropdown-menu > .dropdown-item").then(
      (items: JQuery<HTMLElement>) => {
        expect(items.map((_, item) => item.textContent).toArray(), "possible items per page").to.deep.eq(
          [25, 50, 100, 200, itemsPerPage].sort((a, b) => a - b).map((itemNumber): string => itemNumber.toString()),
        );
        cy.wrap(items.filter((_, item) => item.textContent === "25")).click();
        cy.get("@setItemsPerPage").should("be.calledOnceWith", 25);
      },
    );

    // Check current page/items text
    cy.get("[data-cy-root] > .container-fluid > .row > .col-6:first-of-type > span.small").should(
      "have.text",
      translations.showedItemsText
        .replace("{from}", (currentPage * itemsPerPage - itemsPerPage + 1).toString())
        .replace("{to}", (currentPage * itemsPerPage).toString())
        .replace("{total}", (pages * itemsPerPage).toString()),
    );

    // Check pagination buttons
    cy.get("[data-cy-root] > .container-fluid > .row > .col-6:nth-of-type(2) > .btn-group > button.btn").then(
      (items: JQuery<HTMLElement>) => {
        expect(items.length, "navigation buttons count").to.eq(Math.min(7, pages) + 4);
        cy.wrap(items.filter((_, item) => item.textContent === "<<")).click();
        cy.get("@setCurrentPage").should("be.calledOnceWith", 1);
        cy.wrap(items.filter((_, item) => item.textContent === "<")).click();
        cy.get("@setCurrentPage").should("be.calledWith", currentPage - 1);
        cy.wrap(items.filter((_, item) => item.textContent === (currentPage - 1).toString())).click();
        cy.get("@setCurrentPage").should("be.calledWith", currentPage - 1);
        cy.wrap(items.filter((_, item) => item.textContent === ">")).click();
        cy.get("@setCurrentPage").should("be.calledWith", currentPage + 1);
        cy.wrap(items.filter((_, item) => item.textContent === ">>")).click();
        cy.get("@setCurrentPage").should("be.calledWith", pages);
      },
    );

    // Check pagination class set
    cy.get("[data-cy-root] > .container-fluid").should("have.class", "paging");
  });

  it("paging without change of page size", () => {
    const itemsPerPage = faker.datatype.number({ min: 1, max: 999 });
    const pages = faker.datatype.number({ min: 3, max: 999 });
    const currentPage = faker.datatype.number({ min: 2, max: pages - 1 });
    const translations = { showedItemsText: "Item {from} to {to} from {total}", itemsPerPageDropdown: "Items per page" };

    mount(
      <Paging
        currentItemsPerPage={itemsPerPage}
        currentPage={currentPage}
        currentRecordCount={itemsPerPage}
        setCurrentPage={cy.spy().as("setCurrentPage")}
        totalRecords={pages * itemsPerPage}
        setItemsPerPage={cy.spy().as("setItemsPerPage")}
        translations={translations}
        changePageSizePossible={false}
      />,
    );

    // Check pages per item dropdown is not shown by checking that the first child is the paging from to text
    cy.get("[data-cy-root] > .container-fluid > .row > .col-6:first-of-type")
      .children()
      .first()
      .should(
        "have.text",
        translations.showedItemsText
          .replace("{from}", (currentPage * itemsPerPage - itemsPerPage + 1).toString())
          .replace("{to}", (currentPage * itemsPerPage).toString())
          .replace("{total}", (pages * itemsPerPage).toString()),
      );
  });

  it("custom navigationComponents work correctly", () => {
    const itemsPerPage = 10;
    const pages = 5;
    const currentPage = 3;
    const translations = { showedItemsText: "Item {from} to {to} from {total}", itemsPerPageDropdown: "Items per page" };
    const customNavigationComponents = {
      backPageComponent: "←",
      nextPageComponent: "→",
      firstPageComponent: "⇤",
      lastPageComponent: "⇥",
    };

    mount(
      <Paging
        currentItemsPerPage={itemsPerPage}
        currentPage={currentPage}
        currentRecordCount={itemsPerPage}
        setCurrentPage={cy.spy().as("setCurrentPage")}
        totalRecords={pages * itemsPerPage}
        setItemsPerPage={cy.spy().as("setItemsPerPage")}
        translations={translations}
        navigationComponents={customNavigationComponents}
      />,
    );

    // Check that custom navigation components are rendered
    cy.get("[data-cy-root] > .container-fluid > .row > .col-6:nth-of-type(2) > .btn-group > button.btn").then(
      (items: JQuery<HTMLElement>) => {
        // Verify custom symbols are present
        cy.wrap(items.filter((_, item) => item.textContent === "⇤"))
          .should("exist")
          .and("be.visible");
        cy.wrap(items.filter((_, item) => item.textContent === "←"))
          .should("exist")
          .and("be.visible");
        cy.wrap(items.filter((_, item) => item.textContent === "→"))
          .should("exist")
          .and("be.visible");
        cy.wrap(items.filter((_, item) => item.textContent === "⇥"))
          .should("exist")
          .and("be.visible");

        // Test functionality with custom components
        cy.wrap(items.filter((_, item) => item.textContent === "⇤")).click();
        cy.get("@setCurrentPage").should("be.calledWith", 1);
        cy.wrap(items.filter((_, item) => item.textContent === "←")).click();
        cy.get("@setCurrentPage").should("be.calledWith", currentPage - 1);
        cy.wrap(items.filter((_, item) => item.textContent === "→")).click();
        cy.get("@setCurrentPage").should("be.calledWith", currentPage + 1);
        cy.wrap(items.filter((_, item) => item.textContent === "⇥")).click();
        cy.get("@setCurrentPage").should("be.calledWith", pages);
      },
    );
  });
});
