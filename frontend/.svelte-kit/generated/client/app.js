// in dev, this makes Vite inject its client as this module's first dependency,
// so that global constant replacements are installed before any other module
// (including user hooks) evaluates. In build it's inert.
import.meta.hot;




export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/introductions_routes/ATI_intro-route": [3],
		"/introductions_routes/NASA-TLX_intro-route": [4],
		"/introductions_routes/NASA-TLX_intro_stress-route": [5],
		"/introductions_routes/end-route": [6],
		"/introductions_routes/grand_intro-route": [7],
		"/introductions_routes/task-stress_intro-route": [8],
		"/introductions_routes/task-stressless_intro-route": [9],
		"/surveys_routes/ATI_route": [10],
		"/surveys_routes/NASA-TLX_survey-route": [11],
		"/surveys_routes/survey_demographic-route": [12],
		"/task_routes/task-stress-route": [13],
		"/task_routes/task-stressless-route": [14]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';

export const get_error_template = () => import('../shared/error-template.js').then(m => m.default);