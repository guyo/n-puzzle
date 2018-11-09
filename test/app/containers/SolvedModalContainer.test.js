import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import SolvedModalContainer from '../../../src/app/containers/SolvedModalContainer';
import { closeSolvedModal, openNewGameModal } from '../../../src/app/actions/modalActions';

const mockStore = configureMockStore();

const getStore = (canShowSolved, isSolved) => {
    return mockStore({
        modal: {
            canShowSolved
        },
        game: {
            puzzle: { isSolved }
        }
    });
};

describe('<SolvedModalContainer>', () => {
    it('should render when puzzle is solved and not closed', () => {
        const smWrapper=shallow(<SolvedModalContainer store=
            {getStore(true, () => true)}/>).dive().dive();
        expect(smWrapper.prop('show')).toBe(true);
    });

    it('should not render when puzzle is not solved', () => {
        const smWrapper=shallow(<SolvedModalContainer store=
            {getStore(true, () => false)}/>).dive().dive();
        expect(smWrapper.prop('show')).toBe(false);
    });

    it('should not render after close', () => {
        const smWrapper=shallow(<SolvedModalContainer store=
            {getStore(false, () => true)}/>).dive().dive();
        expect(smWrapper.prop('show')).toBe(false);
    });

    it('should close without further action when "No" is clicked', () => {
        const dispatch=jest.fn();
        const store=getStore(true, () => true);
        store.dispatch=dispatch;
        const smWrapper=mount(<SolvedModalContainer store=
            {store}/>);
        smWrapper.find('Button[children="No"]').simulate('click');

        expect(dispatch).toBeCalledWith(closeSolvedModal());
    });

    it('should invoke newGameModal when "Yes" is clicked', () => {
        const dispatch=jest.fn();
        const store=getStore(true, () => true);
        store.dispatch=dispatch;
        const smWrapper=mount(<SolvedModalContainer store={store}/>);

        smWrapper.find('Button[children="Yes"]').simulate('click');
        expect(dispatch).toBeCalledWith(openNewGameModal());
    });
});

