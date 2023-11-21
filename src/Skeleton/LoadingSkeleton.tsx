import { PropsWithChildren } from "react";
import Skeleton from "react-loading-skeleton";

interface LoadingSkeletonProps extends PropsWithChildren {
  isSuccess?: boolean;
  isLoading: boolean;
  height?: number;
  rows?: number;
  cols?: number;
  gutterX?: number;
  gutterY?: number;
}

const LoadingSkeleton = (props: LoadingSkeletonProps) => {
  const {
    children,
    isSuccess = true,
    isLoading,
    height = 30,
    rows = 1,
    cols = 1,
    gutterX = 2,
    gutterY = 1,
  } = props;

  return <>
    {
      isLoading
        ? Array.from({ length: rows }).map((_, i) => (
          <Skeleton
            key={i}
            containerClassName={`row row-cols-${cols} gx-${gutterX} gy-${gutterY}`}
            wrapper={({ children }) => <div className="h-100">{children}</div>}
            height={height}
            width={"18rem"}
            count={cols}
          />
        ))
        : isSuccess
          ? children
          : <div className="alert alert-danger" role="alert">Error trying to load data</div>
    }
  </>
}

export { LoadingSkeleton };