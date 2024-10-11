const resolvers = {
    Query: {
      users: async (_, __, { prisma }) => {
        return await prisma.user.findMany(); 
      },
      userById: async (_, args, { prisma }) => {
        const { id } = args;
        return await prisma.find.unique({
          where: { id: Number(id) }
        });
      },
      products: async (_, __, { prisma }) => {
        return await prisma.product.findMany();
      },
      productById: async (_, args, { prisma }) => {
        const { id } = args;
        return await prisma.product.findUnique({
          where: { id: Number(id) }
        });
      },
      productByUserId: async (_, args, { prisma }) => {
        const { id } = args;
        return await prisma.product.findMany({
          where: { userId: Number(id) }
        });
      },
      productsByTransaction: async (_, args, { prisma }) => {
        const { id, type, action } = args;
      
        let whereClause = {
          transactionType: type,
        };
      
        if (action === 'Lent' || action === 'Sold') {
          whereClause.primaryUserId = Number(id);
        } else if (action === 'Bought' || action === 'Borrowed') {
          whereClause.secondaryUserId = Number(id);
        }
      
        return await prisma.transaction.findMany({
          where: whereClause,
          include: {
            product: true
          }
        });
      },
    },
    Mutation: {
      register: async (_, { input }, { prisma }) => {
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
      login: async (_, { input }, { prisma }) => {
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
      },
      createProduct: async (_, { input }, { prisma }) => {
        const { title, categories, description, purchasePrice, rentPrice, datePosted, perDay, userId } = input;

        const newProduct = await prisma.product.create({
          data: {
            title,
            categories,
            description,
            purchasePrice,
            rentPrice,
            datePosted, 
            perDay,
            userId
          }
        });

        return newProduct;
      }
    }
  };

module.exports = { resolvers };
