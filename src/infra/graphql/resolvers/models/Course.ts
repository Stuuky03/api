import { objectType } from "nexus";

const Course = objectType({
  name: 'Course',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('description')
  },
})

export default { Course }