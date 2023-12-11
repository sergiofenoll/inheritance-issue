import { module, test } from 'qunit';

import { setupTest } from 'inheritance-frontend/tests/helpers';

module('Unit | Model | a job', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('a-job', {});
    assert.ok(model);
  });
});
