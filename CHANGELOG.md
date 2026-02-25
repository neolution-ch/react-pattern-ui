# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### dependabot: \#77 Bump the github-actions group across 1 directory with 4 updates

## [6.0.0] - 2026-02-24

### Changed

- updated most of of the dependencies
- :boom: changed to own reactstrap fork with react 19 support

## [5.3.1] - 2026-02-04

### Fixed

- instant scrolling to top on active `PanelSideBarItem`; scrolling smoothing to center instead.

## [5.3.0] - 2025-09-30

### Fix

- paging when displayed inside a form.

### Added

- possibility to customize back/next first/last page navigation components.

### Removed

- remove cypress declarations

## [5.2.0] - 2025-06-23

### Added

- Possibility to render the whole PanelSidebarLayout hiding completely the SidebarNav.
- Export for `PanelSidebarNavbar` component. It can be used to render only the Navbar without need of context.

## [5.1.0] - 2025-06-11

### Changed

- migrated to eslint 9 with the neolution eslint config

## [5.0.0] - 2025-03-04

### dependabot: \#68 Bump the github-actions group with 5 updates

### Removed

- :boom: The property `mainContentBodyRef` from `PanelSideBarLayout`.

### Added

- The ref `mainContentBodyRef` exposed to through the context to be used to control the main content body behaviour (e.g. scroll to top on page change).

## [4.3.0] - 2024-10-23

### Added

- Added the pkg.pr.new workflow.
- `onSidebarCollapseOptions` to customize the panel item behavior on sidebar collapsing: keep showing icons enabling `showIcon`, use a fallback icon setting `fallbackIcon`. It works:
  - whether tiles are rendered via `renderFirstItemsLevelAsTiles`
  - the panel item has any `children`

## [4.2.0] - 2024-10-08

### Added

- Expose `mainContentBodyRef` in order to control main body behaviour (e.g. scroll to top on page change)

## [4.1.1] - 2024-07-18

### Fixed

- Fixed hide feature for tiles menu items

## [4.1.0] - 2024-05-27

### Added

- various utility functions `getPreExpandedMenuItems`, `getChildrenPanelItemsIds`, `getHiddenPanelIds`
- possibility to dynamic display the menu items
- improved Context status management so that the Layout is using only the states inside it

### Fixed

- issue for which hiding a menu entry was breaking the rules of hook

## [4.0.0] - 2024-05-14

### Added

- Possibility to dinamically open or close `sidebar`
- Possibility to dinamically toggle `menu items`
- Added support for `light`, `dark` and `blue` theme in PanelSideBarLayout.

### Changed

- `menuItems properties` are not locked by any states during the render process anymore. Changing externally the menu items will provide the correct menu
- :boom: `topBarLeftCustomItems` and `topBarRigthCustomItems` renamed to `navbarLeftItems` and `navbarRightItems`
- `navbarLeftItems` and `navbarRightItems` have not default margin by default
- default sidebar `width` to `16rem`
- :boom: `UI elements` are now parameter of `SidebarLayout` and not of the context anymore
- PanelItem Id type changed from `string` to being strongly typed

### Fixed

- When `footer` is null, the whole section will not be rendered
- Unique key prop in a list warning
- menu items provided with `expanded` to true are correctly displayed in `PanelSideBarLayout`
- Active panel is now recognized recursively and not until the third deep level anymore

### Removed

- :boom: `DeleteAction` component.
- :boom: Built-in support for `userDropdown`. It should provided in the `navbarRightItems` items and define your style in your solution.
- :boom: `localItems` property as menuItems can be fully controlled by the consumer.
- :boom: removed `PanelSideBar` component and its relative contexts and should be replaced with `PanelSideBarLayout`. In order to migrate:
  - assign `items` to `menuItems` in the `PanelSideBarProvider`
  - set `renderFirstItemsLevelAsTiles` to false
  - set `useToggleButton` in `PanelSideBarLayout` to true
  - set `useResponsiveLayout` in `PanelSideBarLayout` to true
  - move `brand` to `PanelSideBarLayout`
  - move `footer` to `PanelSideBarLayout`

## [3.4.0] - 2024-03-12

### Added

- Possibility to define, if the page size in the paging can be changed by the user

## [3.3.0] - 2024-03-08

### Added

- Possibility to decide if render first nesting level of menuItems as tiles (default) or not
- Possibility to render tiles as button(default) or as links
- Possibility to define a default active panel used if no active panel is found dynamically

## [3.2.1] - 2024-02-01

### Fixed

- Selection of active panel when `active` is provided to main navigation items.

## [3.2.0] - 2024-01-24

### Added

- Sidebar overflow and automatic scroll to active item with `scrollIntoView`

## [3.1.1] - 2024-01-09

### Fixed

- the space between title and arrow in case of `collapsedIconOnly` menuItem.

## [3.1.0] - 2023-11-14

### Removed

- unsupported `dark`-theme

## [3.0.0] - 2023-11-08

### Added

- `PanelSidebar` is new sidebar with custom side panels and a new `PanelSideBarLayoutContext`
- `collapseIconOnly` to `PanelItem` in order to collapse `PanelSideBarItem` only by clicking on chevron icon and label can work as link

### Removed

- :boom: `DateHandler` utils as it belongs to another package and will be replaced in the future

## [2.10.0] - 2023-10-20

### Added

- `paging` class to `Paging` in order to customize pagination

## [2.9.0] - 2023-10-02

### Fixed

- Fixed row size and overflow behaviour for Paging component so that it does not always show a horizontal scrollbar regardless of the available width
- The paging text will now occupy the whole row in case there are no page buttons to be rendered

## [2.8.1] - 2023-09-19

### Fixed

