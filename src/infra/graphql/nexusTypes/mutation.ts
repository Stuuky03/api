import { mutationType } from "nexus";

const Mutation = mutationType({
 definition (t) {
   t.field('question', {
     type: 'Question',
     resolve: async (_parent, _args, context) => {
       const newQuestion = await context.prisma.question.create({
         data: {
           title: _args.input.title,
           content: _args.input.content,
           createdAt: new Date(),
           isDraft: false
         }
       })

       try{
         const delQuestion = await context.prisma.question.delete({
           where: { id: _args.id }
         })

         return { success: true, message: 'Pergunta excluída.' }
       } catch (error) {
         console.log("Error deleting question", error);
       }

       const editQuestion = await context.prisma.question.update({
         where: { id: _args.id },
         data: {
           title: _args.input.title,
           content: _args.input.content,
           createdAt: new Date(),
           isDraft: false
         }
       }) 
     }
   })

   t.field('stuuke', {
    type: 'Stuuke',
    resolve: async (_parent, _args, context) => {
     const newStuuke = await context.prisma.stuuke.create({
       data: {
        title: _args.input.title,
        content: _args.input.content,
        createdAt: new Date(),
       }
     })

     try{
      const delStuuke = await context.prisma.stuuke.delete({
        where: { id: _args.id }
      })

      return { success: true, message: 'Stuuke excluído.' }
    } catch (error) {
      console.log("Error deleting stuuke", error);
    }

    const editStuuke = await context.prisma.stuuke.update({
     where: { id: _args.id },
         data: {
           title: _args.input.title,
           content: _args.input.content,
           createdAt: new Date(),
         }
    })
    }
   })
 }
})

export default { Mutation }