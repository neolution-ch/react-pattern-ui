import { useQuery } from "react-query";
import { PanelItem } from "./Definitions/PanelItem";
import { LoadingSkeleton } from "src/Skeleton/LoadingSkeleton";
import { PanelSideBarItem, PanelSideBarItemProps } from "./PanelSideBarItem";

interface LazyLoadingSideBarItemProps extends Omit<PanelSideBarItemProps, "children"> {
  queryKey: string;
  query: Promise<PanelItem<unknown>>;
  active?: boolean;
}
const LazyLoadingSideBarItem = (props: LazyLoadingSideBarItemProps) => {
  const { depth = 0, query, LinkRenderer, onClick, toggledItemIds = [], toggledSidebar, queryKey, active } = props;
  const { data, isLoading, isSuccess } = useQuery(queryKey, () => query, { refetchOnWindowFocus: false, refetchOnReconnect: false });

  return (
    <LoadingSkeleton isLoading={isLoading} isSuccess={isLoading || isSuccess}>
      {data && (
        <PanelSideBarItem
          key={data.id}
          children={data}
          LinkRenderer={LinkRenderer}
          onClick={() => onClick && onClick(data)}
          depth={depth + 1}
          active={active}
          toggledItemIds={toggledItemIds}
          toggledSidebar={toggledSidebar}
        />
      )}
    </LoadingSkeleton>
  );
};

export { LazyLoadingSideBarItem };
