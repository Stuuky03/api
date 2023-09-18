import { objectType } from "nexus"

const BadgeInfo = objectType({
  name: "BadgeInfo",
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('description')
    t.string('imageUrl')
  }
})

export default { BadgeInfo }