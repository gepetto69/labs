/// <reference path="knockout-2.2.1.debug.js" />

function dateToString(date){
    var day = date.getDate();
    var month = date.getMonth() + 1; //months are zero based
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

function Stage(name, capacity) {
  this.name = ko.observable(name);
  this.capacity = ko.observable(capacity);
}

function Act(day, hour, artist, stage) {
  var self = this;

  self.day = ko.observable(day);
  self.hour = ko.observable(hour);
  self.artist = ko.observable(artist);
  self.stage = ko.observable(stage);

  self.formattedDate = ko.computed(function () {
    return dateToString(self.day());
  });
}

function AdminViewModel() {
  var self = this;

  self.mode = ko.observable('view');
  self.modeButtonDisplay = ko.computed(function () {
    if (self.mode() === 'view')
      return 'Edit';
    else
      return 'View';
  });

  self.newStage = ko.observable(new Stage());

  self.availableDates = [];
  self.stages = ko.observableArray();
  self.acts = ko.observableArray();

  self.changeMode = function () {
    if (self.mode() === 'view')
      self.mode('edit');
    else
      self.mode('view');
  };

  self.addStage = function () {
    self.stages.push(self.newStage());
    self.newStage(new Stage());
  };

  self.removeStage = function (stage) {
    var isStageUsed = self.acts().some(function(act) {
      return act.stage() === stage;
    });

    if (isStageUsed) {
      alert("can not delete stage, it's still being used");
    } else {
      self.stages.remove(stage);
    }
  }


}

$(function () {
  var vm = new AdminViewModel();

  vm.availableDates.push(new Date(1972, 6, 1));
  vm.availableDates.push(new Date(1972, 6, 2));

  vm.stages.push(new Stage('Main Stage', 20000));
  vm.stages.push(new Stage('Orange Room', 5000));

  vm.acts.push(new Act(vm.availableDates[0], '20:00', 'The Four Tops', vm.stages()[0]));
  vm.acts.push(new Act(vm.availableDates[0], '20:30', 'Marvin Gaye', vm.stages()[1]));
  vm.acts.push(new Act(vm.availableDates[1], '22:00', 'Lionel Richie', vm.stages()[0]));
  vm.acts.push(new Act(vm.availableDates[1], '22:30', 'The Commodores', vm.stages()[1]));

  ko.applyBindings(vm);
})