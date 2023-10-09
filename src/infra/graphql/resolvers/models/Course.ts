import { objectType } from "nexus";

const Course = objectType({
  name: 'Course',
  definition(t) {
    t.nonNull.id('title')
    t.nonNull.string('description')
  },
})

export default { Course }