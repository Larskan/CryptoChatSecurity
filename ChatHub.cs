using Microsoft.AspNetCore.SignalR;

namespace CryptoChatSecurity
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string encryptedMessage, string nonce, string tag)
        {
            try
            {

            }
            catch (Exception e)
            {
                Console.WriteLine($"From ChatHub - Error sending message: {e.Message}");
            }
        }

    }
}
