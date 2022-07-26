import './bootstrap';
import '../css/app.scss';

// global
import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import {Provider} from 'react-redux'
import { store } from './store/store'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'MyCloud';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        return render(
            <Provider store={store}>
                <App {...props} />
            </Provider>,
    el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
