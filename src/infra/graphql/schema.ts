import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, declarativeWrappingPlugin, makeSchema } from "nexus";
import { join } from "path";
import * as types from "./nexusTypes"
import { GraphQLScalarType } from "graphql";

const dateTimeScalar = new GraphQLScalarType(DateTimeResolver)
export const DateTime = asNexusMethod(dateTimeScalar, 'dateTime')

export const schema = makeSchema({
  types: [
    types,
    DateTime
  ],
  outputs: {
    schema: join(__dirname, '../graphql/', 'schema.graphql'),
    typegen: join(__dirname, '../graphql/types/', 'schemaTypes.ts')
  },
  contextType: {
    module: require.resolve('./context.ts'),
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prismaClient',
      },
    ],
    mapping: {
      DateTime: 'Date',
    }
  },
  plugins: [declarativeWrappingPlugin()]
})