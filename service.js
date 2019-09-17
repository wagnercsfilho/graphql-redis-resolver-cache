import { resolve } from "bluebird";

const channels = [
  {
    id: 1,
    name: "soccer"
  },
  {
    id: 2,
    name: "baseball"
  },
  {
    id: 3,
    name: "soccer"
  }
];

const messages = [
  {
    id: 1,
    text:
      "Lorem ipsum dolor sit amet, quo id tritani vocibus, mei ridens eirmod id. Choro facilis reprehendunt an vix, ex essent dissentiunt has. Vitae prompta sit ex. Est ea amet utinam temporibus, autem tollit vis ne.",
    channelId: 1
  },
  {
    id: 2,
    text:
      "Cu pri nostro ponderum. Sententiae interesset ei pro, ex qui natum nostrum. Ne vel noluisse scaevola forensibus. In vix choro dicant probatus, qui mundi veritus cu.",
    channelId: 1
  },
  {
    id: 3,
    text:
      "Ad nam oratio ocurreret interesset, ea nec fugit regione. At altera feugiat pri, no usu eruditi phaedrum dissentiet. Ne eos mandamus suavitate. Cu debet habemus pericula usu, quem justo tractatos quo ex. Id nobis tollit eruditi cum, natum putant delicata vel an, legere aeterno phaedrum te sed.",
    channelId: 1
  },
  {
    id: 4,
    text:
      "Omnes forensibus instructior cu ius, ceteros interesset est cu. Nam id aperiam integre, erat laudem inimicus nam ex, ad eam vitae assentior. Mei ad oratio adipiscing scriptorem, in eros wisi denique eum. Eum iisque praesent qualisque et, dolores incorrupte per id. Mollis tacimates per id.",
    channelId: 2
  },
  {
    id: 5,
    text:
      "In usu esse impetus diceret. Et eum iusto audire tacimates, no mei quod animal docendi. Sea at harum mediocrem expetendis, est stet animal scripserit ea. Everti maluisset id ius, in labitur atomorum intellegat mel.",
    channelId: 3
  }
];

let nextId = 3;
const delay = 1000;

export default {
  getChannels: () => {
    console.log("service getChannels");
    return resolve(channels).delay(delay);
  },
  getChannelsById: id => {
    console.log("service getChannelsById");
    return resolve(channels.find(channel => channel.id == id)).delay(delay);
  },
  getMessages: (params = {}) => {
    console.log("service getMessages");
    return resolve(messages.slice(0, params.limit || messages.length)).delay(
      delay
    );
  },
  getMessagesByChannelId: id => {
    console.log("service getMessagesByChannelId");
    return resolve(messages.filter(message => message.channelId === id)).delay(
      delay
    );
  },
  getChannelsByIds: ids => {
    console.log("service getChannelsByIds");
    return resolve(channels.filter(channel => ids.includes(channel.id))).delay(
      delay
    );
  },
  addChannel: name => {
    const newChannel = { id: nextId++, name };
    channels.push(newChannel);
    return newChannel;
  }
};
