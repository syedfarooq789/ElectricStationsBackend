import { Error } from "./error";
import { ErrorCodes } from "./error.codes";

export const SequelizeErrorHandler = (error: any): Error => {
    if (error.name === "SequelizeUniqueConstraintError") {
        return new Error(ErrorCodes.VALIDATION_ERROR, error.errors[0].message);
    } else if (error.name === "SequelizeValidationError") {
        return new Error(ErrorCodes.VALIDATION_ERROR, error.errors[0].message);
    } else if (error.name === "SequelizeDatabaseError") {
        return new Error(
            ErrorCodes.BAD_REQUEST_EXCEPTION,
            error.original.message
        );
    } else if (error.name === "SequelizeForeignKeyConstraintError") {
        return new Error(
            ErrorCodes.BAD_REQUEST_EXCEPTION,
            error.original.detail
        );
    }
    return new Error(ErrorCodes.BAD_REQUEST_EXCEPTION, error);
};
