import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(preloadedState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composeEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, preloadedState, composeEnhancers);
  return store
}
