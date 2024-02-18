import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    CreatedAt,
    UpdatedAt,
    HasMany,
    NotNull,
} from "sequelize-typescript";
import { Station } from "./../station/station.entity";
import { Status } from "./../common";
import { CustomLTreeType } from "./type/custom.tree.type";

@Table({
    tableName: "company",
})
export class Company extends Model<Company> {
    @AutoIncrement
    @Column(DataType.BIGINT)
    declare id: number;

    @PrimaryKey
    @NotNull
    @Column({ allowNull: false })
    declare companyId: number;

    @Column
    declare name: string;

    @Column({ type: DataType.ENUM(Status.ACTIVE, Status.INACTIVE) })
    declare status: Status;

    @CreatedAt
    @Column
    declare createdAt: Date;

    @UpdatedAt
    @Column
    declare updatedAt: Date;

    @HasMany(() => Station)
    station: Station[];

    @Column({ type: new CustomLTreeType() })
    declare path: string;
}
