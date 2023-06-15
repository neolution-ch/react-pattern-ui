import { Button, ButtonGroup, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from "reactstrap";

interface PagingProps {
  currentItemsPerPage: number;
  currentPage: number;
  totalRecords: number;
  currentRecordCount: number;
  pagingPossible?: boolean;
  translations: PagingTranslations;
  possiblePageItemCounts?: number[];
  maxPagesShown?: number;
  showControls?: boolean;
  setItemsPerPage(itemsPerPage: number): void;
  setCurrentPage(itemsPerPage: number): void;
}

interface PagingTranslations {
  showedItemsText: string;
  itemsPerPageDropdown: string;
}

function Paging({
  currentItemsPerPage,
  currentPage,
  totalRecords,
  currentRecordCount,
  pagingPossible = true,
  translations,
  possiblePageItemCounts,
  maxPagesShown = 7,
  showControls = true,
  setItemsPerPage,
  setCurrentPage,
}: PagingProps) {
  const maxPage = Math.ceil(totalRecords / currentItemsPerPage);
  const firstPageShown = Math.max(0, Math.min(currentPage - Math.ceil(maxPagesShown / 2), maxPage - maxPagesShown));

  const possibleItemsPerPage = [...(possiblePageItemCounts ?? [25, 50, 100, 200]), currentItemsPerPage]
    .filter((value, index, array) => array.indexOf(value) == index)
    .sort((a, b) => a - b);

  return (
    <Row style={{ marginBottom: "20px" }}>
      <Col xs={6}>
        {pagingPossible && (
          <UncontrolledButtonDropdown>
            <DropdownToggle caret color="link" size="sm">
              {currentItemsPerPage}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{translations.itemsPerPageDropdown}</DropdownItem>
              {possibleItemsPerPage.map((pageItemCount) => (
                <DropdownItem key={`pageItemCount_${pageItemCount}`} onClick={() => setItemsPerPage(pageItemCount)}>
                  {pageItemCount}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        )}
        <span className="small ml-2">
          {translations.showedItemsText
            .replace("{from}", ((currentPage - 1) * currentItemsPerPage + 1).toString())
            .replace("{to}", ((currentPage - 1) * currentItemsPerPage + currentRecordCount).toString())
            .replace("{total}", totalRecords.toString())}
        </span>
      </Col>

      {pagingPossible && currentItemsPerPage < totalRecords && (
        <Col xs={6} style={{ textAlign: "right" }}>
          <ButtonGroup size="sm">
            {showControls && (
              <Button color="secondary" outline disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                {"<<"}
              </Button>
            )}
            {showControls && (
              <Button color="secondary" outline disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                {"<"}
              </Button>
            )}
            {Array.from(Array(maxPage + 1).keys())
              .filter((page) => page > firstPageShown)
              .slice(0, maxPagesShown)
              .map((page) => (
                <Button key={page} outline={currentPage !== page} color="secondary" onClick={() => setCurrentPage(page)}>
                  {page}
                </Button>
              ))}
            {showControls && (
              <Button color="secondary" outline disabled={currentPage === maxPage} onClick={() => setCurrentPage(currentPage + 1)}>
                {">"}
              </Button>
            )}
            {showControls && (
              <Button color="secondary" outline disabled={currentPage === maxPage} onClick={() => setCurrentPage(maxPage)}>
                {">>"}
              </Button>
            )}
          </ButtonGroup>
        </Col>
      )}
    </Row>
  );
}

export { Paging, PagingProps, PagingTranslations };