- the `DeleteAction` component now correctly displays the delete button, and supports custom text.

## [2.8.0] - 2023-09-05

### Fixed

- the sidebar now only keeps minimal state of opened menu items instead of all of the items. This fixes a problem where the sidebar would not be re-rendered if the currently active item changed.

## [2.7.0] - 2023-08-29

### Fixed

- Removed sidebar drop shadow on screens where it's closed by default (small/medium size screens) in order to avoid having a shadow visible to the left of the screen even when the menu is closed on mobile/tablet
- Fixed a problem where menu-open would be added to menu items without children
- Menu styling is now using different colors for hovering and normal state
- Indentation of menu items is now using classes. This lets the user overwrite the indentation with custom styles when required

### Added

- Added an option to provide additional classes to a menu item
- Added an option to set the "active" class on menu items from the outside

## [2.6.0] - 2023-08-16

### Added

- Added an option to enable the light theme. It can be provided explicitly every time when using the `SideBarMenu` component, or as a default in a SideBarLayoutProvider

## [2.5.0] - 2023-08-08

### Added

- Added `styles.css` to the export in the package.json

## [2.4.0] - 2023-08-04

### Added

- Added support to "react" version "^18.0.0" in peerDependencies
- Added support to "react-dom" version "^18.0.0" in peerDependencies
- Added support to "reactstrap" version "^9.0.0" in peerDependencies
- Added support to "@fortawesome/react-fontawesome" version "^0.2.0" in peerDependencies

### Fixed

- Fixed export for CommonJS

## [2.3.0] - 2023-07-28

### Fixed

- `predefinedItemsPerPage` remain now always visible

### Changed

- Changed from `microbundle` to `rollup` for building the package
- Updated some dependencies to the latest possible version
- Changed from `jest` to `cypress`

## [2.2.1] - 2023-06-15

### Fixed

- CurrentItemPerPage in pagination logic and avoid duplicates

## [2.2.0] - 2023-06-14

### Added

- possibility to display CurrentItemPerPage in Pagination dropdown and to be re-selected after one change

## [2.1.1] - 2022-12-09

- Added styling for button groups

## [2.1.0] - 2022-12-01

### Added

- Added new layout components: `AuthenticationLayout`, `SideBarLayout`

### Changed

- Adjusted exports to be more consistent

## [2.0.2] - 2022-04-14

### Fixed

- Fix added for missing react import aftger microbundling

## [2.0.1] - 2022-04-12

### Fixed

- Package doesn't use 'h()' anymore, replaced with 'React.createElement' instead

## [2.0.0] - 2022-04-07

### Added

- created package :tada:
- added tests

[Unreleased]: https://github.com/neolution-ch/react-pattern-ui/compare/6.0.0...HEAD
[2.1.1]: https://github.com/neolution-ch/react-pattern-ui/compare/2.1.0...2.1.1
[2.1.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.0.2...2.1.0
[2.0.2]: https://github.com/neolution-ch/react-pattern-ui/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/neolution-ch/react-pattern-ui/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/neolution-ch/react-pattern-ui/compare/45cbeb76034667019da84605082679900f506d75...2.0.0
[6.0.0]: https://github.com/neolution-ch/react-pattern-ui/compare/5.3.1...6.0.0
[5.3.1]: https://github.com/neolution-ch/react-pattern-ui/compare/5.3.0...5.3.1
[5.3.0]: https://github.com/neolution-ch/react-pattern-ui/compare/5.2.0...5.3.0
[5.2.0]: https://github.com/neolution-ch/react-pattern-ui/compare/5.1.0...5.2.0
[5.1.0]: https://github.com/neolution-ch/react-pattern-ui/compare/5.0.0...5.1.0
[5.0.0]: https://github.com/neolution-ch/react-pattern-ui/compare/4.3.0...5.0.0
[4.3.0]: https://github.com/neolution-ch/react-pattern-ui/compare/4.2.0...4.3.0
[4.2.0]: https://github.com/neolution-ch/react-pattern-ui/compare/4.1.1...4.2.0
[4.1.1]: https://github.com/neolution-ch/react-pattern-ui/compare/4.1.0...4.1.1
[4.1.0]: https://github.com/neolution-ch/react-pattern-ui/compare/4.0.0...4.1.0
[4.0.0]: https://github.com/neolution-ch/react-pattern-ui/compare/3.4.0...4.0.0
[3.4.0]: https://github.com/neolution-ch/react-pattern-ui/compare/3.3.0...3.4.0
[3.3.0]: https://github.com/neolution-ch/react-pattern-ui/compare/3.2.1...3.3.0
[3.2.1]: https://github.com/neolution-ch/react-pattern-ui/compare/3.2.0...3.2.1
[3.2.0]: https://github.com/neolution-ch/react-pattern-ui/compare/3.1.1...3.2.0
[3.1.1]: https://github.com/neolution-ch/react-pattern-ui/compare/3.1.0...3.1.1
[3.1.0]: https://github.com/neolution-ch/react-pattern-ui/compare/3.0.0...3.1.0
[3.0.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.10.0...3.0.0
[2.10.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.9.0...2.10.0
[2.9.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.8.1...2.9.0
[2.8.1]: https://github.com/neolution-ch/react-pattern-ui/compare/2.8.0...2.8.1
[2.8.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.7.0...2.8.0
[2.7.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.6.0...2.7.0
[2.6.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.5.0...2.6.0
[2.5.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.4.0...2.5.0
[2.4.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.3.0...2.4.0
[2.3.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.2.1...2.3.0
[2.2.1]: https://github.com/neolution-ch/react-pattern-ui/compare/2.2.0...2.2.1
[2.2.0]: https://github.com/neolution-ch/react-pattern-ui/releases/tag/2.2.0
