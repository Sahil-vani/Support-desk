import axios from "axios";

const TICKET_URL = "https://support-desk-7hlh.onrender.com/api/ticket";

// create ticket
const raiseTicket = async (formData, token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(TICKET_URL, formData, option);
  return response.data;
};

//All tickets
const allTicket = async (token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(TICKET_URL, option);

  return response.data;
};

// single ticket
const singleTicket = async (ticketId, token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(TICKET_URL + "/" + ticketId, option);
  return response.data;
};

// update ticket
const updateTicket = async (updatedTicket, token) => {
  const ticketId = updatedTicket._id;

  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${TICKET_URL}/${ticketId}`,
    updatedTicket,
    option
  );

  return response.data;
};

// delete ticket
const deleteTicket = async (ticketId, token) => {
  const option = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${TICKET_URL}/${ticketId}`, option);
  // if (response.data.success) {
  //   allTicket
  // }
  return response.data;
};

const ticketService = {
  raiseTicket,
  allTicket,
  singleTicket,
  updateTicket,
  deleteTicket,
};

export default ticketService;
