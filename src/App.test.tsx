import React from "react";
import { Provider } from "react-redux";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import store from "./teststore";
import App from "./App";
import { TableList } from "./components/TableList";
import { Smodal } from "./components/Smodal";

let wrapper: any;
const search = "?page=1&size=6";

configure({ adapter: new Adapter() });
jest.mock("react-router-dom", () => ({
	useLocation: () => ({
		pathname: "/",
		search,
	}),
	useHistory: () => ({
		push: jest.fn(),
	}),
}));

describe("User page", () => {
	beforeAll(() => {
		delete window.matchMedia;
		window.matchMedia = (query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // deprecated
			removeListener: jest.fn(), // deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		});
	});

	const expectedPayload = { type: "GET_USERS" };
	const usersaction = () => expectedPayload;

	it("Users store actions", () => {
		store.dispatch(usersaction());
		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	it("App to be defined", () => {
		wrapper = mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		expect(wrapper).toBeDefined();
	});

	it("TableList components", () => {
		expect(wrapper.find(TableList).exists()).toBeTruthy();
	});

	it("should contain data", () => {
		expect(wrapper.find("tbody").find("tr").length).toEqual(7);
	});

	it("Test showing quickview ", async () => {
		wrapper.find(".ant-table-row").first().simulate("click");
		expect(wrapper.find(Smodal).length).toEqual(1);
	});
});
