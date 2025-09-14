
import { parseCSV } from "../src/parser";
import * as path from "path";
import { z } from "zod";




const PersonRowSchema = z
  .tuple([z.string(), z.coerce.number()]);

  test("parses CSV to person Objects when schema is provided", async () => {
    const result = await parseCSV("people.csv", PersonRowSchema);

    expect(result).toEqual([
      {name: "Alice", age: 23 },
      {name: "Charlie", age: 25 },
      {name: "Nim", age: 22 },

   ]);
  });
