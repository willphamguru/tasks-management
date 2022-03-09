import { shallow } from "enzyme";
describe("<ExampleComponent />", () => {
  it("renders create button", () => {
    const wrapper = shallow(<ExampleComponent />);
    expect(wrapper.find("Create New Task")).to.have.lengthOf(1);
  });
});
