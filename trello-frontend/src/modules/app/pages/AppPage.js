import { RootRoutes } from "../../../root/rootRoutes";
import { ScrollToTop } from "../components/ScrollToTop";

export function AppPage() {
  return (
    <div className="flex h-full">
      {/* {!!showSidebar && <Sidebar></Sidebar>} */}
      <div className="flex flex-col w-full overflow-auto">
        <ScrollToTop>
          {/* <AppBar /> */}
          <div className="px-8">
            <RootRoutes />
          </div>
        </ScrollToTop>
      </div>
    </div>
  );
}
