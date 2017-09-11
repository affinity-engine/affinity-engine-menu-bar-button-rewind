import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { deepStub } from 'affinity-engine';

const {
  getProperties,
  setProperties
} = Ember;

moduleForComponent('affinity-engine-menu-bar-button-rewind', 'Integration | Component | affinity engine menu bar button rewind', {
  integration: true
});

const configurationTiers = [
  'config.attrs.component.menuBar.button.rewind.attrs',
  'config.attrs.component.menuBar.attrs',
  'config.attrs.every.attrs'
];

configurationTiers.forEach((priority) => {
  test(`icon and iconFamily are assigned by priority ${priority}`, function(assert) {
    assert.expect(1);

    const stub = deepStub(priority, { iconFamily: 'affinity-engine-plugin-icon-font-awesome', icon: { type: 'cloud-upload' } });

    setProperties(this, getProperties(stub, 'config'));

    this.render(hbs`{{affinity-engine-menu-bar-button-rewind config=config}}`);

    assert.ok(this.$('i').hasClass('fa-cloud-upload'), 'icon correct');
  });
});
