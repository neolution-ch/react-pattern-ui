import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { DeleteAction } from "src/DeleteAction/DeleteAction";

describe("DeleteAction", () => {
  test("renders button correctly", () => {
    const { container } = render(<DeleteAction onDelete={() => console.log("deleted")} />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <button
        aria-label="Close"
        class="close"
        type="button"
      >
        <svg
          aria-hidden="true"
          class="svg-inline--fa fa-trash "
          data-icon="trash"
          data-prefix="fas"
          focusable="false"
          role="img"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
            fill="currentColor"
          />
        </svg>
      </button>
    `);
  });

  test("renders icon correctly", () => {
    const { container } = render(<DeleteAction iconOnly onDelete={() => console.log("deleted")} />);

    expect(container.firstChild).toMatchInlineSnapshot(`
        <svg
          aria-hidden="true"
          class="svg-inline--fa fa-trash "
          data-icon="trash"
          data-prefix="fas"
          focusable="false"
          role="img"
          style="margin-right: 5px; cursor: pointer;"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
            fill="currentColor"
          />
        </svg>
    `);
  });

  interface DeleteActionProps {
    title?: string;
    text?: string;
    deleteButtonText?: string;
    cancelButtonText?: string;
    iconOnly?: boolean;
  }

  function setup(props: DeleteActionProps) {
    const onDelete = jest.fn();

    const utils = render(<DeleteAction onDelete={onDelete} {...props} />);

    return { onDelete, ...utils };
  }

  test("calls onDelete", async () => {
    const { container, onDelete } = setup({});
    await waitFor(() => userEvent.click(container.querySelector("button") as HTMLElement));
    await waitFor(async () => userEvent.click(await screen.findByText("Delete")));
    await waitFor(() => expect(onDelete).toHaveBeenCalled());
  });

  test("not calls onDelete by cancel", async () => {
    const { container, onDelete } = setup({});
    await waitFor(() => userEvent.click(container.querySelector("button") as HTMLElement));
    await waitFor(async () => userEvent.click(await screen.findByText("Cancel")));
    await waitFor(() => expect(onDelete).not.toHaveBeenCalled());
  });
});
