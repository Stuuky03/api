import { objectType } from "nexus";

const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('description')
  },
})

export default { Tag }