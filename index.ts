type Context = {
  attempted: number;
  abort: boolean;
};

type Callback<T> = (context: Context) => Promise<T>;

type Config = {
  attmept: number;
  timeout: number;
};

function init(): Context {
  return {
    attempted: 0,
    abort: false,
  };
}

function doFunc<T>(
  callback: Callback<T>,
  config: Config,
  context: Context
): Promise<T> {
  return new Promise((resolve, reject) => {
    callback(context)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        if (context.attempted < config.attmept) {
          context.attempted++;
          return doFunc(callback, config, context);
        }
        reject(err);
      });
  });
}

export async function retry<T>(
  callback: Callback<T>,
  config: Config
): Promise<T> {
  const context = init();
  return doFunc(callback, config, context);
}
