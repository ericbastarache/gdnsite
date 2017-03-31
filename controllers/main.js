"use strict";

const config = require("../config.json");
const db = require("../helpers/db");
const common = require("../helpers/common");

module.exports.index = function* index() {
	let user = null;
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	yield this.render("index", {
		title: config.site.name,
		user: user
	});
};

module.exports.success = function* success() {
	let user = null;
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	yield this.render("success", {
		title: config.site.name,
		user: user
	});
};

module.exports.voted = function* voted() {
	let user = null;
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	yield this.render("voted", {
		title: config.site.name,
		user: user
	});
};

module.exports.join = function join() {
	this.redirect("https://discord.gg/sWsrrJQ");
};

module.exports.jam = function* jam() {
	let user = null;
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	yield this.render("jam", {
		title: config.site.name,
		user: user
	});
};

module.exports.gamejam = function* gamejam() {
	let user = null;
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
	}
	yield this.render("gamejam", {
		title: config.site.name,
		user: user
	});
};

module.exports.vote = function* vote() {
	let user = null;
	const data = yield db.runView("themes/all", null, "themes");
	let returnData = [];
	if (this.isAuthenticated()) {
		user = common.getPermissions(this.session.passport.user);
		for (const item of data.results) {
			if (item.value.voters.indexOf(`${user.username}#${user.discriminator}`) === -1) {
				item.canVote = true;
			}
			returnData.push(item);
		}
	} else {
		returnData = data.results;
	}
	yield this.render("vote", {
		title: config.site.name,
		user: user,
		themes: returnData
	});
};
