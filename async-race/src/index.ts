import { App } from './app';
import { store } from './store';
import './style.scss';

const { body } = document;

window.onload = () => {
  store.getCars().then(() => {
    new App(body).render();
  });
};
