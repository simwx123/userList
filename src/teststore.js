import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  users: {
    1: {
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      email: "george.bluth@reqres.in",
      first_name: "George",
      id: 1,
      last_name: "Bluth",
    },
    2: {
      avatar: "https://reqres.in/img/faces/2-image.jpg",
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      id: 2,
      last_name: "Weaver",
    },
    3: {
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      email: "emma.wong@reqres.in",
      first_name: "Emma",
      id: 3,
      last_name: "Wong",
    },
    4: {
      avatar: "https://reqres.in/img/faces/4-image.jpg",
      email: "eve.holt@reqres.in",
      first_name: "Eve",
      id: 4,
      last_name: "Holt",
    },
    5: {
      avatar: "https://reqres.in/img/faces/5-image.jpg",
      email: "charles.morris@reqres.in",
      first_name: "Charles",
      id: 5,
      last_name: "Morris",
    },
    6: {
      avatar: "https://reqres.in/img/faces/6-image.jpg",
      email: "tracey.ramos@reqres.in",
      first_name: "Tracey",
      id: 6,
      last_name: "Ramos",
    },
    "p1:6": [1, 2, 3, 4, 5, 6],
    "t1:6": 12,
  },
});

export default store;
