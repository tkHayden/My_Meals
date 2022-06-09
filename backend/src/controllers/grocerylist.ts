import {
  getAllGroceryLists,
  createGroceryList,
  deleteGroceryList,
  updateGroceryListName,
} from "../db";
import { Request, Response } from "express";

const dbErrors = Object.freeze({
  Duplicate: "23505",
  Invalid: "22P02",
});

export const getUsersGroceryLists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const groceryLists = await getAllGroceryLists(userId);
    if (groceryLists.length > 0) {
      res.send(200).json(groceryLists);
    } else {
      res.status(400).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};


export const addUsersNewGrocerylist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const listName: string = req.body.name;
    const newGroceryList = await createGroceryList(userId, listName);
    if (Array.isArray(newGroceryList) && newGroceryList.length > 0) {
      res.send(200).json(newGroceryList);
      return;
    }
    if (newGroceryList == dbErrors.Duplicate) {
      res.status(409).send("User already has a grocery list with that name");
      return;
    }
    res.status(400).end();
  } catch (error) {
    res.status(500).end();
  }
};

export const deleteUsersGroceryList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, listId } = req.params;
    const deletedGroceryList = await deleteGroceryList(userId, listId);
    if (Array.isArray(deletedGroceryList) && deletedGroceryList.length > 0) {
      res.status(200).end();
    } else {
      res.status(404).send("Grocery list does not exist for this user");
    }
  } catch (error) {
    res.status(500).end();
  }
};

export const updateUsersGroceryListName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, listId } = req.params;
    const newName = req.body.newName;
    const updatedList = await updateGroceryListName(userId, listId, newName);
    if (Array.isArray(updatedList) && updatedList.length > 0) {
      res.status(200).end();
    }
    if (updatedList == dbErrors.Duplicate) {
      res.status(409).send("User already has a grocery list with that name");
    }
    res.status(404).send("Grocery list does not exist for this user");
  } catch (error) {
    res.status(500).end();
  }
};
