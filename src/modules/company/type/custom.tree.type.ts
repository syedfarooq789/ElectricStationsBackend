import { AbstractDataType } from "sequelize";
import { CustomTreeTypeInterface } from "../../common";
export class CustomLTreeType
    implements CustomTreeTypeInterface, AbstractDataType
{
    key: string;
    dialectTypes: string;
    toSql() {
        return this["key"];
    }

    stringify(value: string, options?: object) {
        return (this["key"] = value);
    }
    toString() {
        return this["key"];
    }
    warn(link: string, text: string): void {
        console.warn(text);
    }
}
