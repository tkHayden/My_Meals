import { getAllGroceryLists, createGroceryList,
  deleteGroceryList, updateGroceryListName } from '../db';
import { Request, Response} from 'express';

export const getUsersGroceryLists = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const groceryLists = await getAllGroceryLists(userId);
    if (groceryLists) {
      res.send(200).json(groceryLists);
    } else {
      res.status(400).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};

export const addUsersNewGrocerylist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const listName: string = req.body.name;
    const newGroceryList = await createGroceryList(userId, listName);
    if (newGroceryList) {
      res.send(200).json(newGroceryList);
    } else {
      res.status(409).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};

export const deleteUsersGroceryList = async (req: Request, res: Response): Promise<void> => {
  try {
    const {userId, listId} = req.params;
    const deletedGroceryList = await deleteGroceryList(userId, listId);
    if (deletedGroceryList) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};

export const updateUsersGroceryListName = async (req: Request, res: Response): Promise<void> => {
  try {
    const {userId, listId} = req.params;
    const newName = req.body.newName;
    const updatedList = await updateGroceryListName(userId, listId, newName);
    if (updatedList) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};
