import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Paging } from "src/Paging/Paging";

describe("Paging", () => {
  test("renders paging correctly", () => {
    const { container } = render(
      <Paging
        currentItemsPerPage={10}
        currentPage={1}
        totalRecords={100}
        currentRecordCount={10}
        translations={{ showedItemsText: "Item {from} to {to} from {total}", itemsPerPageDropdown: "Items per page" }}
        setItemsPerPage={() => console.log("setItemsPerPage")}
        setCurrentPage={() => console.log("setItemsPerPage")}
      />,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="row"
        style="margin-bottom: 20px;"
      >
        <div
          class="col-6"
        >
          <div
            class="btn-group"
          >
            <button
              aria-expanded="false"
              aria-haspopup="true"
              class="dropdown-toggle btn btn-link btn-sm"
              type="button"
            >
              10
            </button>
            <div
              aria-hidden="true"
              class="dropdown-menu"
              role="menu"
              tabindex="-1"
            >
              <h6
                class="dropdown-header"
                tabindex="-1"
              >
                Items per page
              </h6>
              <button
                class="dropdown-item"
                role="menuitem"
                tabindex="0"
                type="button"
              >
                25
              </button>
              <button
                class="dropdown-item"
                role="menuitem"
                tabindex="0"
                type="button"
              >
                50
              </button>
              <button
                class="dropdown-item"
                role="menuitem"
                tabindex="0"
                type="button"
              >
                100
              </button>
              <button
                class="dropdown-item"
                role="menuitem"
                tabindex="0"
                type="button"
              >
                200
              </button>
            </div>
          </div>
          <span
            class="small ml-2"
          >
            Item 1 to 10 from 100
          </span>
        </div>
        <div
          class="col-6"
          style="text-align: right;"
        >
          <div
            class="btn-group-sm btn-group"
            role="group"
          >
            <button
              class="btn btn-outline-secondary disabled"
              disabled=""
              type="button"
            >
              &lt;&lt;
            </button>
            <button
              class="btn btn-outline-secondary disabled"
              disabled=""
              type="button"
            >
              &lt;
            </button>
            <button
              class="btn btn-secondary"
              type="button"
            >
              1
            </button>
            <button
              class="btn btn-outline-secondary"
              type="button"
            >
              2
            </button>
            <button
              class="btn btn-outline-secondary"
              type="button"
            >
              3
            </button>
            <button
              class="btn btn-outline-secondary"
              type="button"
            >
              4
            </button>
            <button
              class="btn btn-outline-secondary"
              type="button"
            >
              5
            </button>
            <button
              class="btn btn-outline-secondary"
              type="button"
            >
              6
            </button>
            <button
              class="btn btn-outline-secondary"
              type="button"
            >
              7
            </button>
            <button
              class="btn btn-outline-secondary"
              type="button"
            >
              &gt;
            </button>
            <button
              class="btn btn-outline-secondary"
              type="button"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    `);
  });

  function setup() {
    const setItemsPerPage = jest.fn();
    const setCurrentPage = jest.fn();

    const utils = render(
      <Paging
        currentItemsPerPage={10}
        currentPage={1}
        totalRecords={100}
        currentRecordCount={10}
        translations={{ showedItemsText: "Item {from} to {to} from {total}", itemsPerPageDropdown: "Items per page" }}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />,
    );

    return { setItemsPerPage, setCurrentPage, ...utils };
  }

  test("choose page", async () => {
    const { setCurrentPage } = setup();
    await waitFor(async () => userEvent.click(await screen.findByText("2")));
    await waitFor(() => expect(setCurrentPage).toHaveBeenCalledWith(2));
  });
});
