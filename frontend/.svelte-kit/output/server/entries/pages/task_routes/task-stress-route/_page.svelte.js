import { i as onDestroy } from "../../../../chunks/internal.js";
import { a as head, b as escape_html, i as ensure_array_like, n as bind_props, r as derived, t as attr_class, y as attr } from "../../../../chunks/server.js";
import "../../../../chunks/navigation.js";
import { a as archive_icon_default, c as mail_icon_default, d as email_warning_icon_default, i as notes_icon_default, l as mail_alert_icon_default, n as star_icon_default, o as trash_icon_default, r as tag_icon_default, s as send_email_icon_default, t as emails_default, u as inbox_icon_default } from "../../../../chunks/Button_start.js";
//#region src/lib/tasks/assets/heart-icon.svg
var heart_icon_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20version='1.1'%20viewBox='-5%20-10%2089.58593%2081.2491'%20id='svg2'%20sodipodi:docname='heart-icon.svg'%20width='89.58593'%20height='81.2491'%20inkscape:version='1.4.2%20(ebf0e940d0,%202025-05-08)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs%20id='defs2'%20/%3e%3csodipodi:namedview%20id='namedview2'%20pagecolor='%23ffffff'%20bordercolor='%23000000'%20borderopacity='0.25'%20inkscape:showpageshadow='2'%20inkscape:pageopacity='0.0'%20inkscape:pagecheckerboard='0'%20inkscape:deskcolor='%23d1d1d1'%20inkscape:zoom='5.9259259'%20inkscape:cx='44.8875'%20inkscape:cy='48.09375'%20inkscape:window-width='1920'%20inkscape:window-height='1011'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg2'%20/%3e%3cpath%20d='m%2080.4179,30.6252%20c%200,1.7266%20-1.3984,3.125%20-3.125,3.125%20h%20-23.328%20l%20-7.4062,11.109%20c%20-0.57812,0.87109%20-1.5547,1.3906%20-2.6016,1.3906%20-1.0469,0%20-2.0195,-0.51953%20-2.6016,-1.3906%20l%20-14.066,-21.098%20-5.7344,8.5977%20c%20-0.57812,0.87109%20-1.5547,1.3906%20-2.6016,1.3906%20h%20-16.66%20c%20-1.7266,0%20-3.125,-1.3984%20-3.125,-3.125%200,-1.7266%201.3984,-3.125%203.125,-3.125%20h%2014.996%20l%207.4062,-11.109%20c%201.1602,-1.7422%204.0391,-1.7422%205.1992,0%20l%2014.066,21.098%205.7344,-8.5977%20c%200.57812,-0.87109%201.5547,-1.3906%202.6016,-1.3906%20h%2025%20c%201.7266,0%203.125,1.3984%203.125,3.125%20z%20M%2077.3867,-2.8008%20C%2072.75,-7.4453%2066.5747,-10%2060.0117,-10%20c%20-6.563,0%20-12.73,2.5547%20-17.375,7.1992%20L%2039.7929,0.043%2036.9452,-2.8008%20C%2032.3085,-7.4453%2026.1362,-10%2019.5742,-10%2013.0078,-10%206.8402,-7.4453%202.1992,-2.8008%20-2.4414,1.8359%20-5,8.0112%20-5,14.5742%20c%200,3.3906%200.69531,6.668%201.9805,9.6797%201.4453,-1.207%203.2812,-1.9609%205.3086,-1.9609%20h%200.72266%20c%20-1.1172,-2.3945%20-1.7617,-5%20-1.7617,-7.7188%200,-4.8945%201.9062,-9.4961%205.3672,-12.957%203.4609,-3.4609%208.0625,-5.3672%2012.957,-5.3672%204.8945,0%209.4922,1.9023%2012.953,5.3672%20l%205.0547,5.0547%20c%201.2227,1.2227%203.1992,1.2227%204.418,0%20l%205.0547,-5.0547%20c%203.4609,-3.4609%208.0664,-5.3672%2012.957,-5.3672%204.8945,0%209.4961,1.9023%2012.957,5.3672%203.4609,3.457%205.3672,8.0625%205.3672,12.957%200,2.7148%20-0.64062,5.3125%20-1.7695,7.7188%20h%200.73047%20c%202.0273,0%203.8633,0.75391%205.3047,1.957%201.293,-3.0195%201.9844,-6.293%201.9844,-9.6758%200,-6.5625%20-2.5547,-12.734%20-7.1992,-17.375%20z%20m%20-37.594,66.316%20-22.637,-24.555%20h%20-8.5%20l%2028.84,31.285%20c%200.58984,0.64062%201.4258,1.0039%202.2969,1.0039%200.8711,0%201.707,-0.36719%202.2969,-1.0039%20l%2028.836,-31.285%20h%20-8.5%20z'%20id='path1'%20/%3e%3c/svg%3e";
//#endregion
//#region src/lib/tasks/stress_task.svelte
function Stress_task($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let emails = emails_default.map((e) => ({ ...e }));
		let selectedEmail = null;
		let activeFolder = "inbox";
		const DURATION_MS = .5 * 60 * 1e3;
		let { sessionId, remaining = DURATION_MS } = $$props;
		let running = false;
		const formatted = derived(() => () => {
			const m = Math.floor(remaining / 6e4);
			const s = Math.floor(remaining % 6e4 / 1e3);
			const ms = remaining % 1e3;
			return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
		});
		const isFinalCountdown = derived(() => remaining < 6e4 && running);
		const isFirstWarning = derived(() => remaining < 1.5 * 6e4 && running);
		let visibleEmails = derived(() => emails.filter((e) => e.folder === activeFolder));
		/** @param {string} isoString */
		function formatTime(isoString) {
			const date = new Date(isoString);
			const today = /* @__PURE__ */ new Date();
			return date.toDateString() === today.toDateString() ? date.toLocaleTimeString("de-DE", {
				hour: "2-digit",
				minute: "2-digit"
			}) : date.toLocaleDateString("de-DE", {
				day: "2-digit",
				month: "2-digit",
				year: "2-digit"
			});
		}
		let draggedEmail = null;
		let heartRate = null;
		let ws;
		onDestroy(() => ws?.close());
		let bmpWarning_visible = derived(() => heartRate !== null && heartRate >= 80);
		head("yqarho", $$renderer, ($$renderer) => {
			$$renderer.push(`<link rel="icon" href="/favicon.svg"/>`);
		});
		$$renderer.push(`<div class="email-app"><div class="container"><section class="top"><div class="top_title"><h1>Outmail</h1> <img class="top_icon"${attr("src", mail_icon_default)} alt="mail logo"/></div></section> `);
		if (bmpWarning_visible()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="stress_warning"><img id="heart_icon"${attr("src", heart_icon_default)} alt="heart icon"/> <div id="bpm_display"><h1>${escape_html(heartRate)} bpm</h1></div> <div id="warning_text"><h2>You seem stressed!</h2> <h3>You may be vulnerable to fraud and cyber attacks</h3></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="timer-container"><button${attr_class("timer-btn", void 0, {
			"firstWarning": isFirstWarning(),
			"finalCountdown": isFinalCountdown(),
			"expired": remaining === 0
		})}${attr("disabled", remaining === 0, true)}>`);
		if (remaining === DURATION_MS) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`▶ Start`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(formatted()())}`);
		}
		$$renderer.push(`<!--]--></button></div> <section class="tool_sidebar"><div id="inbox"${attr_class("sidebar_item", void 0, {
			"active": activeFolder === "inbox",
			"drop_target": draggedEmail != null
		})} role="button" tabindex="0"><img class="icon"${attr("src", inbox_icon_default)} alt="" aria-hidden="true"/> <h4>Inbox</h4></div> <div id="junk"${attr_class("sidebar_item", void 0, {
			"active": activeFolder === "junk",
			"drop_target": draggedEmail != null
		})} role="button" tabindex="0"><img class="icon"${attr("src", email_warning_icon_default)} alt="" aria-hidden="true"/> <h4>Junk Email</h4></div> <div id="starred"${attr_class("sidebar_item", void 0, {
			"active": activeFolder === "starred",
			"drop_target": draggedEmail != null
		})} role="button" tabindex="0"><img class="icon"${attr("src", star_icon_default)} alt="" aria-hidden="true"/> <h4>Starred</h4></div> <div id="drafts"${attr_class("sidebar_item", void 0, {
			"active": activeFolder === "drafts",
			"drop_target": draggedEmail != null
		})} role="button" tabindex="0"><img class="icon"${attr("src", mail_alert_icon_default)} alt="" aria-hidden="true"/> <h4>Drafts</h4></div> <div id="sent_items"${attr_class("sidebar_item", void 0, {
			"active": activeFolder === "sent",
			"drop_target": draggedEmail != null
		})} role="button" tabindex="0"><img class="icon"${attr("src", send_email_icon_default)} alt="" aria-hidden="true"/> <h4>Sent items</h4></div> <div id="deleted"${attr_class("sidebar_item", void 0, {
			"active": activeFolder === "deleted",
			"drop_target": draggedEmail != null
		})} role="button" tabindex="0"><img class="icon"${attr("src", trash_icon_default)} alt="" aria-hidden="true"/> <h4>Deleted</h4></div> <div id="archive"${attr_class("sidebar_item", void 0, {
			"active": activeFolder === "archive",
			"drop_target": draggedEmail != null
		})} role="button" tabindex="0"><img class="icon"${attr("src", archive_icon_default)} alt="" aria-hidden="true"/> <h4>Archive</h4></div> <div id="notes"${attr_class("sidebar_item", void 0, { "active": activeFolder === "notes" })} role="button" tabindex="0"><img class="icon"${attr("src", notes_icon_default)} alt="" aria-hidden="true"/> <h4>Notes</h4></div> <div id="tags"${attr_class("sidebar_item", void 0, { "active": activeFolder === "tags" })} role="button" tabindex="0"><img class="icon"${attr("src", tag_icon_default)} alt="" aria-hidden="true"/> <h4>Tags</h4></div></section> <section class="email_window"><ul class="email_list" role="list"><!--[-->`);
		const each_array = ensure_array_like(visibleEmails());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let email = each_array[$$index];
			$$renderer.push(`<li${attr_class("email_row", void 0, {
				"selected": selectedEmail?.id === email.id,
				"unread": !email.read
			})} draggable="true" role="button" tabindex="0"><div class="email_row_top"><span class="email_sender">${escape_html(email.sender)}</span> <span class="email_time">${escape_html(formatTime(email.timestamp))}</span></div> <div class="email_row_bottom"><span class="email_subject">${escape_html(email.subject)}</span> <span class="email_preview">${escape_html(email.preview)}</span></div></li>`);
		}
		$$renderer.push(`<!--]--> `);
		if (visibleEmails().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<li class="email_empty">Keine E-Mails in diesem Ordner.</li>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></ul> <div class="email_detail_pane">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<p class="email_placeholder">Wählen Sie eine E-Mail aus der Liste aus.</p>`);
		$$renderer.push(`<!--]--></div></section></div></div>`);
		bind_props($$props, { remaining });
	});
}
//#endregion
//#region src/routes/task_routes/task-stress-route/+page.svelte
function _page($$renderer) {
	Stress_task($$renderer, {});
}
//#endregion
export { _page as default };
