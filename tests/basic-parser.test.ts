import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";


const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // invalid number and this doesn't care
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("people.csv has no empty fields", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);
  for (const row of results) {
    for (const cell of row) {
      expect(cell).not.toEqual("");
    }
  }
});

test("people.csv has consistent number of columns", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);
  const headerLength = results[0].length;
  for (const row of results) {
    expect(row.length).toBe(headerLength);
  }
});

test("people.csv allows multiple data rows", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);
  // should include header + 4 data rows
  expect(results.length).toBe(5);
});

test("age field can contain non-numeric strings (edge case)", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);
  expect(results[2]).toEqual(["Bob", "thirty"]); // shows schema validation
});

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

