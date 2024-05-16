import React, {useEffect, useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { addAxiosInterceptors } from 'misc/requests';
import * as pages from 'constants/pages';
import AuthoritiesProvider from 'misc/providers/AuthoritiesProvider';
import DefaultPage from 'pageProviders/Default';
import Loading from 'components/Loading';
import LoginPage from 'pageProviders/Login';
import PageContainer from 'pageProviders/components/PageContainer';
import pageURLs from 'constants/pagesURLs';
import SecretPage from 'pageProviders/Secret';
import ThemeProvider from 'misc/providers/ThemeProvider';
import UserProvider from 'misc/providers/UserProvider';

import actionsUser from '../actions/user';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';
import SearchParamsConfigurator from '../components/SearchParamsConfigurator';
import PlayersPage from "pageProviders/Players";
import PlayerInf from "../../pageProviders/PlayerInf";
import ModalComponent from "../../components/ModalPlayer/ModalPlayer";


function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    componentDidMount: false,
  });
  const [players, setPlayers] = useState(function ()
      {
        const storeValue = localStorage.getItem("players")
        return JSON.parse(storeValue)
      }
  );
  const {
    errors,
    isFailedSignIn,
    isFailedSignUp,
    isFetchingSignIn,
    isFetchingSignUp,
    isFetchingUser,
  } = useSelector(({ user }) => user);
  const [player, setPlayer] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayerClick = (clickedPlayer) => {
    setPlayer(clickedPlayer);
    setIsModalOpen(true);
  };

  useEffect(() => {
    addAxiosInterceptors({
      onSignOut: () => dispatch(actionsUser.fetchSignOut()),
    });
    dispatch(actionsUser.fetchUser());
    setState({
      ...state,
      componentDidMount: true,
    });
  }, []);
  useEffect(() => {
    if (players.length === 0) {
      const defaultPlayers = [
        { id: 1, name: 'Kevin Durant ', position: 'Small Forward',age: '34' , team:'Phoenix Suns', titles:'2'},
        { id: 2, name: 'Devin Booker', position: 'Point Guard',age: '28' , team:'Phoenix Suns', titles:'0'},
        { id: 3, name: 'Anthony Edwards', position: 'Point Guard',age: '23' , team:'Minnesota Timberwolves', titles:'0'},
        { id: 4, name: 'Lebron James', position: 'Small Forward',age: '39', team:'Los Angelos Lakers', titles:'4' }
      ];
      setPlayers(defaultPlayers);
      localStorage.setItem('players', JSON.stringify(defaultPlayers));
    } else {
      localStorage.setItem('players', JSON.stringify(players));
    }
  }, [players]);

  return (
      <UserProvider>
        <AuthoritiesProvider>
          <ThemeProvider>
            <BrowserRouter>
              <SearchParamsConfigurator />
              {/* This is needed to let first render passed for App's
              * configuration process will be finished (e.g. locationQuery
              * initializing) */}
              {state.componentDidMount && (
                  <IntlProvider>
                    <Header onLogout={() => dispatch(actionsUser.fetchSignOut())} />
                    {isFetchingUser && (
                        <PageContainer>
                          <Loading />
                        </PageContainer>
                    )}
                    {!isFetchingUser && (
                        <Routes>
                          <Route
                              element={<DefaultPage />}
                              path={`${pageURLs[pages.defaultPage]}`}
                          />
                          <Route
                              element={<PlayersPage
                                  players={players}
                                  setPlayers={setPlayers}
                                  setPlayer={setPlayer}
                                  onPlayerClick={handlePlayerClick} // Pass handlePlayerClick function as prop
                              />}
                              path={`${pageURLs[pages.playersPage]}`}
                          />
                          <Route
                              element={<SecretPage />}
                              path={`${pageURLs[pages.secretPage]}`}
                          />

                          <Route
                              element={<PlayerInf players={players} setPlayers={setPlayers} />}
                              path={`${pageURLs[pages.playerInfPage]}`}
                          />
                          />
                          <Route
                              element={(
                                  <LoginPage
                                      errors={errors}
                                      isFailedSignIn={isFailedSignIn}
                                      isFailedSignUp={isFailedSignUp}
                                      isFetchingSignIn={isFetchingSignIn}
                                      isFetchingSignUp={isFetchingSignUp}
                                      onSignIn={({
                                                   email,
                                                   login,
                                                   password,
                                                 }) => dispatch(actionsUser.fetchSignIn({
                                        email,
                                        login,
                                        password,
                                      }))}
                                      onSignUp={({
                                                   email,
                                                   firstName,
                                                   lastName,
                                                   login,
                                                   password,
                                                 }) => dispatch(actionsUser.fetchSignUp({
                                        email,
                                        firstName,
                                        lastName,
                                        login,
                                        password,
                                      }))}
                                  />
                              )}
                              path={`${pageURLs[pages.login]}`}
                          />
                          <Route
                              element={(
                                  <MissedPage
                                      redirectPage={`${pageURLs[pages.defaultPage]}`}
                                  />
                              )}
                              path="*"
                          />
                        </Routes>
                    )}
                  </IntlProvider>
              )}
            </BrowserRouter>
            {isModalOpen && (
                <ModalComponent player={player} onClose={() => setIsModalOpen(false)} />
            )}
          </ThemeProvider>
        </AuthoritiesProvider>
      </UserProvider>
  );
}

export default App;