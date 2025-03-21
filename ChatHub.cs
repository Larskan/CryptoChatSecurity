using Microsoft.AspNetCore.SignalR;

namespace CryptoChatSecurity
{
    public class ChatHub : Hub
    {
        //TODO: May need to add a method to handle shared keys once I figure out how to do that
        public async Task SendMessage(string user, string encryptedMessage, string nonce, string tag)
        {
            try
            {
                // Encrypt the message on the server before sending it to the clients
                // No need to decrypt the message here, just forward them encrypted
                await Clients.All.SendAsync("ReceiveMessage", user, encryptedMessage, nonce, tag);
            }
            catch (Exception e)
            {
                Console.WriteLine($"From ChatHub - Error sending message: {e.Message}");
            }
        }
    }
}
