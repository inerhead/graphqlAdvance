import { ApolloServer, gql } from "apollo-server";

let data: Avocado[] = [
    {
        id: 'e99c70c5-e82c-44cc-933c-36d24f11f1c0',
        name_name: 'avocado_name1',
        color: 'gray',
        img: 'http:avocado.com'
    },
    {
        id: 'e99c70c5-e82c-44cc-933c-36d24f11f1c0',
        name_name: 'avocado_name2',
        color: 'RED'
    },
    {
        id: 'e99c70c5-e82c-44cc-933c-36d24f11f1c0',
        name_name: 'avocado_name3',
        color: 'Yellow',
        img: 'http:avocado.com'
    }
]

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
    getAvocado(avocadoId: ID!): Avocado
    getAvocados: [Avocado!]!
    
  }
  type Mutation {
      createAvocado(data: AvocadoInput!): Avocado
  }

  input AvocadoInput {
      name: String!
      color: String
      img: String
  }
  type Avocado {
    id: ID
    name: String!
    color: String
    img: String
  }
`;

interface Avocado   {
    id?: string 
    name_name: string
    color?: string
    img?: string
    
}
// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world123',
    getAvocado: (arg: any, avocadoId: string) => {
        console.log(`avocado id ${ avocadoId }`);
        return {
            id: 'e99c70c5-e82c-44cc-933c-36d24f11f1c0',
            name: 'avocado_name2',
            color: 'gray',
            img: 'http:avocado.com'
        }
    },
    getAvocados: () => {
        console.log(`avocados ****`);
        return data
    } 
  },
  Mutation: {
      createAvocado: (arg: any, input: any) => {
        const dataInput: Avocado = input.data as Avocado;
        dataInput.id = 'e99c70c5-e82c-44cc-933c-36d24f111111';
        data = [...data, dataInput];
        return dataInput;
      }
  },
  Avocado: {
    id:    (parent: Avocado) =>  parent.id,
    name:  (parent: Avocado) =>  parent.name_name,
    color: (parent: Avocado) =>  parent.id,
    img:   (parent: Avocado) =>  parent.id
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: {url : string}) => console.log(`🚀 Server ready at ${url}`));