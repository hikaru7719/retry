type Context = {
  abort: boolean;
};

type Callback<T> = (context: Context) => Promise<T>;

type Config = {
  attmept: number;
  timeout: number;
};

export async function retry<T>(
  callback: Callback<T>,
  config: Config
): Promise<T> {
  return new Promise((resolve, reject) => {});
}
