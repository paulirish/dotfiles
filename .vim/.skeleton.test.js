import React       from 'react';
import { shallow } from 'enzyme';
import MyComponent    from './BackIcon';

describe('<MyComponent />', () => {
  const wrapper = shallow(<MyComponent />);
  it('should render an icon', ()=>{
    expect(wrapper.name()).toBe('Icon');
  });
});
