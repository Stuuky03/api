import { objectType } from "nexus"

const BadgeInfo = objectType({
  name: "BadgeInfo",
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.string('imageUrl')
  }
})

export default { BadgeInfo }