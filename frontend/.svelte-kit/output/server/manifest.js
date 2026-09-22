export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["email_assets/OneDrive-Symbol.png","email_assets/adidas.png","email_assets/apple-logo.png","email_assets/aymasim.png","email_assets/dropbox-logo.png","email_assets/favicon.svg","email_assets/immoscout24.png","email_assets/microsoft-logo.png","email_assets/nivea-logo.png","email_assets/nivea.png","email_assets/norton.png","email_assets/payback-rewe.png","email_assets/tipico.png","email_assets/unidays.png","email_assets/zalando.png","favicon.svg","icons.svg","snapshots/ImmoScout24.html","snapshots/adidas.html","snapshots/amaysim.html","snapshots/dropbox.html","snapshots/microsoft.html","snapshots/myunidays.html","snapshots/nivea.html","snapshots/norton.html","snapshots/onedrive.html","snapshots/rewe.html","snapshots/tipico.html","snapshots/zalando.html"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".html":"text/html"},
	_: {
		client: {start:"_app/immutable/entry/start.BEwhZtd-.js",app:"_app/immutable/entry/app.DMV0Niw5.js",imports:["_app/immutable/entry/start.BEwhZtd-.js","_app/immutable/chunks/BqhZLBLo.js","_app/immutable/chunks/D0SsQWSv.js","_app/immutable/entry/app.DMV0Niw5.js","_app/immutable/chunks/D0SsQWSv.js","_app/immutable/chunks/O6-aNYLC.js","_app/immutable/chunks/CP97kCR3.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/introductions_routes/NASA-TLX_intro-route",
				pattern: /^\/introductions_routes\/NASA-TLX_intro-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/introductions_routes/NASA-TLX_intro_stress-route",
				pattern: /^\/introductions_routes\/NASA-TLX_intro_stress-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/introductions_routes/end-route",
				pattern: /^\/introductions_routes\/end-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/introductions_routes/grand_intro-route",
				pattern: /^\/introductions_routes\/grand_intro-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/introductions_routes/task-stress_intro-route",
				pattern: /^\/introductions_routes\/task-stress_intro-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/introductions_routes/task-stressless_intro-route",
				pattern: /^\/introductions_routes\/task-stressless_intro-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/surveys_routes/NASA-TLX_survey-route",
				pattern: /^\/surveys_routes\/NASA-TLX_survey-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/surveys_routes/survey_demographic-route",
				pattern: /^\/surveys_routes\/survey_demographic-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/task_routes/task-stress-route",
				pattern: /^\/task_routes\/task-stress-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/task_routes/task-stressless-route",
				pattern: /^\/task_routes\/task-stressless-route\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
