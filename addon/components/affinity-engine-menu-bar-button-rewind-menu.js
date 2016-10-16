import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar-button-rewind-menu';
import { classNamesConfigurable, configurable, registrant } from 'affinity-engine';
import { ModalMixin } from 'affinity-engine-menu-bar';
import { BusPublisherMixin } from 'ember-message-bus';
import multiton from 'ember-multiton-service';

const {
  Component,
  get,
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

  dataManager: registrant('affinity-engine/data-manager'),
  config: multiton('affinity-engine/config', 'engineId'),

  acceptKeys: configurable(configurationTiers, 'keys.accept'),
  animationLibrary: configurable(configurationTiers, 'animationLibrary'),
  cancelKeys: configurable(configurationTiers, 'keys.cancel'),
  customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),
  header: configurable(configurationTiers, 'header'),
  iconFamily: configurable(configurationTiers, 'iconFamily'),
  menuColumns: configurable(configurationTiers, 'menuColumns'),
  moveDownKeys: configurable(configurationTiers, 'keys.moveDown'),
  moveLeftKeys: configurable(configurationTiers, 'keys.moveLeft'),
  moveRightKeys: configurable(configurationTiers, 'keys.moveRight'),
  moveUpKeys: configurable(configurationTiers, 'keys.moveUp'),
  transitionIn: configurable(configurationTiers, 'transitionIn'),
  transitionOut: configurable(configurationTiers, 'transitionOut'),

  init(...args) {
    this._super(...args);

    const points = get(this, 'dataManager.statePoints');
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
      set(this, 'willTransitionOut', true);
    },

    onChoice(choice) {
      const points = get(choice, 'object');

      if (isPresent(points)) {
        const reversedPoints = points.reverse();
        const engineId = get(this, 'engineId');

        this.publish(`ae:${engineId}:main:shouldLoadLatestStatePoint`, reversedPoints);
        this.publish(`ae:${engineId}:main:shouldLoadSceneFromPoint`, reversedPoints);
      }

      set(this, 'willTransitionOut', true);
    }
  }
});
