import myAxios from "@/lib/axios";

function axiosGet(url) {
    return new Promise((resolve, reject) => {
        myAxios.get(url).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
function axiosDelete(url) {
    return new Promise((resolve, reject) => {
        myAxios.delete(url).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
function axiosPost(url, value) {
    return new Promise((resolve, reject) => {
        myAxios.post(url, value).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

function axiosPut(url, value) {
    return new Promise((resolve, reject) => {
        myAxios.put(url, value).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const mysqlAPI = {
    fetchPage: function (tableName, pageSize, page) {
        let url = `/mysql/page/${tableName}/${pageSize}/${page}`
        return axiosGet(url)
    },
    fetchSum: function (tableName) {
        let url = `/mysql/sum/${tableName}`
        return axiosGet(url)
    },
    fetchKeys: function (tableName) {
        let url = `mysql/keys/${tableName}`
        return axiosGet(url)
    },
    fetchPrimaryKey: function (tableName) {
        let url = `/mysql/primary-key/${tableName}`
        return axiosGet(url)
    },
    fetchObj: function (tableName) {
        let url = `/mysql/object/${tableName}`
        return axiosGet(url)
    },
    deleteRowByID: function (tableName, id) {
        let url = `/mysql/id/${tableName}/${id}`
        return axiosDelete(url)
    },
    insertRow: function (body) {
        let url = `/mysql/insert`
        return axiosPost(url, body)
    },
    updateRow: function (body) {
        let url = `mysql/update`
        return axiosPut(url, body)
    }
}


// let insertData = {
//     tableName: 'student',
//     value: {
//         family_name: '',
//         given_name: '',
//         full_name: '',
//         gender: '',
//         score: '是',
//         phone: ''
//     }
// }
// mysqlAPI.insertRow(insertData)
//     .then(res => {
//         console.log(res);
//     }).
//     catch(err => {
//         console.log({ err: err });
//     })