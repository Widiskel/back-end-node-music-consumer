const { Pool } = require('pg');
 
class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getSongFromPlaylist(playlistId) {
    console.log(playlistId);
    const query = {
      text: `
        SELECT p.id AS playlist_id, p.name AS playlist_name, u.username,
        s.id AS song_id, s.title, s.performer
        FROM songs s
        JOIN playlist_song ps ON ps.song_id = s.id
        JOIN playlist p ON p.id = ps.playlist_id
        JOIN users u ON u.id = p.owner
        WHERE p.id = $1
      `,
      values: [playlistId],
    };
    console.log(query);
  
    const result = await this._pool.query(query);
  
    if (result && result.rows.length > 0) {
      const playlist = {"playlist": {
            id: result.rows[0].playlist_id,
            name: result.rows[0].playlist_name,
            songs: result.rows.map((row) => ({
                id: row.song_id,
                title: row.title,
                performer: row.performer,
                })),
            }
        };
  
      console.log(playlist);
  
      return playlist;
    } else {
      throw new Error("Playlist not found or empty.");
    }
  }
}
module.exports = PlaylistService;