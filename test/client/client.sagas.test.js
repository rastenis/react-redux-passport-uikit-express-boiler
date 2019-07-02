import * as sagas from "../../src/client/store/sagas";
jest.mock('axios');
import axios from "axios";

//If you use get, post write as below, If you are using axios(config) dont need to mock below
jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));

// saga tests
describe("sagas", async () => {

  it("should perform an authentication saga", async () => {

    let saga = sagas.authenticationSaga({});
    saga.next();
    axios.post.mockImplementation(() => { return { state: {}, people: [], msg: "Success!" } })
    let c = saga.next({ email: "example@email.com", password: "password" })
    // should return the mocked result
    console.log(c.value);
    expect(c.value).toEqual({ state: {}, people: [], msg: "Success!" })

    return;
  })

});

// import * as sagas from "../../src/client/store/sagas";
// import * as mutations from "../../src/client/store/mutations";

// import axios from "axios";
// import MockAdapter from "axios-mock-adapter"
// import { testSaga } from 'redux-saga-test-plan';

// // saga tests
// describe("sagas", async () => {

//   it("should perform an authentication saga", async () => {

//     // This sets the mock adapter on the default instance
//     var mock = new MockAdapter(axios);

//     // Mock any GET request to /users
//     // arguments for reply are (status, data, headers)
//     mock.onPost('/api/auth').reply(200, {
//       state: { testing: true }, people: [], msg: "Success!"
//     });

//     testSaga(sagas.authenticationSaga, { data: {}, auth: 'WAITING', messages: [] })
//       .next()
//       .take(mutations.REQUEST_AUTH)
//       .next({ email: "", password: "" })
//       .put(mutations.setData({ testing: true }))
//   })

// });
