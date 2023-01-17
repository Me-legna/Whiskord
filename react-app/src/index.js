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
        <ModalProvider>
            <ReduxProvider store={store}>
                <BrowserRouter>
                    <App />
                    <Modal />
                </BrowserRouter>
            </ReduxProvider>
        </ModalProvider>
    );
}


ReactDOM.render(
    <React.StrictMode>
            <Root />
    </React.StrictMode>,
    document.getElementById('root')
);
