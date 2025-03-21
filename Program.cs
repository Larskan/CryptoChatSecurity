using CryptoChatSecurity;

var builder = WebApplication.CreateBuilder(args);

// Add SignalR Service
builder.Services.AddSignalR();

var app = builder.Build();

app.UseDefaultFiles(); //Enables index.html as default page
app.UseStaticFiles(); //Enables static files like index.html from wwwroot
app.UseHttpsRedirection();
app.UseAuthorization();;

// Map SignalR Hub
app.MapHub<ChatHub>("/chatHub");

app.Run();
