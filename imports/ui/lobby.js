import { Template } from 'meteor/templating';

import { Rooms, Players } from '../api/collections.js';

import './lobby.html';

Template.lobby.helpers({
  players: function() {
    let playerId = Session.get("playerId");
    let roomId = Session.get("roomId");
    let room = Rooms.findOne(roomId);
    if (!room) {
      return null;
    }
debugger
    return Players.find({ roomId: roomId }).fetch().map(
      function(player) {
        console.log(player);
        // set player.current to be player._id if player._id is equal to playerId
        player.current = player._id == playerId;
        return player;
      });
  },
  room: function() {
    let roomId;
    if (roomId = Session.get("roomId")) {
      return Rooms.findOne(roomId);
    }
  },
  // to be removed later
  tempCode: function() {
    return "j3r3my";
  },
  owner: function() {
    let playerId = Session.get("playerId");
    let roomId = Session.get("roomId");
    let room = Rooms.findOne(roomId);
    return playerId === room.owner;
  },
  ready: function(players) {
    console.log("Ready?");
    let attributes = {};
    if (players.length < 5) {
      attributes.disabled = false;
    }
    return attributes;
  },
});

Template.lobby.events({
  "click .remove-button": function(event) {
    let playerId = $(event.currentTarget).data("playerId");
    Meteor.call("leavegame", { playerId: playerId });
  },
});
