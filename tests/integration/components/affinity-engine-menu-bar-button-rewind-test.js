import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('affinity-engine-menu-bar-button-rewind', 'Integration | Component | affinity engine menu bar button rewind', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{affinity-engine-menu-bar-button-rewind}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#affinity-engine-menu-bar-button-rewind}}
      template block text
    {{/affinity-engine-menu-bar-button-rewind}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
