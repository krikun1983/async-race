import { App } from './app';
import { Garage } from './components/page-garage-view/garage/garage';
import { store } from './store';
import './style.scss';

const { body } = document;

window.onload = () => {
  store.getCars().then(() => {
    new App(body).render();
    new Garage().listen();
  });
};
