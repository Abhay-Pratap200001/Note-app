import { ApiError } from "../utils/ApiError.js";
import Note from "../Models/task.model.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Adding Validate  to all fileds
    if (!title || !description) {
      return next(new ApiError(400, "Title and Description are required"));
    }

    // Create a new note linked to logged-in user
    const newNote = new Note({ title,description,
      userId: req.user.id, // attaching userId to check which user created note
    });

    await newNote.save();
    return res.status(201).json(newNote);
  } catch (error) {
    console.log("Create Note Error:", error);
    return next(new ApiError(500, "Internal server error: Failed to create note"));
  }
};


// getting all not created buy user
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.log("Get Notes Error:", error);
    return next(new ApiError(500, "Internal server error"));
  }
};


// updating notes from params 
export const updateNote = async (req, res, next) => {
  try {
    const updatedNote = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });

    if (!updatedNote) {
      return next(new ApiError(404, "Note not found or not authorized"));
    }

    res.status(200).json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    console.log("Update Note Error:", error);
    return next(new ApiError(500, "Internal server error"));
  }
};




// deleting notes
export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedNote) {
      return next(new ApiError(404, "Note not found or not authorized"));
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log("Delete Note Error:", error);
    return next(new ApiError(500, "Internal server error"));
  }
};
