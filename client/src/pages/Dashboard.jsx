import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import toast from "react-hot-toast";

const Dashboard = ({ setCurrentUser }) => {
  const navigate = useNavigate();

   // for displaying the notes 
  const [notes, setNotes] = useState([]);

  
  // for storing the notes data
  const [form, setForm] = useState({ title: "", description: "" });

  // Edit note
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  // Search & Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("latest");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });


  // featching all notes from server
  const fetchNotes = async () => {
    try {
      const res = await api.get("/note");
      setNotes(res.data.data);
    } catch (err) {
      toast.error("Please login again");
      navigate("/sigin");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


    // creating the note and sendind to server
  const createNote = async (e) => {
    e.preventDefault();
    await api.post("/note", form);
    toast.success("Note added");
    setForm({ title: "", description: "" });
    fetchNotes();
  };

  // deleting the notes based on note id 
  const deleteNote = async (id) => {
    await api.delete(`/note/${id}`);
    toast.success("Note deleted");
    fetchNotes();
  };


  // keeping note based on id and editing it
  const startEdit = (note) => {
    setEditId(note._id);
    setEditData({ title: note.title, description: note.description });
  };


// edit note and save to db based on note id
  const saveEdit = async (id) => {
    try {
      await api.put(`/note/${id}`, editData);
      toast.success("Note updated");
      setEditId(null);
      fetchNotes();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Search & Filter logic
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()) || note.description.toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
      if (filter === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (filter === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });


  // logout user function
  const logout = async () => {
    await api.post("/auth/signOut");
    setCurrentUser(null);
    toast.success("Logged out");
    navigate("/sigin");
  };

  return (
    <div className="min-h-screen bg-slate-200 px-4 py-10">

      {/* Search & Filter */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-300">
          <div className="relative flex-1">

            <input
              type="text"
              placeholder="Search notes by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-gray-500"/>
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-gray-500 bg-white cursor-pointer">
            <option value="latest">🕒 Latest First</option>
            <option value="oldest">📅 Oldest First</option>
          </select>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
          <button
            onClick={logout}
            className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-md transition">
            Logout
          </button>
        </div>


        {/* Create Note */}
        <form
          onSubmit={createNote}
          className="bg-slate-100 p-4 rounded-lg space-y-3 border border-gray-300">
          <input
            name="title"
            placeholder="Note Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 outline-none"/>

          <textarea
            name="description"
            placeholder="Note Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 rounded-md border border-gray-300 outline-none"/>

          <button className="w-full py-2 bg-gray-800 hover:bg-black rounded-md text-white">
            Add Note
          </button>
        </form>

        {/* Notes */}
        <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          Your Notes
        </h3>


        {filteredNotes.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No notes found.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div key={note._id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
            
            {/* edit note is equal to note id then show wdit note form */}
              {editId === note._id ? (
                <div>
                  <input
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded-md mb-2"/>

                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md"/>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => saveEdit(note._id)}
                      className="px-3 py-1 bg-black text-white rounded-md">
                      Save
                    </button>

                    <button
                      onClick={() => setEditId(null)}
                      className="px-3 py-1 bg-gray-300 rounded-md">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // else display all notes
                <div>
                  <h4 className="text-lg font-medium">{note.title}</h4>
                  <p className="text-gray-700 mt-2">{note.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => startEdit(note)}
                      className="px-3 py-1 bg-black text-white rounded-md">
                      Edit
                    </button>

                    <button
                      onClick={() => deleteNote(note._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
