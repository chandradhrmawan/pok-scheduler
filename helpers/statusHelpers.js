'use strict';


const successMessage = ress => (
    {

        status: true,
        message: 'Success',
        data: ress
    }
);

const emptyMessage = ress => (
    {

        status: true,
        message: 'Data Not Found',
        data: ress
    }
);

const errorMessage = ress => (
    {

        status: false,
        message: 'Error',
        data: ress
    }
);


const forbiddenMessage = (M) => (
    {
        status: false,
        message: M
    }
);

const statusCode = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204,
    forbidden: 403,
};

export {
    successMessage,
    emptyMessage,
    errorMessage,
    forbiddenMessage,
    statusCode,
}
