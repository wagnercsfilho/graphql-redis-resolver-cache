export default `
    type Channel {
      id: ID!
      name: String
      messages: [Message]!
    }

    type Message {
      id: ID!
      text: String
      channel: Channel!
    }

    type Query {
      channels: [Channel]
      channel(id: ID!): Channel
      messages(limit: Int): [Message]
    }

    type Mutation {
      # A mutation to add a new channel to the list of channels
      addChannel(name: String!): Channel
    }
`;