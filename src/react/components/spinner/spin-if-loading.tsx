import { ReactNode } from "react";
import { Spinner } from "./spinner";

export function SpinIfLoading({ children, loading }: { children: ReactNode; loading: boolean }) {
  return loading ? (
    <div className="tw-flex tw-justify-center tw-items-center tw-h-32">
      <Spinner />
    </div>
  ) : (
    <>{children}</>
  );
}