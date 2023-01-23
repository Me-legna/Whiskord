import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider, Modal } from './context/Modal';
import App from './App';
import './index.css';

import configureStore from './store';

const store = configureStore();

function Root() {
    return (
        <ReduxProvider store={store}>
            <ModalProvider>
                <BrowserRouter>
                    <App />
                    <Modal />
                </BrowserRouter>
            </ModalProvider>
        </ReduxProvider>
    );
}


ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);
