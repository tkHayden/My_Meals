/* eslint-disable max-len */
import { reset } from "./testdb";
import {
  getAllGroceryLists,
  createGroceryList,
  deleteGroceryList,
  updateGroceryListName,
} from "../db";

beforeAll(async () => {
  return reset();
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
      const result = await createGroceryList(list[1], list[0]);
      if (typeof result == "object") {
        expect(result[0].id).not.toBe(null);
        expect(result[0]["list_name"]).toBe(list[0]);
        expect(result[0]["user_id"]).toBe(`${list[1]}`);
      } else {
        throw new Error("Unexpected error when inserting new grocery list");
      }
    }
  });
  test("Inserting a grocery_list with same name for a user", async () => {
    const result = await createGroceryList("1", "same_list");
    if (typeof result == "object") {
      expect(result[0]["list_name"]).toBe("same_list");
      expect(result[0]["user_id"]).toBe("1");
    } else {
      throw new Error("Unexpected error when inserting new grocery list");
    }
    const dupResult = await createGroceryList("1", "same_list");
    expect(dupResult).toBe("23505");
  });
});
describe("Selecting from grocery_list queries", () => {
  test("Selecting all grocery list for a user", async () => {
    const result = await getAllGroceryLists("1");
    if (typeof result == "object") {
      expect(result.length).toBeGreaterThan(0);
      for (const item of result) {
        expect(item["user_id"]).toBe("1");
      }
    } else {
      throw new Error("Unexpected error when selecting user's grocery list");
    }
  });
});
describe("Delete query from grocery_list", () => {
  test("Valid delete of users grocery list", async () => {
    const result = await createGroceryList("1", "monday_list");
    if (typeof result == "object" && result[0].id) {
      const del = await deleteGroceryList("1", result[0].id);
      if (typeof del == "object" && del[0]) {
        expect(del[0]["list_name"]).toBe("monday_list");
      } else {
        throw new Error("Unexpected error when deleting user's grocery list");
      }
    }
  });
  test("Invalid delete of non-existant list id", async () => {
    const del = await deleteGroceryList("1", "12345");
    expect(del).toBe("22P02");
  });
  test("Invalid delete due to non-matching user-id", async () => {
    const result = await createGroceryList("monday_list", "2");
    if (typeof result == "object" && result[0].id) {
      const del = await deleteGroceryList("1", result[0].id);
      expect(del).toEqual([]);
    } else {
      throw new Error("Unexpected error when creating new grocery list");
    }
  });
});
describe("Update query for grocery_list", () => {
  test("Valid update of a users grocery list", async () => {
    const listId = "1f1afa4c-d22d-11ec-9d64-0242ac120002";
    const update = await updateGroceryListName("1", listId, "updated_list");
    if (typeof update == "object") {
      expect(update[0].id).toBe(listId);
      expect(update[0]["list_name"]).toBe("updated_list");
    } else {
      fail("Unexpected error when updating grocery list");
    }
  });
  test("Invalid update of non-existent grocery list id", async () => {
    const listId = "1f1afa4c-d22d-11ec-9d64-02ac120002";
    const update = await updateGroceryListName("1", listId, "updated_list");
    expect(update).toBe("22P02");
  });
  test("Invalid update due to non-matching user-id", async () => {
    const listId = "1f1afa4c-d22d-11ec-9d64-0242ac120002";
    const update = await updateGroceryListName("2", listId, "updated_list");
    expect(update).toEqual([]);
  });
  test("Invalid update due to new name already existing as a users grocerylist", async () => {
    const listId = "1f1b00be-d22d-11ec-9d64-0242ac120002";
    const update = await updateGroceryListName("1", listId, "updated_list");
    expect(update).toBe("23505");
  });
});
