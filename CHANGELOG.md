# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `PanelSidebar` is new sidebar with custom side panels and a new `PanelSideBarLayoutContext`, also for older sidebar
- `collapseIconOnly` to `PanelItem` in order to collapse `PanelSideBarItem` only by clicking on chevron icon and label can work as link

### Removed

- `DateHandler` utils as it belongs to another package and will be replaced in the future

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

[unreleased]: https://github.com/neolution-ch/react-pattern-ui/compare/2.10.0...HEAD
[2.1.1]: https://github.com/neolution-ch/react-pattern-ui/compare/2.1.0...2.1.1
[2.1.0]: https://github.com/neolution-ch/react-pattern-ui/compare/2.0.2...2.1.0
[2.0.2]: https://github.com/neolution-ch/react-pattern-ui/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/neolution-ch/react-pattern-ui/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/neolution-ch/react-pattern-ui/compare/45cbeb76034667019da84605082679900f506d75...2.0.0
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
