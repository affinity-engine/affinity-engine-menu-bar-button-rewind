import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../tests/helpers/module-for-acceptance';
import { $hook, hook } from 'ember-hook';

moduleForAcceptance('Acceptance | menu bar/load', {
  beforeEach() {
    localStorage.clear();
    Ember.$.Velocity.mock = true;
  },

  afterEach() {
    Ember.$.Velocity.mock = false;
  }
});

test('Affinity Engine | Menu Bar | Buttons | Rewind', function(assert) {
  assert.expect(9);

  visit('/').then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), '1', 'text is correct');

    return click('.lxl-container');
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), '2', 'text is correct');

    return click(hook('affinity_engine_menu_bar_rewind'));
  }).then(() => {
    assert.equal($hook('affinity_engine_menu_bar_rewind_menu').length, 1, 'menu opened');
    assert.equal($hook('ember_flex_menu_option').length, 1, 'one rewindable state');

    return click($hook('affinity_engine_menu_bar_menu_screen').get(0));
  }).then(() => {
    assert.equal($hook('affinity_engine_menu_bar_rewind_menu').length, 0, 'menu is closed');

    return click('.lxl-container');
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), '3', 'text is correct');

    return click(hook('affinity_engine_menu_bar_rewind'));
  }).then(() => {
    assert.equal($hook('ember_flex_menu_option').length, 2, 'new rewindable state added');

    return click($hook('ember_flex_menu_option_button').get(1));
  }).then(() => {
    assert.equal($hook('affinity_engine_menu_bar_load_menu').length, 0, 'menu is closed');
    assert.equal($hook('affinity_engine_stage_direction_text').text().trim(), '2', 'rewind successful');
  });
});
