import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList } from "graphql";
import {Account} from "../../types";

export const AccountType = new GraphQLObjectType({
  name: "account",
  description: "Account Type",
  isTypeOf: account => {
    return (account instanceof Account);
  },
  fields: () => ({
    address: {
      type: GraphQLString,
    },
    nonce: {
      type: GraphQLInt,
    },
    balance: {
      type: GraphQLFloat,
    },
    signers: {
      type: GraphQLList(GraphQLString),
    },
  }),
});
