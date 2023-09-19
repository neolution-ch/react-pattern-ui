/* eslint-disable max-lines */
import { DeleteAction } from "react-pattern-ui";
import { faker } from "@faker-js/faker";

describe("DeleteAction.cy.tsx", () => {
  it("delete action works", () => {
    const buttonText = faker.random.word();
    const deleteButtonText = faker.random.word();
    const cancelButtonText = faker.random.word();
    const text = faker.random.words(10);
    const title = faker.random.words(3);

    cy.mount(
      <DeleteAction
        onDelete={cy.spy().as("onDelete")}
        buttonText={buttonText}
        deleteButtonText={deleteButtonText}
        cancelButtonText={cancelButtonText}
        text={text}
        title={title}
      />,
    );

    // Check if correct default icon and text are drawn, open dialog, check title and press close icon
    cy.get("[data-cy-root]").parents("body").get(".btn-danger").should("have.text", buttonText);
    cy.get("[data-cy-root] svg").should("have.class", "fa-trash").click();
    cy.get("[data-cy-root]").parents("body").get(".modal-dialog .modal-header h5").should("have.text", title);
    cy.get("[data-cy-root]").parents("body").get(".modal-dialog .modal-header button.btn-close").click();
    cy.get("@onDelete").should("not.be.calledOn");
    cy.get("[data-cy-root]").parents("body").get(".modal-dialog").should("not.exist");

    // Open dialog, check text, cancel button and press cancel button
    cy.get("[data-cy-root] svg").should("have.class", "fa-trash").click();
    cy.get("[data-cy-root]").parents("body").get(".modal-dialog .modal-body").should("have.text", text);
    cy.get("[data-cy-root]")
      .parents("body")
      .get(".modal-dialog .modal-footer .btn-secondary")
      .should("have.text", cancelButtonText)
      .click();
    cy.get("@onDelete").should("not.be.calledOn");
    cy.get("[data-cy-root]").parents("body").get(".modal-dialog").should("not.exist");

    // Open dialog, check delete button and press delete button
    cy.get("[data-cy-root] svg").should("have.class", "fa-trash").click();
    cy.get("[data-cy-root]").parents("body").get(".modal-dialog .modal-footer .btn-danger").should("have.text", deleteButtonText).click();
    cy.get("@onDelete").should("be.calledOnce");
  });
});
