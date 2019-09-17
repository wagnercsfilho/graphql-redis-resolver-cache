import _ from "lodash";
import DataLoader from "dataloader";
import service from "./service";

async function batchChannels(ids) {
  console.log("load channels from api", ids);
  const channels = await service.getChannelsByIds(ids);
  const channelsById = _.keyBy(channels, "id");
  return ids.map(id => channelsById[id]);
}

async function batchCache(client, keys) {
  console.log("load cache from redis", keys);
  const results = await client.mgetAsync(keys);
  console.log(results);
  return results;
}

export default ({ client }) => ({
  channelLoader: new DataLoader(ids => batchChannels(ids), { cache: true }),
  cacheLoader: new DataLoader(keys => batchCache(client, keys), {
    cache: false
  })
});
