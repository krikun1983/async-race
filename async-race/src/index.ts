import App from './app';
import Garage from './components/page-garage-view/garage';
import WinnersView from './components/page-winners-view/winners';
import store from './store';
import './style.scss';

const { body } = document;

window.onload = () => {
  store.getCars().then(() => {
    new App(body).render();
    new Garage().listen();
    new Garage().updateStateGarage();
    store.getWinners().then(() => {
      new Garage().renderGarage();
    });
    new WinnersView().renders();
  });
};
