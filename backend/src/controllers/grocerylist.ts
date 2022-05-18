const db = require('../db');

exports.getUsersGroceryLists = async (req, res) => {
  try {
    const userId = req.params.userId;
    const groceryLists = await db.getAllGroceryLists(userId);
    if (groceryLists) {
      res.send(200).json(groceryLists);
    } else {
      res.status(400).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};

exports.addUsersNewGrocerylist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const listName = rew.body.name;
    const newGroceryList = await db.createGroceryList(userId, listName);
    if (newGroceryList) {
      res.send(200).json(newGroceryList);
    } else {
      res.status(409).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};

exports.deleteUsersGroceryList = async (req, res) => {
  try {
    const {userId, listId} = req.params;
    const deletedGroceryList = await db.deleteGroceryList(userId, listId);
    if (deletedGroceryList) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};

exports.updateUsersGroceryListName = async (req, res) => {
  try {
    const {userId, listId} = req.params;
    const newName = req.body.newName;
    const updatedList = await db.updateGroceryListName(userId, listId, newName);
    if (updatedList) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};
