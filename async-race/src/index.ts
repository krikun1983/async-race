import App from './app';
import Garage from './components/page-garage-view/garage';
import WinnersView from './components/page-winners-view/winners';
import store from './store';
import './style.scss';

const { body } = document;

window.onload = () => {
  const garage = new Garage();
  store.getCars().then(() => {
    new App(body).render();
    body.addEventListener('click', () => {
      garage.listen();
      new WinnersView().listenWinners();
    });
    garage.updateStateGarage();
    store.getWinners().then(() => {
      garage.renderGarage();
    });
  });
};
