module.exports = {
  name: `skip`,
  category: `Song`,
  aliases: [`next`, "s"],
  description: `Votes to skip the current playing song`,
  usage: `skip`,
  run: async (client, message, args, cmduser, text, prefix) => {
    //get the voice channel of the member
    const {
      channel
    } = message.member.voice;
    //if he is not connected to a vc return error
    if (!channel) return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
    //send error if member is Deafed
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
    //get voice channel of the bot
    const botchannel = message.guild.me.voice.channel;
    //get the music player
    const player = client.manager.players.get(message.guild.id);
    //if no player or no botchannel return error
    if (!player || !botchannel) return message.channel.send(`**:x: Nothing playing in this server**`);
    //if queue size too small return error
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Nothing playing in this server**`);
    //if user is not in the right channel as bot, then return error
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: You need to be in the same voice channel as Kronix x Rythm to use this command**`);
    //if bot connected bot not with the lavalink player then try to delete the player
    if (player && botchannel && channel.id !== botchannel.id) {
      player.destroy();
    }
    player.stop();
    //return success message
    return message.channel.send(`**:fast_forward: Skipped :thumbsup:**`);

  }
};

