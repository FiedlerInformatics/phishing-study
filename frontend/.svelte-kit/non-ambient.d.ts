
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/introductions_routes" | "/introductions_routes/ATI_intro-route" | "/introductions_routes/NASA-TLX_intro-route" | "/introductions_routes/NASA-TLX_intro_stress-route" | "/introductions_routes/end-route" | "/introductions_routes/grand_intro-route" | "/introductions_routes/task-stress_intro-route" | "/introductions_routes/task-stressless_intro-route" | "/surveys_routes" | "/surveys_routes/ATI_route" | "/surveys_routes/NASA-TLX_survey-route" | "/surveys_routes/survey_demographic-route" | "/task_routes" | "/task_routes/task-stress-route" | "/task_routes/task-stressless-route";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/introductions_routes": Record<string, never>;
			"/introductions_routes/ATI_intro-route": Record<string, never>;
			"/introductions_routes/NASA-TLX_intro-route": Record<string, never>;
			"/introductions_routes/NASA-TLX_intro_stress-route": Record<string, never>;
			"/introductions_routes/end-route": Record<string, never>;
			"/introductions_routes/grand_intro-route": Record<string, never>;
			"/introductions_routes/task-stress_intro-route": Record<string, never>;
			"/introductions_routes/task-stressless_intro-route": Record<string, never>;
			"/surveys_routes": Record<string, never>;
			"/surveys_routes/ATI_route": Record<string, never>;
			"/surveys_routes/NASA-TLX_survey-route": Record<string, never>;
			"/surveys_routes/survey_demographic-route": Record<string, never>;
			"/task_routes": Record<string, never>;
			"/task_routes/task-stress-route": Record<string, never>;
			"/task_routes/task-stressless-route": Record<string, never>
		};
		Pathname(): "/" | "/introductions_routes/ATI_intro-route" | "/introductions_routes/NASA-TLX_intro-route" | "/introductions_routes/NASA-TLX_intro_stress-route" | "/introductions_routes/end-route" | "/introductions_routes/grand_intro-route" | "/introductions_routes/task-stress_intro-route" | "/introductions_routes/task-stressless_intro-route" | "/surveys_routes/ATI_route" | "/surveys_routes/NASA-TLX_survey-route" | "/surveys_routes/survey_demographic-route" | "/task_routes/task-stress-route" | "/task_routes/task-stressless-route";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/email_assets/OneDrive-Symbol.png" | "/email_assets/adidas.png" | "/email_assets/apple-logo.png" | "/email_assets/aymasim.png" | "/email_assets/dropbox-logo.png" | "/email_assets/favicon.svg" | "/email_assets/immoscout24.png" | "/email_assets/microsoft-logo.png" | "/email_assets/nivea-logo.png" | "/email_assets/nivea.png" | "/email_assets/norton.png" | "/email_assets/payback-rewe.png" | "/email_assets/tipico.png" | "/email_assets/unidays.png" | "/email_assets/zalando.png" | "/favicon.svg" | "/icons.svg" | "/snapshots/ImmoScout24.html" | "/snapshots/adidas.html" | "/snapshots/amaysim.html" | "/snapshots/dropbox.html" | "/snapshots/microsoft.html" | "/snapshots/myunidays.html" | "/snapshots/nivea.html" | "/snapshots/norton.html" | "/snapshots/onedrive.html" | "/snapshots/rewe.html" | "/snapshots/tipico.html" | "/snapshots/zalando.html" | string & {};
	}
}