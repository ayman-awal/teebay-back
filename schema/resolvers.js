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
          where: { email: email }
        });

        if(existingEmail){
          throw new Error("User already exists with this email.");
        };

        const existingPhoneNumber = await prisma.user.findUnique({
          where: { phoneNumber: phoneNumber }
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
      deleteProduct: async (_, { input }, { prisma }) => {
        const { userId, productId } = input;

        const exisitingProduct = await prisma.product.findUnique({
          where: { id: productId }
        });

        const exisitingUser = await prisma.user.findUnique({
          where: { id: userId }
        });

        if(!exisitingUser) {
          throw new Error("User does not exist");
        }

        if(!exisitingProduct){
          throw new Error("Product does not exist");
        }

        if(exisitingProduct.userId === userId ){
          await prisma.product.delete({
            where: {
              id: productId,
            },
          });
          return true;
        }

      },
      createProduct: async (_, { input }, { prisma }) => {
        const { title, isAvailable, categories, description, purchasePrice, rentPrice, rentFrequency, datePosted, userId } = input;

        const newProduct = await prisma.product.create({
          data: {
            title, 
            isAvailable, 
            categories, 
            description, 
            purchasePrice, 
            rentPrice, 
            rentFrequency, 
            datePosted, 
            userId
          }
        });

        return newProduct;
      },
      editProduct: async (_, { input }, { prisma }) => {
        const { productId, title, rentPrice, purchasePrice, description, rentFrequency, categories } = input;

        const existingProduct = await prisma.product.findUnique({
          where: { id: productId }
        });

        if (!existingProduct) {
          throw new Error('Product does not exist');
        }
  
        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                title: title,
                rentPrice: rentPrice,
                purchasePrice: purchasePrice,
                description: description,
                rentFrequency: rentFrequency,
                categories: categories,
            }
        });
    
        return updatedProduct;

      },
      createTransaction: async (_, { input }, { prisma }) => {
        const { transactionType, productId, primaryUserId, secondaryUserId, rentFrom, rentTo } = input;
        
        const existingTransaction = await prisma.transaction.findFirst({
          where: { productId: productId }
        });

        if(primaryUserId === secondaryUserId){
          throw new Error("UserIds are the same");
        }

        if(existingTransaction){
          throw new Error("The product is not available");
        }

        await prisma.product.update({
          where: { id: productId },
          data: {
              isAvailable: false
          }
        });

        const newTransaction = await prisma.transaction.create({
          data: {
            transactionType: transactionType, 
            productId: productId, 
            primaryUserId: primaryUserId, 
            secondaryUserId: secondaryUserId,
            rentFrom: rentFrom, 
            rentTo: rentTo
          }
        });

        return newTransaction;
      }
    }
  };

module.exports = { resolvers };
