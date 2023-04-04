import * as React from "react";

import {
    DateInput,
    Edit,
    SelectInput,
    SimpleForm,
    TextInput,
} from "react-admin";

export interface IUserEditProps {}

export default function UserEdit(props: IUserEditProps) {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" label="id" disabled />
                <TextInput source="full_name" label="姓名" />
                <TextInput source="email" label="邮箱" />
                <SelectInput
                    source="gender"
                    label="性别"
                    choices={[
                        { id: "male", name: "Male" },
                        { id: "female", name: "Female" },
                    ]}
                />

                <TextInput source="phone" label="手机" />
                <DateInput source="birthday" label="出生日期" />
            </SimpleForm>
        </Edit>
    );
}
