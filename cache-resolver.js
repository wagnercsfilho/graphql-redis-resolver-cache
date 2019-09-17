import hash from "object-hash";

const toSafeObject = obj => JSON.parse(JSON.stringify(obj || {}));

export default (func, options = {}) => {
  const defaultSetOptions = {
    ttl: 300
  };

  const currentOptions = {
    ...defaultSetOptions,
    ...options
  };
  return (root, args, context) => {
    const key = `${hash(func)}:${hash(toSafeObject(root))}:${hash(
      toSafeObject(args)
    )}`;

    const executeAndCache = () =>
      Promise.resolve(func(root, args, context)).then(async value => {
        await context.client.set(
          key,
          JSON.stringify(value),
          "EX",
          currentOptions.ttl
        );
        return value;
      });

    return context.dataloaders.cacheLoader
      .load(key)
      .then(value => {
        if (value) {
          console.log("load resolver from cache");
          return JSON.parse(value);
        }

        console.log("load resolver");
        return executeAndCache();
      })
      .catch(e => {
        console.log(e);
        return executeAndCache();
      });
  };
};
