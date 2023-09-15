import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, makeSchema } from "nexus";
import { join } from "path";
import * as types from "./nexusTypes"

const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const schema = makeSchema({
  types,
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
  },
})