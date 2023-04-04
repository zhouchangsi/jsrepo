import { Admin, Resource } from "react-admin";

import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import React from "react";
import UserCreate from "./components/UserCreate";
import UserEdit from "./components/UserEdit";
import UserList from "./components/UserList";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("http://localhost:3000");

export const App: React.FC = () => {
    return (
        <div className="App">
            <Admin dataProvider={dataProvider}>
                <Resource
                    icon={EmojiPeopleRoundedIcon}
                    name="users"
                    list={UserList}
                    create={UserCreate}
                    edit={UserEdit}
                />
                <Resource
                    icon={AdminPanelSettingsRoundedIcon}
                    name="admin"
                    list={UserList}
                    create={UserCreate}
                    edit={UserEdit}
                />
                <Resource
                    icon={AddShoppingCartRoundedIcon}
                    name="goods"
                    list={UserList}
                    create={UserCreate}
                    edit={UserEdit}
                />
                <Resource
                    icon={FavoriteBorderRoundedIcon}
                    name="order"
                    list={UserList}
                    create={UserCreate}
                    edit={UserEdit}
                />
            </Admin>
        </div>
    );
};

export default App;
