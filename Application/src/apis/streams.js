import axios from "axios";

export default axios.create({
  // we are saving the base ULR in here for increased modularity
  baseURL: "http://localhost:3001"
});

//are we going up to git ?
