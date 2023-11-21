import { objectType } from "nexus";

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token')
  }
})

export default { AuthPayload }