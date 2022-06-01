import { Route,Routes } from "react-router-dom";
import CreatePermissionPage from "../pages/CreatePermission/create_permission.page";
import { HomePage } from "../pages/Home/home.page";
import { ListPermissionPage } from "../pages/ListPermission/list_permission.page";
import { UpdatePermissionPage } from "../pages/UpdatePermission/update_permission.page";

export const AppRouter = () => {
    return(
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/list" element={<ListPermissionPage/>} />
        <Route path="/create" element={<CreatePermissionPage/>} />
        <Route path="/update" element={<UpdatePermissionPage/>} />
      </Routes>
    );
}