/* eslint-disable max-lines */
import { Paging } from "react-pattern-ui";
import { faker } from "@faker-js/faker";

describe("Paging.cy.tsx", () => {
  it("basic paging works", () => {
    const itemsPerPage = faker.datatype.number({ min: 1, max: 999 });
    const pages = faker.datatype.number({ min: 3, max: 999 });
    const currentPage = faker.datatype.number({ min: 2, max: pages - 1 });
    const translations = { showedItemsText: "Item {from} to {to} from {total}", itemsPerPageDropdown: "Items per page" };

    cy.mount(
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
    cy.get("[data-cy-root] > .row > .col-6:first-of-type > .btn-group > button.dropdown-toggle")
      .should("have.text", itemsPerPage.toString())
      .click();
    cy.get("[data-cy-root] > .row > .col-6:first-of-type > .btn-group > .dropdown-menu > h6").should(
      "have.text",
      translations.itemsPerPageDropdown,
    );
    cy.get("[data-cy-root] > .row > .col-6:first-of-type > .btn-group > .dropdown-menu > .dropdown-item").then(
      (items: JQuery<HTMLElement>) => {
        expect(items.map((_, item) => item.innerText).toArray(), "possible items per page").to.deep.eq(
          [25, 50, 100, 200, itemsPerPage].sort((a, b) => a - b).map((itemNumber): string => itemNumber.toString()),
        );
        cy.wrap(items.filter((_, item) => item.innerText === "25")).click();
        cy.get("@setItemsPerPage").should("be.calledOnceWith", 25);
      },
    );

    // Check current page/items text
    cy.get("[data-cy-root] > .row > .col-6:first-of-type > span.small").should(
      "have.text",
      translations.showedItemsText
        .replace("{from}", (currentPage * itemsPerPage - itemsPerPage + 1).toString())
        .replace("{to}", (currentPage * itemsPerPage).toString())
        .replace("{total}", (pages * itemsPerPage).toString()),
    );

    // Check pagination buttons
    cy.get("[data-cy-root] > .row > .col-6:nth-of-type(2) > .btn-group > button.btn").then((items: JQuery<HTMLElement>) => {
      expect(items.length, "navigation buttons count").to.eq(Math.min(7, pages) + 4);
      cy.wrap(items.filter((_, item) => item.innerText === "<<")).click();
      cy.get("@setCurrentPage").should("be.calledOnceWith", 1);
      cy.wrap(items.filter((_, item) => item.innerText === "<")).click();
      cy.get("@setCurrentPage").should("be.calledWith", currentPage - 1);
      cy.wrap(items.filter((_, item) => item.innerText === (currentPage - 1).toString())).click();
      cy.get("@setCurrentPage").should("be.calledWith", currentPage - 1);
      cy.wrap(items.filter((_, item) => item.innerText === ">")).click();
      cy.get("@setCurrentPage").should("be.calledWith", currentPage + 1);
      cy.wrap(items.filter((_, item) => item.innerText === ">>")).click();
      cy.get("@setCurrentPage").should("be.calledWith", pages);
    });
  });
});
