import { retry, Context } from "../index";

test("retry", async () => {
  let count = 0;
  const callback = async (context: Context): Promise<string> => {
    count++;
    if (count === 2) {
      return "OK";
    }
    throw new Error("Failed");
  };

  // retry twice
  const twice = await retry(callback, { attmept: 2 });
  expect(twice).toBe("OK");
  expect(count).toBe(2);

  count = 0;
  // retry three times
  const threeTimes = await retry(callback, { attmept: 3 });
  expect(count).toBe(2);
  expect(threeTimes).toBe("OK");

  // retry once
  count = 0;
  await expect(retry(callback, { attmept: 1 })).rejects.toThrow("Failed");
  expect(count).toBe(1);
});
