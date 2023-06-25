class Listener {
    constructor(playlistService, mailSender) {
      this._playlistService = playlistService;
      this._mailSender = mailSender;
   
      this.listen = this.listen.bind(this);
    }
   
    async listen(message) {
        console.log(message.content.toString());
      try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString());

        const playlist = await this._playlistService.getSongFromPlaylist(playlistId);
        console.log(playlist);
        const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
      } catch (error) {
        console.error(error);
      }
    }
  }
   
  module.exports = Listener;