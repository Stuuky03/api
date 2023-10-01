import { mutationType } from "nexus";

const Mutation = mutationType({
  definition(t) {
    t.field('question', {
      type: 'Question',
      resolve: async (_parent, _args, context) => {
        return "LALALA"
      }
    })


  }
})

export default { Mutation }