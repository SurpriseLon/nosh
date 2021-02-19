import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { InitialState, Themes } from '../state/reducers';
import Header from './Header';
import ItemList from './ItemList';
import ItemView from './ItemView';
import Onboarding from './Onboarding';
import SubscribeFeedModal from './modals/SubscribeFeedModal';
import AboutModal from './modals/AboutModal';
import { setTheme } from '../state/actions';

const App: React.FC<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> = ({ modal, selectedFeed, theme, setTheme }) => {
  React.useEffect(() => {
    if (theme === Themes.DARK) {
      document.documentElement.classList.add('dark');
      setTheme(Themes.DARK);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, setTheme]);

  return (
    <>
      <div className="antialiased min-h-screen flex flex-col-reverse md:flex-row text-black dark:text-white">
        <Header />
        <div role="main" className="flex-1 flex min-w-0">
          {selectedFeed !== null ? (
            <>
              <ItemList />
              <ItemView />
            </>
          ) : (
            <Onboarding />
          )}
        </div>
      </div>
      {modal === 'ABOUT' ? <AboutModal /> : null}
      {modal === 'SUBSCRIBE' ? <SubscribeFeedModal /> : null}
    </>
  );
};

const mapStateToProps = (state: InitialState) => ({
  selectedFeed: state.selectedFeed,
  modal: state.ui.modal,
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheme: (theme: Themes) => dispatch(setTheme(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
