import React from 'react';
import NewGameModalContainer from '../../../src/app/containers/NewGameModalContainer';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { Modal, Button, FormGroup } from 'react-bootstrap';
import { newGame } from '../../../src/app/actions/gameActions';
import { closeNewGameModal } from '../../../src/app/actions/modalActions';


const mockStore = configureMockStore();

const getStore = (showNewGame = true, showInit = false) => {
    return mockStore({
        modal: {
            showNewGame,
            showInit
        },

    });
};

describe('<NewGameModalContainer>', () => {
    it('should show welcome message and be unclosable when open in init mode', () => {
        const modal = shallow(<NewGameModalContainer store={getStore(false, true)} />).dive().dive().dive();
        expect(modal.prop('show')).toBe(true);
        expect(modal.prop('backdrop')).toBe('static');

        expect(modal.find(Modal.Title).childAt(0).text()).toContain('Welcome');

        const button = modal.find(Button);
        expect(button.length).toBe(1);
        expect(button.prop('id')).toBe('newgamestart');
    });


    it('should show a closable new game button when in regular mode', () => {
        const modal = shallow(<NewGameModalContainer store={getStore()} />).dive().dive().dive();
        expect(modal.prop('show')).toBe(true);
        expect(modal.prop('backdrop')).toBe(true);

        expect(modal.find(Modal.Title).childAt(0).text()).toContain('Start');

        const button = modal.find(Button);
        expect(button.length).toBe(2);
    });

    it('should show no modal when modal is closed', () => {
        const modal = shallow(<NewGameModalContainer store={getStore(false)} />).dive().dive();
        expect(modal.prop('show')).toBe(false);
    });

    it('should validate that input is a number in the valid range', () => {
        const modal = mount(<NewGameModalContainer store={getStore()} />);
        const input = modal.find('input');

        expect(modal.find(FormGroup).prop('validationState')).toBeNull();

        input.simulate('change', { target: { value: '1' } });
        expect(modal.find(FormGroup).prop('validationState')).toBe('error');

        input.simulate('change', { target: { value: '50' } });
        expect(modal.find(FormGroup).prop('validationState')).toBe('error');

        input.simulate('change', { target: { value: 'abc' } });
        expect(modal.find(FormGroup).prop('validationState')).toBe('error');

        input.simulate('change', { target: { value: '4' } });
        expect(modal.find(FormGroup).prop('validationState')).toBeNull();
    });


    it('should start a new game when a valid number is entered and the button pressed', () => {
        const store = getStore();
        store.dispatch = jest.fn();
        const wrapper = mount(<NewGameModalContainer store={store} />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: '3' } });

        // check that value has changed (need to refind the element due to enzyme)
        expect(wrapper.find('input').prop('value')).toBe('3');
        const button = wrapper.find('button#newgamestart');

        // make sure that validation succeeded
        expect(button.prop('disabled')).toBe(false);
        expect(wrapper.find('.help-block').length).toBe(0);

        // make sure new game event is launched when clicked
        button.simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(newGame(3));

        // make sure new game event is launched when form submit
        store.dispatch.mockClear();
        input.simulate('change', { target: { value: '7' } });
        wrapper.find('form').simulate('submit');
        expect(store.dispatch).toHaveBeenCalledWith(newGame(7));
    });

    it('should fail on validation and not allow to submit when value is illegal', () => {
        const store = getStore();
        store.dispatch = jest.fn();
        const wrapper = mount(<NewGameModalContainer store={store} />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: '1' } });

        // make sure validation failed
        const button = wrapper.find('button#newgamestart');
        expect(button.prop('disabled')).toBe(true);
        expect(wrapper.find('.help-block').length).toBe(1);

        // make sure  new game event is not launched when clicked
        button.simulate('click');
        expect(store.dispatch).not.toHaveBeenCalled();

        // make sure new game event is not launched when form is submitted
        wrapper.find('form').simulate('submit');
        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should close when each of the close buttons is clicked', () => {
        const store = getStore();
        store.dispatch = jest.fn();
        const wrapper = mount(<NewGameModalContainer store={store} />);

        wrapper.find('button#newgamecancel').simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(closeNewGameModal());

        store.dispatch.mockClear();

        wrapper.find('button.close').simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(closeNewGameModal());
    });
});
