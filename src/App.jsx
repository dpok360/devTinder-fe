import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import appStore from './utils/store/appStore';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from './components/Requests';
import Premium from './components/Premium';
import Chat from './components/Chat';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Error';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <ErrorBoundary fallback={<Error />}>
        <Provider store={appStore}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
