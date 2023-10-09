import { objectType } from "nexus"

const Reference = objectType({
  name: 'Reference',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('url')
    t.nonNull.string('stuukeId')
    t.nonNull.field('stuuke', {
      type: 'Stuuke',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.stuuke.findUnique({
          where: { id: parent.stuukeId }
        })
      }
    })
  }
})

export default { Reference }