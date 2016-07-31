import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar-button-rewind-menu';
import { classNamesConfigurable, configurable, deepConfigurable, registrant } from 'affinity-engine';
import { ModalMixin } from 'affinity-engine-menu-bar';
import { BusPublisherMixin } from 'ember-message-bus';
import multiton from 'ember-multiton-service';

const {
  Component,
  assign,
  computed,
  get,
  getProperties,
  isPresent,
  set
} = Ember;

const configurationTiers = [
  'config.attrs.component.menuBar.button.rewind',
  'config.attrs.component.menuBar.menu',
  'config.attrs.component.menuBar',
  'config.attrs'
];

export default Component.extend(BusPublisherMixin, ModalMixin, {
  layout,
  hook: 'affinity_engine_menu_bar_rewind_menu',

  saveStateManager: registrant('affinity-engine/save-state-manager'),
  config: multiton('affinity-engine/config', 'engineId'),

  menuColumns: configurable(configurationTiers, 'menuColumns'),
  customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),
  iconFamily: configurable(configurationTiers, 'iconFamily'),
  keys: deepConfigurable(configurationTiers, 'keys'),

  options: computed('menuColumns', 'customClassNames', 'iconFamily', 'icon', 'keys', {
    get() {
      return assign({ classNames: get(this, 'customClassNames') }, getProperties(this, 'menuColumns', 'iconFamily', 'icon', 'keys'));
    }
  }),

  init(...args) {
    this._super(...args);

    const points = get(this, 'saveStateManager.statePoints');
    const choices = Ember.A();

    points.reverse().forEach((point, index) => {
      choices.pushObject({
        text: get(point, 'sceneName'),
        object: Ember.A(points.slice(index, points.length))
      });
    });

    set(this, 'choices', choices);
  },

  actions: {
    closeModal() {
      this.closeModal();
    },

    onChoice(choice) {
      const points = get(choice, 'object');

      if (isPresent(points)) {
        this.publish(`ae:${get(this, 'engineId')}:shouldLoadLatestStatePoint`, points.reverse());
      }

      this.closeModal();
    }
  }
});
