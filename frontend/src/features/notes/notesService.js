import axios from "axios";

const NOTES_URL = "https://support-desk-7hlh.onrender.com/api/notes";

const addNotes = async (formData, token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${NOTES_URL}/${formData.ticketId}`,
    formData,
    option
  );

  return response.data;
};

const allNotes = async (ticketId, token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const AllNotes_URL = `${NOTES_URL}/${ticketId}`;
  const response = await axios.get(AllNotes_URL, option);
  return response.data;
};

const notesService = {
  addNotes,
  allNotes,
};

export default notesService;
