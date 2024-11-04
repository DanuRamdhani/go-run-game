class RoomModel {
    constructor(data = {}) {
        this._id = data.id || '';
        this._room = data.room || '';
    }

    // Getters
    get id() { return this._id; }
    get room() { return this._room; }
};

export default RoomModel;
