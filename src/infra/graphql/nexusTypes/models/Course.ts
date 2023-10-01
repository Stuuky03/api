import { objectType } from "nexus";

const Course = objectType({
  name: 'Course',
  definition(t) {
    t.nonNull.id('name')
    t.nonNull.string('description')
  },
})

export default { Course }