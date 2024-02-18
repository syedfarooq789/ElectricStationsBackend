"use strict";
const sql = `
    do $$
    begin
        if not exists (
            select 
                t.typname enum_name
            from 
                pg_type t join 
                pg_enum e on t.oid = e.enumtypid join
                pg_catalog.pg_namespace n on n.oid = t.typnamespace 
            where 
                n.nspname = 'public' and 
                t.typname='enum_status' 
            group by 1
        ) then
            create type "public"."enum_status" as enum('ACTIVE', 'INACTIVE');
        end if;
    end
    $$;


    create table "company" (
        "id" SERIAL, 
        "companyId" integer NOT NULL, 
        "name" varchar(255), 
        "status" "public"."enum_status", 
        "createdAt" timestamp with time zone, 
        "updatedAt" timestamp with time zone, 
        "path" ltree, 
         primary key ("companyId")
    )

`;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface) => queryInterface.sequelize.query(sql),
    down: () => {},
};
