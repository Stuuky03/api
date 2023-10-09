import { objectType } from "nexus";

const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('description')
  },
})

export default { Tag }