import React from "react";
import {PanelSideBarLayoutProvider, PanelSideBarProvider, PanelSideBarLayout, PanelItem} from "react-pattern-ui";

type CustomPanelItem<TLocalPanelIds = ""> = {
    id: "home" | "settings" | TLocalPanelIds;
};

type TSideBarMenuItem<TLocalPanelIds = ""> = PanelItem<CustomPanelItem<TLocalPanelIds>>;

describe("PanelSidebar.cy.tsx", () => {
    it("flat menu entry", () => {
        const items: TSideBarMenuItem[]  = [
            {
                id: "home",
                title: "Home",
                icon: "bars",
                items: [
                    {
                        title: "Home",
                        id: "home",
                    }
                ],
            },
            {
                id: "settings",
                title: "Settings",
                icon: "cogs",
                items: [
                    {
                        title: "Settings",
                        id: "settings",
                    }
                ],
            }
        ];

        cy.mount(
            <PanelSideBarLayoutProvider>
                <PanelSideBarProvider globalItems={items} LinkRenderer={(elem) =>
                    <div onClick={() => document.getElementById("pageContent")!.innerText = elem.item.id } id={elem.item.id}>
                        <>
                            {elem.item.title}
                        </>
                    </div>}>
                    <PanelSideBarLayout>
                        <div id="pageContent">
                            Cypress
                        </div>
                    </PanelSideBarLayout>
                </PanelSideBarProvider>
            </PanelSideBarLayoutProvider>
        );

        cy.get("#home").click();
        cy.get("#pageContent").invoke("text").should("equal", "home");
        cy.get("button[title=Settings]").click();
        cy.get("#settings").click();
        cy.get("#pageContent").invoke("text").should("equal", "settings");
    });
});
