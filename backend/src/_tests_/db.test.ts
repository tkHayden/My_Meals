/* eslint-disable max-len */
import {
  getAllGroceryLists,
  createGroceryList,
  deleteGroceryList,
  updateGroceryListName,
} from "../db";
import { reset } from "./testdb";
const app = require("../app");
const query = require("../db");

beforeAll(async () => {
  reset();
});

const mockLists = [
  ["monday_list", "0"],
  ["superbowl", "1"],
  ["weekend list", "1"],
  ["birthday list", "2"],
  ["list_1", "2"],
];

describe("Inserting into grocery_list queries", () => {
  test("Inserting new grocery_lists", async () => {
    for (const list of mockLists) {
      const result = await query.createGroceryList(list[1], list[0]);
      if (result) {
        expect(result[0].id).not.toBe(null);
        expect(result[0]["list_name"]).toBe(list[0]);
        expect(result[0]["user_id"]).toBe(`${list[1]}`);
      } else {
        fail("Function returned null");
      }
    }
  });
  test("Inserting a grocery_list with same name for a user", async () => {
    const result = await query.createGroceryList("1", "same_list");
    if (result) {
      expect(result[0]["list_name"]).toBe("same_list");
      expect(result[0]["user_id"]).toBe("1");
    } else {
      fail("Function returned null");
    }
    const dupResult = await createGroceryList("1", "same_list");
    expect(dupResult).toBe(null);
  });
});
describe("Selecting from grocery_list queries", () => {
  test("Selecting all grocery list for a user", async () => {
    const result = await getAllGroceryLists("1");
    if (result) {
      expect(result.length).toBeGreaterThan(0);
      for (const item of result) {
        expect(item["user_id"]).toBe("1");
      }
    } else {
      fail("Function returned null");
    }
  });
});
describe("Delete query from grocery_list", () => {
  test("Valid delete of users grocery list", async () => {
    const result = await createGroceryList("1", "monday_list");
    if (result && result[0].id) {
      const del = await deleteGroceryList("1", result[0].id);
      if (del && del[0]) {
        expect(del[0]["list_name"]).toBe("monday_list");
      } else {
        fail("Function returned null");
      }
    }
  });
  test("Invalid delete of non-existant list id", async () => {
    const del = await deleteGroceryList("1", "12345");
    expect(del).toBe(null);
  });
  test("Invalid delete due to non-matching user-id", async () => {
    const result = await createGroceryList("monday_list", "2");
    if (result && result[0].id) {
      const del = await deleteGroceryList("1", result[0].id);
      expect(del).toBe(null);
    } else {
      fail("Function returned null");
    }
  });
});
describe("Update query for grocery_list", () => {
  test("Valid update of a users grocery list", async () => {
    const listId = "1f1afa4c-d22d-11ec-9d64-0242ac120002";
    const update = await updateGroceryListName("1", listId, "updated_list");
    if (update) {
      expect(update[0].id).toBe(listId);
      expect(update[0]["list_name"]).toBe("updated_list");
    } else {
      fail("Function returned null");
    }
  });
  test("Invalid update of non-existent grocery list id", async () => {
    const listId = "1f1afa4c-d22d-11ec-9d64-02ac120002";
    const update = await updateGroceryListName("1", listId, "updated_list");
    expect(update).toBe(null);
  });
  test("Invalid update due to non-matching user-id", async () => {
    const listId = "1f1afa4c-d22d-11ec-9d64-0242ac120002";
    const update = await updateGroceryListName("2", listId, "updated_list");
    expect(update).toBe(null);
  });
  test("Invalid update due to new name already existing as a users grocerylist", async () => {
    const listId = "1f1b00be-d22d-11ec-9d64-0242ac120002";
    const update = await updateGroceryListName("1", listId, "updated_list");
    expect(update).toBe(null);
  });
});
