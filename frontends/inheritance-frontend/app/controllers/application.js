import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service store;

  @action
  async createAJob() {
    const record = this.store.createRecord('a-job');
    await record.save();
  }

  @action
  async createBJob() {
    const record = this.store.createRecord('b-job');
    await record.save();
  }
}
