import { db } from "../Firebase.js";
import { collection, addDoc } from "firebase/firestore";

const locations = {
  Beacock: { studyRooms: 2, meetingRooms: 0 },
  Bostwick: { studyRooms: 4, meetingRooms: 3 },
  Byron: { studyRooms: 3, meetingRooms: 2 },
  Carson: { studyRooms: 0, meetingRooms: 1 },
  Central: { studyRooms: 8, meetingRooms: 4 },
  Cherryhill: { studyRooms: 2, meetingRooms: 1 },
  Crouch: { studyRooms: 4, meetingRooms: 2 },
  EastLondon: { studyRooms: 4, meetingRooms: 3 },
  Glanworth: { studyRooms: 1, meetingRooms: 0 },
  Jalna: { studyRooms: 3, meetingRooms: 2 },
  Lambeth: { studyRooms: 2, meetingRooms: 1 },
  Landon: { studyRooms: 3, meetingRooms: 2 },
  Masonville: { studyRooms: 5, meetingRooms: 3 },
  PondMills: { studyRooms: 3, meetingRooms: 3 },
  Sherwood: { studyRooms: 2, meetingRooms: 1 },
  StoneyCreek: { studyRooms: 4, meetingRooms: 3 },
};

const generateRooms = () => {
  let rooms = [];
  Object.entries(locations).forEach(
    ([location, { studyRooms, meetingRooms }]) => {
      for (let i = 1; i <= studyRooms; i++) {
        rooms.push({
          name: `Study Room ${i}`,
          location,
          type: "Study Room",
          capacity: 4,
          equipment: ["Whiteboard"],
        });
      }
      for (let i = 1; i <= meetingRooms; i++) {
        rooms.push({
          name: `Meeting Room ${i}`,
          location,
          type: "Meeting Room",
          capacity: 10,
          equipment: ["TV", "Microphone"],
        });
      }
    }
  );
  return rooms;
};

const addRoomsToFirestore = async () => {
  const rooms = generateRooms();
  try {
    for (const room of rooms) {
      await addDoc(collection(db, "rooms"), room);
    }
    console.log("Rooms added successfully!");
  } catch (error) {
    console.error("Error adding rooms: ", error);
  }
};

// Run the script
addRoomsToFirestore();
