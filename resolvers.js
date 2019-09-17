import service from "./service";
import withCache from "./cache-resolver";

export default {
  Channel: {
    messages: withCache(
      (parent, args) => {
        return service.getMessagesByChannelId(parent.id);
      },
      { ttl: 500 }
    )
  },
  Message: {
    channel: withCache((parent, args, { dataloaders: { channelLoader } }) => {
      return channelLoader.load(parent.channelId);
    })
  },
  Query: {
    channels: withCache(() => {
      return service.getChannels();
    }),
    channel: withCache((root, { id }) => {
      return service.getChannelById(id);
    }),
    messages: withCache((_, { limit }) => {
      return service.getMessages({ limit });
    })
  },
  Mutation: {
    addChannel: (root, { name }) => {
      return service.addChannel(name);
    }
  }
};
