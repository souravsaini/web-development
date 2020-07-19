const users = [];

//add user
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(user => user.name === name && user.room === room);
  if(existingUser) {
    return {error: "username is taken"};
  }
  const user = {id, name, room}; //ES6 feature (same as {id: id, name: name, room: room})
  users.push(user);
  return {user};
}

//remove user
const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  if(index !== -1)
    return users.splice(index, 1)[0];
  else
    return {error: "user not present"};
}


//get single user
const getUser = id => {
  return users.find(user => user.id === id);
}

//get users in a given room
const getUsersInRoom = room => {
  return users.filter(user => user.room === room)
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
