import { i as onDestroy } from "../../../../chunks/internal.js";
import { a as head, b as escape_html, i as ensure_array_like, n as bind_props, r as derived, t as attr_class, y as attr } from "../../../../chunks/server.js";
import "../../../../chunks/client.js";
import "../../../../chunks/navigation.js";
import { a as archive_icon_default, c as mail_icon_default, d as email_warning_icon_default, i as notes_icon_default, l as mail_alert_icon_default, n as star_icon_default, o as trash_icon_default, r as tag_icon_default, s as send_email_icon_default, t as emails_default, u as inbox_icon_default } from "../../../../chunks/Button_start.js";
//#region src/lib/tasks/stressless_task.svelte
function Stressless_task($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let emails = emails_default.map((e) => ({ ...e }));
		let selectedEmail = null;
		let activeFolder = "inbox";
		const DURATION_MS = .5 * 60 * 1e3;
		let { sessionId, remaining = DURATION_MS } = $$props;
		let running = false;
		derived(() => () => {
			const m = Math.floor(remaining / 6e4);
			const s = Math.floor(remaining % 6e4 / 1e3);
			const ms = remaining % 1e3;
			return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
		});
		derived(() => remaining < 6e4 && running);
		derived(() => remaining < 1.5 * 6e4 && running);
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
		let ws;
		onDestroy(() => ws?.close());
		head("1otuk2h", $$renderer, ($$renderer) => {
			$$renderer.push(`<link rel="icon" href="/favicon.svg"/>`);
		});
		$$renderer.push(`<div class="email-app"><div class="container"><section class="top"><div class="top_title"><h1>Outmail</h1> <img class="top_icon"${attr("src", mail_icon_default)} alt="mail logo"/></div></section> <section class="tool_sidebar"><div id="inbox"${attr_class("sidebar_item", void 0, {
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
//#region src/routes/task_routes/task-stressless-route/+page.svelte
function _page($$renderer) {
	Stressless_task($$renderer, {});
}
//#endregion
export { _page as default };
