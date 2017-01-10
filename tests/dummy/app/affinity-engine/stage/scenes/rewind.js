import { Scene } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  name: 'Rewind',

  start: task(function * (script, data) {
    data.incrementProperty('count');

    yield script.text(data.get('count'));

    script.scene('rewind');
  })
});
