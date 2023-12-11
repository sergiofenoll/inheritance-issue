import { module, test } from 'qunit';

import { setupTest } from 'inheritance-frontend/tests/helpers';

module('Unit | Model | job', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('job', {});
    assert.ok(model);
  });
});
