const resolvers = {
    Query: {
      users: async () => {
        return await prisma.user.findMany(); 
      },
      user: async (parent, args) => {
        const {id} = args;
        return await prisma.find.unique({
          where: { id: Number(id) }
        });
      }
    },
    Mutation: {
      register: async (parent, { input }, { prisma }) => {
        const { email, phoneNumber, firstName, lastName, password, confirmPassword, address } = input;

        const existingEmail = await prisma.user.findUnique({
          where: { email }
        });

        if(existingEmail){
          throw new Error("User already exists with this email.");
        };

        const existingPhoneNumber = await prisma.user.findUnique({
          where: { phoneNumber }
        });

        if(existingPhoneNumber){
          throw new Error("User already exists with this phone number.");
        }
        
        if(password !== confirmPassword){
          throw new Error("Passwords do not match");
        }

        const newUser = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            address
          }
        });

        return newUser;
      },
      login: async (parent, { input }, { prisma }) => {
        const { email, password } = input;

        const existingUser = await prisma.user.findUnique({
          where: { email }
        });

        if(!existingUser){
          throw new Error("User does not exist");
        }

        if(existingUser.password != password){
          throw new Error("You entered wrong password");
        }

        return existingUser;
      }
    }
  };

module.exports = { resolvers };
