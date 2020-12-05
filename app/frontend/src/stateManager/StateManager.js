import { observable, action } from 'mobx';

class StateManager {

    @observable user = { id: 1}
    @observable mode;

    @observable selectedDocumentId;

    @action setState = state => Object.assign(this, state);

    @action setMode = mode => { this.mode = mode; };

    @action setSelectedDocumentId = selectedDocumentId => { this.selectedDocumentId = selectedDocumentId; };
}

export default new StateManager();
