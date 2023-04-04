import * as React from "react";

import {
    Datagrid,
    DateField,
    DeleteButton,
    EditButton,
    EmailField,
    List,
    NumberField,
    SearchInput,
    SelectInput,
    TextField,
    TextInput,
} from "react-admin";

const UserFilter = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="姓名" source="full_name" />,
    <TextInput label="性别" source="gender" defaultValue="Male" />,
];
export interface IUserListProps {}
export default function UserList(props: IUserListProps) {
    return (
        <List {...props} filters={UserFilter}>
            <Datagrid>
                <TextField source="id" title="id" />
                <TextField source="full_name" label="姓名" />
                <EmailField source="email" label="邮箱" />
                <TextField source="phone" label="手机" />
                <TextField source="gender" label="性别" />
                <DateField source="birthday" label="出生日期" />
                <EditButton resource="/users" label="编辑" />
                <DeleteButton resource="/users" label="删除" />
            </Datagrid>
        </List>
    );
}
