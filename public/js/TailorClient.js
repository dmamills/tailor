function TailorClient(onInit,onMessage) {
	if(!this instanceof TailorClient) return new TailorClient(onInit,onMessage);

	this.socket = io();
	this.socket.once('init',onInit);
	this.socket.on('message',onMessage);

	return this;
}
