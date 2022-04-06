import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DeleteAction } from "../../dist/index";

describe("DeleteAction", () => {
    test("renders correctly", () => {
        const {container} = render(
            <DeleteAction onDelete={() => console.log("deleted");}/>
        );

        expect(container.firstChild).toMatchInlineSnapshot(`
            <Button color="danger" close onClick={toggle}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        `);
    });
});