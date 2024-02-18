import {
    Table,
    PrimaryKey,
    Column,
    DataType,
    Model,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    BelongsTo,
    NotNull,
} from "sequelize-typescript";
import { Company } from "./../company/company.entity";
import { Point } from "../common";
@Table({
    tableName: "station",
})
export class Station extends Model<Station> {
    @PrimaryKey
    @NotNull
    @Column({ allowNull: false })
    declare stationId: number;

    @NotNull
    @ForeignKey(() => Company)
    @Column({ field: "companyId", allowNull: false, onDelete: "CASCADE" })
    declare companyId: number;

    @BelongsTo(() => Company)
    company: Company;

    @Column
    declare name: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @NotNull
    @Column({ type: DataType.GEOMETRY("POINT", 4326), allowNull: false })
    declare point: Point;
}
